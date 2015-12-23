import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import jsdom from 'jsdom';

chai.use(chaiImmutable);

// Prepare browser global objects.

const document = jsdom.jsdom(`
  <!DOCTYPE html>
  <html>
    <body></body>
  </html>
`);
const window = document.defaultView;

Object.assign(global, {
  document, window
});

Object.keys(window).forEach(key => {
  if (! (key in global)) {
    global[key] = window[key];
  }
});
