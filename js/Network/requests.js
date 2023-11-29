import { ELEMENT } from "../data.js";
import {URL_PATH, REQUEST_TYPE, token, chatStory} from "./netData.js"
import Cookies from "js-cookie";

//document.addEventListener('DOMContentLoaded', storyRequest);
ELEMENT.SETTINGS_FORM.addEventListener('submit', updateNameRequest);
ELEMENT.LOGIN_FORM.addEventListener("submit", tokenRequest);
ELEMENT.AUTHORIZ_FORM.addEventListener('submit', saveToken);

function saveToken(e) {
   e.preventDefault();
   const token = ELEMENT.TOKEN_INPUT.value;
   if (token) { Cookies.set("token", token); };
}

function tokenRequest(e) {
   e.preventDefault();
   const email = ELEMENT.EMAIL_INPUT.value;
   request(URL_PATH.USER, 'POST', false, REQUEST_TYPE.LOGIN, email);
}

function updateNameRequest(e) {
   e.preventDefault();
   const name = ELEMENT.NAME_INPUT.value;
   request(URL_PATH.USER, 'PATCH', true, REQUEST_TYPE.CHANGE_NAME, name);
   request(URL_PATH.USER_ME, 'GET', true);
};

async function storyRequest() {
   const story = await request(URL_PATH.MESSAGES, 'GET', true);
   return story;
   console.log(chatStory); 
   console.log(Array.isArray(chatStory.messages)); 
}

async function request(
   path,
   method,
   authorized = false,
   ruquestType = '',
   data = '',
) {
   const basicUrl = new URL("https://edu.strada.one/api");
   const url = `${basicUrl}${path}`;
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
   return response.json();
}

async function testRequest() {
   const response = await fetch("https://edu.strada.one/api/user", {
      method: 'POST',
      headers: { "Content-Type": "application/json;charset=utf-8", },
      body: JSON.stringify({ email: myemail }),
   });
   console.log(response.json());
};

export {storyRequest}