declare type WmicDataObjectKey = 'AccessMask' | 'Archive' | 'Caption' | 'Compressed' | 'CompressionMethod' | 'CreationClassName' | 'CreationDate' | 'CSCreationClassName' | 'CSName' | 'Description' | 'Drive' | 'EightDotThreeFileName' | 'Encrypted' | 'EncryptionMethod' | 'Extension' | 'FileName' | 'FileSize' | 'FileType' | 'FSCreationClassName' | 'FSName' | 'Hidden' | 'InstallDate' | 'InUseCount' | 'LastAccessed' | 'LastModified' | 'Manufacturer' | 'Name' | 'Path' | 'Readable' | 'Status' | 'System' | 'Version' | 'Writeable';
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
export {};
