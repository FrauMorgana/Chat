import Cookies from "js-cookie";

const URL_PATH = {
   USER: "/user",
   USER_ME: "/user/me",
   MESSAGES: "/messages/",
};

const REQUEST_TYPE = {
   LOGIN: "login",
   CHANGE_NAME: "new-name",
};

const token = Cookies.get("token") || "";

let chatStory = {};

export { URL_PATH, REQUEST_TYPE, token, chatStory };
