import { ELEMENT } from "../data.js";
import { PROTOCOL, URL_PATH, REQUEST_TYPE, METHOD } from "./netData.js"
import { renderMessage } from "../UI/UIrender.js";
import Cookies from "js-cookie";

ELEMENT.LOGIN_FORM.addEventListener("submit", tokenRequest);

class WS {
   constructor() {
      const url = createUrl(PROTOCOL.WSS, URL_PATH.WEBSOCKETS, Cookies.get("token"));
      this.webSocket = new WebSocket(url);
      this.webSocket.addEventListener('message', renderMessage);
   }

   send(text) {
      this.webSocket.send(JSON.stringify({ text: text }));
   }

   close() {
      this.webSocket.close(1000);
   }
}

function saveToken(input) {
   if (input) { Cookies.set("token", input, { sameSite: "None", secure: true}); };
}

async function tokenRequest(e) {
   e.preventDefault();
   const email = ELEMENT.EMAIL_INPUT.value;
   const response = await request(PROTOCOL.HTTPS, URL_PATH.USER, METHOD.POST, false, REQUEST_TYPE.LOGIN, email);
   console.log(response);
   if (response.ok) {
      ELEMENT.ENTER_CODE_BUTTON.dispatchEvent(new Event('click'));
   }
}

async function userInfoRequest() {
   const response = await request(PROTOCOL.HTTPS, URL_PATH.USER_ME, METHOD.GET, true);
   return response.json();
}

async function updateNameRequest(name) {
   const response = await request(PROTOCOL.HTTPS, URL_PATH.USER, METHOD.PATCH, true, REQUEST_TYPE.CHANGE_NAME, name);
   return response.json();
};

async function storyRequest() {
   localStorage.clear();
   const response = await request(PROTOCOL.HTTPS, URL_PATH.MESSAGES, "GET", true);
   const story = await response.json();
   localStorage.setItem('Story', JSON.stringify(story.messages));
}

function getStoryFragment() {
   const story = JSON.parse(localStorage.getItem('Story'));
   if (story.length == 0) {
      return;
   }
   const fragment = story.splice(0, 20);
   localStorage.setItem('Story', JSON.stringify(story));
   return fragment;
}

async function request(
   protocol,
   path,
   method,
   authorized = false,
   ruquestType = '',
   data = '',
   token = Cookies.get("token"),
) {
   const url = createUrl(protocol, path);
   const options = {
      method: method,
      headers: {
         "Content-Type": "application/json;charset=utf-8",
      },
   };
   if (authorized) {
      options.headers.Authorization = `Bearer ${token}`
   }
   switch (ruquestType) {
      case REQUEST_TYPE.LOGIN:
         options.body = JSON.stringify({email: data});
         break;
      case REQUEST_TYPE.CHANGE_NAME:
         options.body = JSON.stringify({name: data });
         break;
   }
   const response = await fetch(url, options);
   return response;
   
}

function createUrl(protocol, pathname, searchparams = '') {
   const base = new URL("https://edu.strada.one/api");
   base.protocol = protocol;
   base.pathname = pathname;
   if (searchparams) {
      base.search = `?${searchparams}`;
   }
   return base.href;
}

export { storyRequest, getStoryFragment, userInfoRequest, updateNameRequest, WS, saveToken}