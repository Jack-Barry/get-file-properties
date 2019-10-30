import chai, { expect } from 'chai'
import { SinonSpy, createSandbox, SinonSandbox } from 'sinon'
import chaiAsPromised from 'chai-as-promised'
import sinonChai from 'sinon-chai'
import childProcess from 'child_process'
import { promiseExec } from '.'
chai.use(chaiAsPromised)
chai.use(sinonChai)

describe('promiseExec()', () => {
  let sbx: SinonSandbox
  let cmdExec: SinonSpy
  let output: string

  before(() => {
    sbx = createSandbox()
    // @ts-ignore
    cmdExec = sbx.stub(childProcess, 'exec').callsFake((cmd, callback) => {
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
    expect(cmdExec).to.have.been.calledWith('some-command')
  })

  it('resolves to the output from exec', () => {
    expect(output).to.eql('executed')
  })
})
