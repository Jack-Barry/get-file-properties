"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
/**
 * Excecutes a command and resolves with the response of the command
 *
 * @param command The command you wish to execute
 * @returns A Promise resolving to a string representing the output from the
 *  command
 */
exports.promiseExec = function (command) {
    return new Promise(function (res, rej) {
        child_process_1.exec(command, function (err, stdout, stderr) {
            if (err)
                rej(err);
            if (stderr)
                rej(stderr);
            res(stdout);
        });
    });
};
