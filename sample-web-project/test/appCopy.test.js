const assert = require('assert');
const path = require('path');

it('has a text input (copy)', async () => {
    const dom = await render(path.join(__dirname, '../index.html'));
    const {document} = dom.window;

    const input = document.querySelector('input');
    assert(input);
});