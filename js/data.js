const ELEMENT = {
   MESSAGE_TEMPLATE: msgtplt.content.cloneNode(true),
   MESSAGE_FORM: document.getElementById('messageinputform'),
   MESSAGE_INPUT: document.getElementById('messageInput'),
   CHAT_CONTAINER: document.querySelector('.chat-container'),
   POPUP: document.querySelector('.popup'),
   CLOSE_BUTTON: document.querySelector('.close-button'),
   LOGIN_FORM: document.getElementById('loginForm'),
   LOGIN_INPUT: document.getElementById('emailInput'),
   LOGIN_BUTTON: document.getElementById('loginButton'),
}

const POPUP = {
   SETTINGS: 'settings',
   LOGIN: 'login',
   CONFIRM: 'confirmCode',
}

export {ELEMENT, POPUP}