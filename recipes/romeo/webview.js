const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const tapNames = ["Footprint", "Fußtaps", "huella", "émoticône", "impronta", "pegada"];
const msgNames = ["Message", "message", "mensaje", "messaggio", "mensagem"];

const anyIncluded = (container, shouldContain) => {
  for (const s of shouldContain) {
    if (container.contains(s)) {
       true; continue;
    }
  }
  return false;
}

const getOpenSidebar = () => {
  let msgsSidebar = document.querySelector('#messenger');
  let tapsSidebar = document.querySelector('#visits');
  let msgsSidebarHidden = msgsSidebar ? msgsSidebar.className.includes('is-hidden') : true;
  let tapsSidebarHidden = tapsSidebar ? tapsSidebar.className.includes('is-hidden') : true;
  console.log(`m ${msgsSidebar} t ${tapsSidebar} mH ${msgsSidebarHidden} tH ${tapsSidebarHidden}`)
  if (!msgsSidebarHidden && tapsSidebarHidden) {
    return 'messages';
  } else if (!tapsSidebarHidden && msgsSidebarHidden) {
    return 'visits';
  } else {
    return '';
  }
}
const getOpenMsgRubric = () => {
  let msgsSidebar = document.querySelector('#messenger');
  let msgsSidebarSelectedNavHref = msgsSidebar.querySelector('div.js-navigation > ul > li.is-selected a').getAttribute('href');
  switch (msgsSidebarSelectedNavHref) {
    case '/messenger/chat':
      return 'chat';
    case '/messenger/contacts':
      return 'contacts';
  }
}
const getOpenVisitsRubric = () => {
  let visitsSidebar = document.querySelector('#visits');
  let visitsSidebarSelectedNavHref = visitsSidebar.querySelector('div.js-navigation > ul > li.is-selected a').getAttribute('href');
  if (visitsSidebarSelectedNavHref == '/visitors') {
    return 'toMe';
  } else if (visitsSidebarSelectedNavHref == '/visitors/me') {
    return 'fromMe';
  }
};

module.exports = Ferdium => {
  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
  const getMessages = () => {
    //let newVisitors = document.querySelector('#visitors-menu span.badge').textContent;
    let messages = document.querySelector('#messages-menu span.badge');
    if (messages) {
      Ferdium.setBadge(Ferdium.safeParseInt(messages.textContent));
    }
  };
  Ferdium.loop(getMessages);
  Ferdium.handleDarkMode(() => {}); // ROMEO does not have light mode
  Ferdium.onNotify(n => {
    try {
      // We do not want to disturb the UI if the user is currently in a submenu that doesn't correspond to a notification.
      if (anyIncluded(n.options.body, msgNames)) {
        if (getOpenSidebar() == 'messages' && getOpenMsgRubric() == 'chat') {
          document.querySelector('#messenger li.is-selected').click();
        }
      }
      else if (anyIncluded(n.options.body, tapNames) && getOpenSidebar() == 'visits' && getOpenVisitsRubric() == 'toMe') {
          document.querySelector('#visits li.is-selected').click();
        }
    } catch {
      return n;
    }
    return n;
  });
};
