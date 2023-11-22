import { ELEMENT } from "../data.js";

let user = {
   state: 1,
}

function UiRender() {
   if (user.state == 0) {
      Uiunauthorized();
   } else {
      UiAuthorized();
   }
}

function Uiunauthorized() {
   settingsBtn.classList.add('hidden');
   loginBtn.textContent = "Вход";
   messageInput.setAttribute('disabled', '');
   if (messageInput.hasAttribute('placeholder')) {
      messageInput.removeAttribute('placeholder');
   };
   ELEMENT.MESSAGE_FORM.removeEventListener('submit', messageHandler);
}

function UiAuthorized() {
   settingsBtn.classList.remove('hidden');
   loginBtn.textContent = "Выход";
   if (messageInput.hasAttribute('disabled') && !messageInput.hasAttribute('placeholder')) {
      messageInput.removeAttribute('disabled');
      messageInput.setAttribute('placeholder', 'сообщение...')
   };
   ELEMENT.MESSAGE_FORM.addEventListener('submit', messageHandler);
}

function messageHandler(e) {
   e.preventDefault();
   sendMessage();
   ELEMENT.MESSAGE_INPUT.value = '';
}

function sendMessage() {
   const message = msgtplt.content.cloneNode(true);
   const messageItem = document.createElement('div');
   messageItem.classList.add("message-item", 'sent');
   messageItem.append(message);

   const messageText = messageItem.querySelector('.message-text');
   const messageSender = messageText.querySelector('.sender');
   const messageTime = messageItem.querySelector('.message-time');

   const input = ELEMENT.MESSAGE_INPUT.value;
   if ((input.trim()).length > 0) {
      messageText.textContent = input;
      ELEMENT.CHAT_CONTAINER.prepend(messageItem);
   }
}

export {UiRender}