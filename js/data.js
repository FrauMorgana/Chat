const ELEMENT = {
   MESSAGE_TEMPLATE: msgtplt.content.cloneNode(true),
   MESSAGE_FORM: document.getElementById("messageinputform"),
   MESSAGE_INPUT: document.getElementById("messageInput"),
   CHAT_CONTAINER: document.querySelector(".chat-container"),
   POPUP: document.querySelector(".popup"),
   CLOSE_BUTTON: document.querySelector(".close-button"),
   SETTINGS_FORM: document.getElementById("settingsForm"),
   NAME_INPUT: document.getElementById("nameInput"),
   LOGIN_FORM: document.getElementById("loginForm"),
   EMAIL_INPUT: document.getElementById("emailInput"),
   AUTHORIZ_FORM: document.getElementById("authorizationForm"),
   TOKEN_INPUT: document.getElementById("authorizationCode"),
};

export { ELEMENT }