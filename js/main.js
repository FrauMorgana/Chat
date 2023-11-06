import { ELEMENT } from "./data.js";

ELEMENT.MESSAGE_FORM.addEventListener('submit', messageHandler);
ELEMENT.LOGIN_BUTTON.addEventListener('click', loginPopUpHandler);

function messageHandler(e) {
   e.preventDefault();
   sendMessage();
   ELEMENT.MESSAGE_INPUT.value = '';
}

function loginPopUpHandler() {
   const loginForm = document.getElementById('loginForm');
   //loginForm.addEventListener('submit', loginRequestHandler);
   console.log(loginForm);
}

function loginRequestHandler(e) {
   e.preventDefault();
   emailRequest();
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

async function emailRequest() {
   const email = { email: document.getElementById('emailInput').value } ;
   const url = 'https://edu.strada.one/api/user';
   const request = await fetch(url, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(email),      
   })
   console.log(request.json());
}

export { loginRequestHandler };