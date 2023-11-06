import { ELEMENT, POPUP } from "./data.js";
import {loginRequestHandler} from "./main.js"

const popupLinks = document.querySelectorAll('.popup-link');

if (popupLinks.length > 0) {
   for (let i = 0; i < popupLinks.length; i++){
      const popupLink = popupLinks[i];
      popupLink.addEventListener('click', function (e) {
         e.preventDefault();
         const popupID = popupLink.getAttribute('href').replace('#', '');
         const popupTempalate = document.getElementById(popupID);
         showPopUp(popupTempalate);
      });
   }
}
ELEMENT.POPUP.addEventListener('click', closureHandler);

function closureHandler(e) {
   if (e.target.closest('.close-button')) {
      e.preventDefault();
      closePopUp();
   } else if (!e.target.closest('.popup-body') && e.target.closest('.popup')) {
      closePopUp();
   }
}

function showPopUp(template) {
   closePopUp();

   ELEMENT.POPUP.classList.add('opened');
   const innerHeader = ELEMENT.POPUP.querySelector('.inner-header');
   const container = ELEMENT.POPUP.querySelector('.popup-options');
   const popupTemplate = template.content.cloneNode(true);
   container.append(popupTemplate);
   switch (template.id) {
      case POPUP.SETTINGS:
         innerHeader.textContent = 'Настройки';
         break;
      
      case POPUP.LOGIN:
         innerHeader.textContent = 'Авторизация';
         document.querySelector('.popup-content').style.rowGap = '4rem';
         const popupLink = ELEMENT.POPUP.querySelector('.popup-link');
         popupLink.addEventListener('click', (e) => {
            e.preventDefault();
            const popupConfirm = document.getElementById(POPUP.CONFIRM);
            showPopUp(popupConfirm);
         });

         const loginForm = document.getElementById('loginForm');
         loginForm.addEventListener('submit', loginRequestHandler);
         break;
      
      case POPUP.CONFIRM:
         innerHeader.textContent = 'Подтверждение';
         break;
   }
}

function closePopUp() {
   if (ELEMENT.POPUP.classList.contains('opened')) {
      ELEMENT.POPUP.classList.remove('opened')
      ELEMENT.POPUP.querySelector('.popup-options').innerHTML = '';
   }
}