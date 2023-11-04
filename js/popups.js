import { ELEMENT, POPUP } from "./data.js";

settingsButton.addEventListener('click', settingsPopUp);

function settingsPopUp(e) {
   e.preventDefault();
   showPopUp('settings');
}

function showPopUp(option) {
   ELEMENT.POPUP.classList.add('opened');
   const innerHeader = ELEMENT.POPUP.querySelector('.inner-header');
   const container = ELEMENT.POPUP.querySelector('.popup-options');
   const settingsContent = settings.content.cloneNode(true);
   const loginContent = login.content.cloneNode(true);
   const confirmContent = confirmCode.content.cloneNode(true);

   switch (option) {
      case POPUP.SETTINGS:
         innerHeader.textContent = 'Настройки';
         container.append(settingsContent);
         break;
      case POPUP.LOGIN:
         innerHeader.textContent = 'Авторизация';
         container.append(loginContent);
         break;
      case POPUP.CONFIRM:
         innerHeader.textContent = 'Подтверждение';
         container.append(confirmContent);
         break;
   }
}