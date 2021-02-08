#!/usr/bin/env node

const runner = require('./runner');

async function run (){
    await runner.collectFiles(process.cwd());
    runner.runTests();
}

run();