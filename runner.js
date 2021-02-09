const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const render = require('./render');

const forbiddenDirs = ['node_modules'];

class Runner {
    constructor(){
        this.testFiles = [];
    }

    async runTests() {
        for await (const file of this.testFiles) {
            console.log(chalk.grey(`--- ${file.fileName}`));
            
            global.render = render;

            const beforeEachList = [];
            global.beforeEach = (func) => {
                beforeEachList.push(func);
            }

            global.it = async (desc, func) => {
                beforeEachList.forEach(fn => fn());
                
                try {
                    await func();
                    console.log(chalk.green(`OK - ${desc}`));
                } catch (error) {
                    console.log(chalk.red(`FAIL - ${desc}`));
                    console.log(chalk.red('\n', error.message));
                }
            }
            try {
                require(file.pathName);
            } catch (error) {
                console.log(error);
            }
        }
    }

    async collectFiles(targetPath){
        return await this.collectFilesDFS(targetPath);
    }
    async collectFilesBFS(targetPath){
        const files = await fs.promises.readdir(targetPath);
        
        for (const file of files) {
            const filePath = path.join(targetPath, file);
            const stats = await fs.promises.lstat(filePath);
            const arr = file.split("\\");
            const fileName = arr[arr.length - 1];
            if(stats.isFile() && file.includes('.test.js')){
                this.testFiles.push({pathName: filePath, fileName: file});
            }
            else if(stats.isDirectory() && !forbiddenDirs.includes(fileName)){

                const childFiles = await fs.promises.readdir(filePath);
                files.push(...childFiles.map(x => path.join(file,x)));
            }
        }
    }

    async collectFilesDFS(targetPath){
        const files = await fs.promises.readdir(targetPath);

        for (const file of files) {
            const filePath = path.join(targetPath, file);
            const stats = await fs.promises.lstat(filePath);
            if(stats.isFile() && file.includes('.test.js')){
                this.testFiles.push({pathName: filePath, fileName: file});
            }
            else if(stats.isDirectory() && !forbiddenDirs.includes(file)){
                await this.collectFilesDFS(filePath);
            }
        }
    }
};

module.exports = new Runner();