import { exec } from 'child_process'

export type WmicDataObjectKey =
  | 'AccessMask'
  | 'Archive'
  | 'Caption'
  | 'Compressed'
  | 'CompressionMethod'
  | 'CreationClassName'
  | 'CreationDate'
  | 'CSCreationClassName'
  | 'CSName'
  | 'Description'
  | 'Drive'
  | 'EightDotThreeFileName'
  | 'Encrypted'
  | 'EncryptionMethod'
  | 'Extension'
  | 'FileName'
  | 'FileSize'
  | 'FileType'
  | 'FSCreationClassName'
  | 'FSName'
  | 'Hidden'
  | 'InstallDate'
  | 'InUseCount'
  | 'LastAccessed'
  | 'LastModified'
  | 'Manufacturer'
  | 'Name'
  | 'Path'
  | 'Readable'
  | 'Status'
  | 'System'
  | 'Version'
  | 'Writeable'

export type WmicDataObject = { [key in WmicDataObjectKey]?: string }

/**
 * Excecutes a command and resolves with the response of the command
 *
 * @param command The command you wish to execute
 * @returns A Promise resolving to a string representing the output from the
 *  command
 */
export const promiseExec = (command: string): Promise<string> => {
  return new Promise((res, rej) => {
    exec(command, (err, stdout, stderr) => {
      if (err) rej(err)
      if (stderr) rej(stderr)
      res(stdout)
    })
  })
}

/**
 * Parses metadata from wmic command into an object of key value pairs
 *
 * @param wmicData A string output by wmic
 */
export const parseFileProperties = (wmicData: string): WmicDataObject => {
  let output: WmicDataObject = {}
  let i = 0
  const stringArr: string[] = wmicData.split('\r\r\n').filter(s => s.length > 0)
  const splitTitles = stringArr[0].match(/\w+\s+/g) || []
  const titles = splitTitles.map(t => t.trim())
  const titleLengths: number[] = splitTitles.map(t => t.length)
  const values = titleLengths.map(titleLength => {
    const currentI = i
    i = i + titleLength
    return stringArr[1].slice(currentI, currentI + titleLength).trim()
  })
  titles.forEach((t, i) => {
    output[t as WmicDataObjectKey] = values[i]
  })
  return output
}

/**
 * Builds a string to run the wmic command
 *
 * @param filepath The path of the file to check properties on
 * @param attributes An optional list of keys to limit the output to (default
 *  behavior is to return all retrieved data)
 */
export const buildWmicCommand = (
  filepath: string,
  attributes: WmicDataObjectKey[] = []
): string => {
  let commandString = `wmic datafile where name="${filepath}"`
  if (attributes.length > 0) commandString += ` get ${attributes.join(',')}`
  return commandString
}
