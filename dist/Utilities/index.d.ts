export declare type WmicDataObjectKey = 'AccessMask' | 'Archive' | 'Caption' | 'Compressed' | 'CompressionMethod' | 'CreationClassName' | 'CreationDate' | 'CSCreationClassName' | 'CSName' | 'Description' | 'Drive' | 'EightDotThreeFileName' | 'Encrypted' | 'EncryptionMethod' | 'Extension' | 'FileName' | 'FileSize' | 'FileType' | 'FSCreationClassName' | 'FSName' | 'Hidden' | 'InstallDate' | 'InUseCount' | 'LastAccessed' | 'LastModified' | 'Manufacturer' | 'Name' | 'Path' | 'Readable' | 'Status' | 'System' | 'Version' | 'Writeable';
export declare type WmicDataObject = {
    [key in WmicDataObjectKey]?: string;
};
/**
 * Excecutes a command and resolves with the response of the command
 *
 * @param command The command you wish to execute
 * @returns A Promise resolving to a string representing the output from the
 *  command
 */
export declare const promiseExec: (command: string) => Promise<string>;
/**
 * Parses metadata from wmic command into an object of key value pairs
 *
 * @param wmicData A string output by wmic
 */
export declare const parseFileProperties: (wmicData: string) => WmicDataObject;
/**
 * Builds a string to run the wmic command
 *
 * @param filepath The path of the file to check properties on
 * @param attributes An optional list of keys to limit the output to (default
 *  behavior is to return all retrieved data)
 */
export declare const buildWmicCommand: (filepath: string, attributes?: WmicDataObjectKey[]) => string;
