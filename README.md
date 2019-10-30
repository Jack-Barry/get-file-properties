# GetFileProperties

## What is it?

Zero dependency tool for getting a file's properties/metadata.

## Limitations

Currently only works on Windows, though I'm open to pull requests to add
functionality for MacOS and Linux.

## Usage

```ts
import { getFileProperties, WmicDataObject } from 'get-file-properties'

// Use single backslashes in your file path
const filepath: string = 'C:path\tomy\file.txt'
let metadata: WmicDataObject

// Default behavior is to get all properties
metadata = getFileProperties(filepath)
console.log(metadata.FileSize)

// Provide an array of specific properties to limit the response object
metadata = getFileProperties(filepath, ['Readable', 'Writeable'])
console.log({ readable: metadata.Readable, writeable: metadata.Writeable })
```
