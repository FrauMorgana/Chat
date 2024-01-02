import { userInfoRequest, updateNameRequest, saveToken, storyRequest, WS} from "./Network/network.js";
import Cookies from "js-cookie";

const USER_STATE = {
   unauthorized: 0,
   authorized: 1,
}

const DEFAULT_NAME = 'Anonymous';

class User {
   constructor() {
      this.name = DEFAULT_NAME;
      this.email = '';
      this.token = '';
      this.state = USER_STATE.unauthorized;
      
      const token = Cookies.get('token');
      if (token) {
         this.state = USER_STATE.authorized;
         if (!this.webSocket) {
            this.webSocket = new WS;
         }
         this.infoUpdate();
      }
   }

   async login(token) {
      saveToken(token);
      if (!this.webSocket) {
         this.webSocket = new WS;
      };
      await storyRequest();
      await this.infoUpdate();
      this.state = USER_STATE.authorized;
   }

   async infoUpdate() {
      const response = await userInfoRequest();
      this.token = response.token;
      this.name = response.name;
      this.email = response.email;
      Cookies.set('email', this.email);
      if (this.name == this.email) {
         this.name = DEFAULT_NAME;
      }
   }

   async changeName(name) {
      await updateNameRequest(name);
      this.infoUpdate();
   }

   sendMessage(text) {
      if (!this.webSocket) {
         console.log('no WebSocket');
         return;
      }
      if (text.trim().length > 0) {
         this.webSocket.send(text);
      }
   }

   logout() {
      this.name = DEFAULT_NAME;
      this.email = "";
      this.token = "";
      this.state = USER_STATE.unauthorized;
      this.webSocket.close();
      Cookies.remove('token');
      Cookies.remove('email')
      localStorage.clear();
   }
}

export {User}