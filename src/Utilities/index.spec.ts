import chai, { expect } from 'chai'
import { SinonSpy, createSandbox, SinonSandbox } from 'sinon'
import chaiAsPromised from 'chai-as-promised'
import sinonChai from 'sinon-chai'
import childProcess from 'child_process'
import {
  promiseExec,
  parseFileProperties,
  WmicDataObject,
  buildWmicCommand
} from '.'
chai.use(chaiAsPromised)
chai.use(sinonChai)

describe('Utilities', () => {
  let sbx: SinonSandbox
  let mySpy: SinonSpy
  let output: string

  before(() => {
    sbx = createSandbox()
  })

  describe('promiseExec()', () => {
    before(() => {
      // @ts-ignore
      mySpy = sbx.stub(childProcess, 'exec').callsFake((cmd, callback) => {
        // @ts-ignore
        callback(null, 'executed', '')
      })
    })

    beforeEach(async () => {
      output = await promiseExec('some-command')
    })

    after(() => {
      sbx.restore()
    })

    it('calls exec with the provided command', () => {
      expect(mySpy).to.have.been.calledWith('some-command')
    })

    it('resolves to the output from exec', () => {
      expect(output).to.eql('executed')
    })
  })

  describe('parseFileProperties()', () => {
    it('returns an object in the expected format', () => {
      // prettier-ignore
      const exampleOutput = `AccessMask  Archive  Caption                        Compressed  CompressionMethod  CreationClassName  CreationDate               CSCreationClassName   CSName           Description                    Drive  EightDotThreeFileName        Encrypted  EncryptionMethod  Extension  FileName  FileSize  FileType        FSCreationClassName  FSName  Hidden  InstallDate                InUseCount  LastAccessed               LastModified               Manufacturer  Name                           Path               Readable  Status  System  Version  Writeable      \r\r\n2032127     TRUE     C:\\Users\\JackBarry\\.gitconfig  FALSE                          CIM_LogicalFile    20190621072302.859435-300  Win32_ComputerSystem  JACKBARRYTHINKP  C:\\Users\\JackBarry\\.gitconfig  c:     c:\\users\\jackbarry\\gitcon~1  FALSE                        gitconfig            603       gitconfig File  Win32_FileSystem     NTFS    FALSE   20190621072302.859435-300              20190621072316.946333-300  20190621072316.946333-300                C:\\Users\\JackBarry\\.gitconfig  \\users\\jackbarry\\  TRUE      OK      FALSE            TRUE`
      const output: WmicDataObject = parseFileProperties(exampleOutput)
      expect(output.AccessMask).to.eql('2032127')
      expect(output.Archive).to.eql('TRUE')
      expect(output.CSCreationClassName).to.eql('Win32_ComputerSystem')
      expect(output.CSName).to.eql('JACKBARRYTHINKP')
      expect(output.Caption).to.eql('C:\\Users\\JackBarry\\.gitconfig')
      expect(output.Compressed).to.eql('FALSE')
      expect(output.CompressionMethod).to.eql('')
      expect(output.CreationClassName).to.eql('CIM_LogicalFile')
      expect(output.CreationDate).to.eql('20190621072302.859435-300')
      expect(output.Description).to.eql('C:\\Users\\JackBarry\\.gitconfig')
      expect(output.Drive).to.eql('c:')
      expect(output.EightDotThreeFileName).to.eql(
        'c:\\users\\jackbarry\\gitcon~1'
      )
      expect(output.Encrypted).to.eql('FALSE')
      expect(output.EncryptionMethod).to.eql('')
      expect(output.Extension).to.eql('gitconfig')
      expect(output.FSCreationClassName).to.eql('Win32_FileSystem')
      expect(output.FSName).to.eql('NTFS')
      expect(output.FileName).to.eql('')
      expect(output.FileSize).to.eql('603')
      expect(output.FileType).to.eql('gitconfig File')
      expect(output.Hidden).to.eql('FALSE')
      expect(output.InUseCount).to.eql('')
      expect(output.InstallDate).to.eql('20190621072302.859435-300')
      expect(output.LastAccessed).to.eql('20190621072316.946333-300')
      expect(output.LastModified).to.eql('20190621072316.946333-300')
      expect(output.Manufacturer).to.eql('')
      expect(output.Name).to.eql('C:\\Users\\JackBarry\\.gitconfig')
      expect(output.Path).to.eql('\\users\\jackbarry\\')
      expect(output.Readable).to.eql('TRUE')
      expect(output.Status).to.eql('OK')
      expect(output.System).to.eql('FALSE')
      expect(output.Version).to.eql('')
      expect(output.Writeable).to.eql('TRUE')
    })
  })

  describe('buildWmicCommand()', () => {
    it('generates the wmic command as intended', () => {
      expect(buildWmicCommand('C:\\Users\\JackBarry\\.gitconfig')).to.eql(
        'wmic datafile where name="C:\\Users\\JackBarry\\.gitconfig"'
      )
      expect(
        buildWmicCommand('C:\\Users\\JackBarry\\.gitconfig', [
          'AccessMask',
          'Description'
        ])
      ).to.eql(
        'wmic datafile where name="C:\\Users\\JackBarry\\.gitconfig" get AccessMask,Description'
      )
    })
  })
})
