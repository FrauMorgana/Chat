import { ELEMENT } from "./data.js";

ELEMENT.MESSAGE_FORM.addEventListener('submit', messageHandler);

function messageHandler(e) {
   e.preventDefault();
   sendMessage();
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