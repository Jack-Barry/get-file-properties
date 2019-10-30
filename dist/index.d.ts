import { WmicDataObject, WmicDataObjectKey } from './Utilities';
export { WmicDataObject } from './Utilities';
/**
 * Retrieves metadata for a file as an object of key value pairs.
 *
 * @param filepath The absolute path of a file to read properties on
 * @param attributes An optional array of file attributes to limit the response
 *   value to. Defaults to returning all file attributes retrieved.
 */
export declare const getFileProperties: (filepath: string, attributes?: WmicDataObjectKey[]) => Promise<WmicDataObject>;
declare const _default: {
    getFileProperties: (filepath: string, attributes?: WmicDataObjectKey[]) => Promise<WmicDataObject>;
};
export default _default;
