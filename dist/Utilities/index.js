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
/**
 * Parses metadata from wmic command into an object of key value pairs
 *
 * @param wmicData A string output by wmic
 */
exports.parseFileProperties = function (wmicData) {
    var output = {};
    var i = 0;
    var stringArr = wmicData.split('\r\r\n').filter(function (s) { return s.length > 0; });
    var splitTitles = stringArr[0].match(/\w+\s+/g) || [];
    var titles = splitTitles.map(function (t) { return t.trim(); });
    var titleLengths = splitTitles.map(function (t) { return t.length; });
    var values = titleLengths.map(function (titleLength) {
        var currentI = i;
        i = i + titleLength;
        return stringArr[1].slice(currentI, currentI + titleLength).trim();
    });
    titles.forEach(function (t, i) {
        output[t] = values[i];
    });
    return output;
};
/**
 * Builds a string to run the wmic command
 *
 * @param filepath The path of the file to check properties on
 */
exports.buildWmicCommand = function (filepath) {
    var commandString = "wmic datafile where name=\"" + filepath + "\"";
    return commandString;
};
