/*
Special Schedule Data
This is where alternate schedule data is stored in the runtime.
This array should be left empty, as data is inserted automatically when an alternate schedule is added or when the app runs.

At runtime, this array is filled with integers that correspond to the UNIX timestamp of midnight on the alternate day.
The integers should correspond with uploaded PDF files.
Fun fact: JavaScript doesn't support 64 bit integers, so in 2038 this may break if it isn't changed to a string/64 bit integer.

*/

module.exports.specialUpper = [

];

module.exports.specialMiddle = [

];
