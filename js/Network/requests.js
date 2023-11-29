import { ELEMENT } from "../data.js";

const URL_PATH = {
   USER: "/user",
   USER_ME: "/user/me",
   MESSAGES: "/messages/",
};
const REQUEST_TYPE = {
   LOGIN: 'login',
   CHANGE_NAME: 'new-name',
}
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVsbGVvbl9rdWJlbEB1a3IubmV0IiwiaWF0IjoxNzAxMTk1NDQ4LCJleHAiOjE3MDQ3OTE4NDh9.fxZWj8ScwwtsE4rRBWvOhtxwCtBr3Z6nKSmml16EXcw";

ELEMENT.SETTINGS_FORM.addEventListener('submit', updateNameRequest);
ELEMENT.LOGIN_FORM.addEventListener("submit", tokenRequest);

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
   console.log(response.json());
}

async function testRequest() {
   const response = await fetch("https://edu.strada.one/api/user", {
      method: 'POST',
      headers: { "Content-Type": "application/json;charset=utf-8", },
      body: JSON.stringify({ email: myemail }),
   });
   console.log(response.json());
};