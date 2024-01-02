import { UiRender, isAllScrolled, storyRender } from "./UI/UIrender.js";
import { ELEMENT } from "./data.js";
import { User } from "./user.js";
import { storyRequest } from "./Network/network.js";
import { closePopup } from "./UI/popups.js";

const user = new User;

async function appInit() {
   if (user.state == 1) {
      await storyRequest();
   }
   UiRender(user);
}

async function loginHandler(e) {
   e.preventDefault();
   await user.login(ELEMENT.TOKEN_INPUT.value);
   closePopup();
   UiRender(user);
}

function logoutHandler(e) {
   e.preventDefault();
   user.logout();
   UiRender(user);
}

async function changeName(e) {
   e.preventDefault();
   await user.changeName(ELEMENT.NAME_INPUT.value);
   ELEMENT.NAME_INPUT.value = '';
   closePopup();
}

function userMessageHandler(e) {
   e.preventDefault();
   user.sendMessage(ELEMENT.MESSAGE_INPUT.value);
   ELEMENT.MESSAGE_INPUT.value = "";
}

function moreStoryLoad() {
   if (isAllScrolled(ELEMENT.CHAT_CONTAINER)) {
      storyRender();
   }
}

function debounce(callback, delay) {
   let timer;
   return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => callback.apply(this, args), delay);
   };
}

const scrollHandler = debounce(moreStoryLoad, 100);

document.addEventListener('DOMContentLoaded', appInit);
ELEMENT.SETTINGS_FORM.addEventListener('submit', changeName);
ELEMENT.MESSAGE_FORM.addEventListener("submit", userMessageHandler);
ELEMENT.CHAT_CONTAINER.addEventListener("scroll", scrollHandler);
ELEMENT.LOGOUT_BUTTON.addEventListener('click', logoutHandler);
ELEMENT.AUTHORIZ_FORM.addEventListener("submit", loginHandler);