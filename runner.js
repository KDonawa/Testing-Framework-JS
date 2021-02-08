const fs = require('fs');
const path = require('path');

class Runner {
    constructor(){
        this.testFiles = [];
    }

    async runTests() {
        for (const file of this.testFiles) {
            const beforeEachList = [];
            global.beforeEach = (func) => {
                beforeEachList.push(func);
            }
            global.it = (desc, func) => {
                beforeEachList.forEach(fn => fn());
                console.log(desc);
                func();
            }
            require(file.name);
        }
    }

    async collectFiles(targetPath){
        return await this.collectFilesBFS(targetPath);
    }
    async collectFilesBFS(targetPath){
        const files = await fs.promises.readdir(targetPath);
        
        for (const file of files) {
            const filePath = path.join(targetPath, file);
            const stats = await fs.promises.lstat(filePath);
            if(stats.isFile() && file.includes('.test.js')){
                this.testFiles.push({name: filePath});
            }
            else if(stats.isDirectory()){
                const childFiles = await fs.promises.readdir(filePath);
                files.push(...childFiles.map(x => path.join(file,x)));
            }
        }
    }
};

module.exports = new Runner();