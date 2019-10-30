import {
  WmicDataObject,
  promiseExec,
  buildWmicCommand,
  parseFileProperties
} from './Utilities'
export { WmicDataObject } from './Utilities'

/**
 * Retrieves metadata for a file as an object of key value pairs.
 *
 * @param filepath The absolute path of a file to read properties on
 */
export const getFileProperties = async (
  filepath: string
): Promise<WmicDataObject> => {
  const cmdResponse: string = await promiseExec(
    buildWmicCommand(filepath.replace(/\\+/g, '\\\\'))
  )
  return parseFileProperties(cmdResponse)
}

export default { getFileProperties }
