import { exec } from 'child_process'

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
