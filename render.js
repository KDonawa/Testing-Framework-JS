const jsdom = require('jsdom');
const {JSDOM} = jsdom;

async function render(filePath) {
    const dom = await JSDOM.fromFile(filePath, {
        runScripts: 'dangerously',
        resources: 'usable',
    });

    return new Promise((resolve, reject) => {
        dom.window.document.addEventListener('DOMContentLoaded', () => {
            resolve(dom);
        })
    });
}

module.exports = render;