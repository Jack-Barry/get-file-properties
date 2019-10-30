import {
  WmicDataObject,
  promiseExec,
  buildWmicCommand,
  WmicDataObjectKey,
  parseFileProperties
} from './Utilities'
export { WmicDataObject } from './Utilities'

/**
 * Retrieves metadata for a file as an object of key value pairs.
 *
 * @param filepath The absolute path of a file to read properties on
 * @param attributes An optional array of file attributes to limit the response
 *   value to. Defaults to returning all file attributes retrieved.
 */
export const getFileProperties = async (
  filepath: string,
  attributes: WmicDataObjectKey[] = []
): Promise<WmicDataObject> => {
  const cmdResponse: string = await promiseExec(
    buildWmicCommand(filepath.replace(/\\+/g, '\\\\'), attributes)
  )
  return parseFileProperties(cmdResponse)
}

export default { getFileProperties }
