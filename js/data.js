const ELEMENT = {
   MESSAGE_TEMPLATE: msgtplt.content.cloneNode(true),
   MESSAGE_FORM: document.getElementById('messageinputform'),
   MESSAGE_INPUT: document.querySelector('.message-input'),
   CHAT_CONTAINER: document.querySelector('.chat-container'),
   POPUP: document.querySelector('.popup'),
}

const POPUP = {
   SETTINGS: 'settings',
   LOGIN: 'login',
   CONFIRM: 'confirm',
}

export {ELEMENT, POPUP}