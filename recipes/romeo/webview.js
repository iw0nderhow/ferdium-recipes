const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

module.exports = Ferdium => {

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
  const getMessages = () => {
    
    //let newVisitors = document.querySelector('#visitors-menu span.badge').textContent;
    let messages = document.querySelector('#messages-menu span.badge').textContent;
    Ferdium.setBadge(Ferdium.safeParseInt(messages));
  }
  Ferdium.loop(getMessages);
  Ferdium.handleDarkMode(() => {}); // ROMEO does not have light mode
};
