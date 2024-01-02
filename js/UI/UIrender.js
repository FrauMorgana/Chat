import { ELEMENT } from "../data.js";
import { getStoryFragment } from "../Network/network.js";
import { format } from "date-fns";
import Cookies from "js-cookie";

function UiRender(user) {
   (user.state == 0) ? Uiunauthorized() : UiAuthorized();
}

function Uiunauthorized() {
   showElements(loginBtn);
   hideElements(settingsBtn, logoutBtn);
   messageInput.setAttribute('disabled', '');
   ELEMENT.MESSAGE_BUTTON.setAttribute("disabled", "");
   if (messageInput.hasAttribute('placeholder')) {
      messageInput.removeAttribute('placeholder');
   };
}

function UiAuthorized() {
   hideElements(loginBtn);
   showElements(settingsBtn, logoutBtn);
   if (messageInput.hasAttribute('disabled') && !messageInput.hasAttribute('placeholder')) {
      messageInput.removeAttribute('disabled');
      messageInput.setAttribute('placeholder', 'сообщение...');
      ELEMENT.MESSAGE_BUTTON.removeAttribute("disabled", "");
   };
   storyRender();
   
}

function showElements(...elems) {
   [...elems].forEach(elem => {
      if (elem.classList.contains('hidden')) {
         elem.classList.remove('hidden')
      }
   })
}

function hideElements(...elems) {
   [...elems].forEach(elem => {
      if (!elem.classList.contains('hidden')) {
         elem.classList.add('hidden')
      }
   })
}

function storyRender() {
   const story = getStoryFragment();
   if (!story) {
      return;
   }
   const storyContainer = document.createElement("div");
   storyContainer.classList.add("story-container");
   story.forEach((element) => {
      let name = element.user.name;
      const email = element.user.email;
      if (name == element.user.email) {
         name = "Anonymous";
      }
      const message = createMessage(name, element.text, element.createdAt);
      if (email == Cookies.get('email')) {
         message.classList.add('sent')
      }
      storyContainer.append(message);
   });
   ELEMENT.CHAT_CONTAINER.append(storyContainer);
}

function isAllScrolled(elem) {
   const scrollTop = elem.scrollTop;
   const difference = elem.scrollHeight - elem.clientHeight;
   const result = (difference - (-scrollTop)) <= 40;
   return result;
}

function renderMessage(event) {
   const data = JSON.parse(event.data);
   console.log(data);
   const message = createMessage(data.user.name, data.text, data.createdAt);
   if (data.user.email == Cookies.get('email')) {
      message.classList.add('sent');
   }
   if (message) {
      ELEMENT.CHAT_CONTAINER.prepend(message);
   }
}

function createMessage(sender, text, date = new Date(), classes = []) {
   const message = msgtplt.content.cloneNode(true);
   const messageItem = document.createElement('div');
   messageItem.classList.add("message-item", ...classes);
   messageItem.append(message);

   const messageText = messageItem.querySelector('.message-text');
   const messageSender = messageItem.querySelector('.sender');
   const messageTime = messageItem.querySelector('.message-time');

   const time = format(date, 'HH:mm');
   
   if ((text.trim()).length > 0) {
      messageText.textContent = text;
      messageSender.textContent = sender;
      messageTime.textContent = time;
      return messageItem;
   }
}

export { UiRender, renderMessage, isAllScrolled, storyRender }