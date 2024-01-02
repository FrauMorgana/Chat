const PROTOCOL = {
   WSS: 'wss:',
   HTTPS: 'https:',
}

const URL_PATH = {
   USER: "/api/user",
   USER_ME: "/api/user/me",
   MESSAGES: "/api/messages/",
   WEBSOCKETS: '/websockets',
};

const REQUEST_TYPE = {
   LOGIN: "login",
   CHANGE_NAME: "new-name",
};

const METHOD = {
   GET: 'GET',
   POST: 'POST',
   PATCH: 'PATCH',
}

export { PROTOCOL, URL_PATH, REQUEST_TYPE, METHOD };
