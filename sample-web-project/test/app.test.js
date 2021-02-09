const assert = require('assert');

it('has a text input', async () => {
    const dom = await render('index.html');
    const {document} = dom.window;

    const input = document.querySelector('input');
    assert(input);
})