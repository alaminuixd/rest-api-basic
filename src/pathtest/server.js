import path from "path";
import { fileURLToPath } from "url";

const __filepath = path.dirname(import.meta.url);
console.log(__filepath);
// result: file:///D:/practices/API/rest-api-basic/src/pathtest

console.log("-------fileURLToPath---------");

const __filepath2 = fileURLToPath(import.meta.url);
console.log(__filepath2); // include the file name.
// result: D:\practices\API\rest-api-basic\src\pathtest\server.js
console.log("--------resolve----------");

const __resolve = path.resolve(__filepath2);
console.log(__resolve); // include the file name.
//result: D:\practices\API\rest-api-basic\src\pathtest\server.js

console.log("---------dirname---------");

const __dirname = path.dirname(__filepath2);
console.log(__dirname); // exclude the file name.

// result: D:\practices\API\rest-api-basic\src\pathtest

/* 
In CJS
make the following directories
--root
    --src
        app.js

Now work with app.js file path

const path = require("path");
const appjsDirectory = path.resolve(__dirname); // __dirname comes auto with path.
console.log(appjsDirectory);

run command node src/app.js
result: xxx:\xxx\root\src

Now move the app.js to another nested folder. I will name it "inner"
--root
    --src
        --inner
            app.js

run command node src/inner/app.js
result: xxx:\xxx\root\src\inner 
As you can see it always find the executed, "app.js", file location.
"__dirname" facilitates this way of getting the full path.

In MJS:
make the same directories
--root
    --src
        app.js

Now work with app.js file path

import path from "path";
const appjsDirectory = path.resolve(what we will use here?).
Node.js don't have a __dirname for MJS.

We can do the following
const appjsDirectory = path.resolve(import.meta.url);
console.log(appjsDirectory);
result: file:///D:xxx/root/src

This is not good as we get prefix part "file:///"

we can remove the prefix "file:///" using regx but what if the file runs in differnet OS?

The solution is "fileURLToPath" from the nodejs builtin url module.

import path from "path";
import {fileURLToPath} from "url";
const __fileName = fileURLToPath(import.meta.url);
// this will convert the app.js Directory to a path directory including the file name
// now we can reslove anything in this directory

const appPath = path.resolve(__dirname);
console.log(appPath);
result: D:xxx\root\src\app.js

*/
