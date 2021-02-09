const assert = require('assert');

it('has a text input', async () => {
    const dom = await render('index.html');
    const {document} = dom.window;

    const input = document.querySelector('input');
    assert(input);
});

it('shows a success message with a valid email', async () => {
    const dom = await render('index.html');
    const {document, Event} = dom.window; 

    const input = document.querySelector('input');
    input.value = 'test@email.com';
    
    document.querySelector('form').dispatchEvent(new Event('submit'));

    const h1 = document.querySelector('h1');
    assert.strictEqual(h1.innerHTML, 'Valid email');
});

it('shows a failure message with an invalid email', async () => {
    const dom = await render('index.html');
    const {document, Event} = dom.window; 

    const input = document.querySelector('input');
    input.value = 'testemail.com';
    
    document.querySelector('form').dispatchEvent(new Event('submit'));

    const h1 = document.querySelector('h1');
    assert.strictEqual(h1.innerHTML, 'Invalid email');
});