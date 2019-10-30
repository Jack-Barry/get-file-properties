import { WmicDataObject } from './Utilities';
export { WmicDataObject } from './Utilities';
/**
 * Retrieves metadata for a file as an object of key value pairs.
 *
 * @param filepath The absolute path of a file to read properties on
 */
export declare const getFileProperties: (filepath: string) => Promise<WmicDataObject>;
declare const _default: {
    getFileProperties: (filepath: string) => Promise<WmicDataObject>;
};
export default _default;
