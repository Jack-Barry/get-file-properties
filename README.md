# GetFileProperties

## What is it?

Zero dependency tool for getting a file's properties/metadata.

## Limitations

Currently only works on Windows, though I'm open to pull requests to add
functionality for MacOS and Linux.

## Usage

```ts
import { getFileProperties, WmicDataObject } from 'get-file-properties'

async function demo() {
  // Ensure you are using double backslashes in your file path
  const filepath: string = 'C:\\path\\to-my\\file.txt'
  let metadata: WmicDataObject

  metadata = await getFileProperties(filepath)
  console.log(metadata.FileSize)
}
```
