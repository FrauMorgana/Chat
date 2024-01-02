document.addEventListener('DOMContentLoaded', popupsHandler);

function popupsHandler() {
   popupsListeners('add', openPopup);
   popupsListeners('add', popupsClosure, document.querySelectorAll('.popup'));
   const logoutBtn = document.querySelector('.logoutBtn');
   if (logoutBtn) {
      popupsListeners('remove', openPopup, logoutBtn);
   }
}

function popupsListeners(action, callback, popupLinks = document.querySelectorAll('.popup-link')) {
   if (popupLinks.length > 0) {
      for (let i = 0; i < popupLinks.length; i++) {
         const popupLink = popupLinks[i];
         switch (action) {
            case 'add':
               popupLink.addEventListener('click', callback);
               break;
            case 'remove':
               popupLink.removeEventListener('click', callback);
               break;
         }
      }
   }
}

function popupsClosure(e) {
   if (e.target.closest('.close-button') || (e.target.closest('.popup') && !e.target.closest('.popup-body'))) {
      closePopup();
   }
}

function openPopup(e) {
   e.preventDefault();
   const currentPopup = document.querySelector('.opened');
   if (currentPopup) {
      closePopup();
   };
   const popupID = e.target.getAttribute('href').replace('#', '');
   const popup = document.getElementById(popupID);
   popup.classList.add('opened');
}

function closePopup() {   
   const currentPopup = document.querySelector('.opened');
   if (currentPopup) {
      currentPopup.classList.remove('opened');
   }
}

export {closePopup}