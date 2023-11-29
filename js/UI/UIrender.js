import { ELEMENT } from "../data.js";
import { storyRequest } from "../Network/requests.js";

let user = {
   state: 1,
}

function UiRender() {
   if (user.state == 0) {
      Uiunauthorized();
   } else {
      UiAuthorized();
   };
   storyRender();
}

function Uiunauthorized() {
   settingsBtn.classList.add('hidden');
   loginBtn.textContent = "Вход";
   loginBtn.classList.remove('logoutBtn');
   messageInput.setAttribute('disabled', '');
   if (messageInput.hasAttribute('placeholder')) {
      messageInput.removeAttribute('placeholder');
   };
   ELEMENT.MESSAGE_FORM.removeEventListener('submit', messageHandler);
}

function UiAuthorized() {
   settingsBtn.classList.remove('hidden');
   loginBtn.textContent = "Выход";
   loginBtn.classList.add('logoutBtn');
   if (messageInput.hasAttribute('disabled') && !messageInput.hasAttribute('placeholder')) {
      messageInput.removeAttribute('disabled');
      messageInput.setAttribute('placeholder', 'сообщение...')
   };
   ELEMENT.MESSAGE_FORM.addEventListener('submit', messageHandler);
}

async function storyRender() {
   const story = await storyRequest();
   const storyContainer = document.createElement("div");
   storyContainer.classList.add("story-container");
   story.messages.forEach((element) => {
      const message = createMessage(element.text);
      storyContainer.append(message);
   });
   ELEMENT.CHAT_CONTAINER.prepend(storyContainer);
   console.log(story);
}

function messageHandler(e) {
   e.preventDefault();
   let message = createMessage(ELEMENT.MESSAGE_INPUT.value, ['sent']);
   ELEMENT.CHAT_CONTAINER.prepend(message);
   ELEMENT.MESSAGE_INPUT.value = '';
}

function createMessage(text, classes = []) {
   const message = msgtplt.content.cloneNode(true);
   const messageItem = document.createElement('div');
   messageItem.classList.add("message-item", ...classes);
   messageItem.append(message);

   const messageText = messageItem.querySelector('.message-text');
   const messageSender = messageText.querySelector('.sender');
   const messageTime = messageItem.querySelector('.message-time');

   if ((text.trim()).length > 0) {
      messageText.textContent = text;
   }
   return messageItem;
}

export { UiRender }