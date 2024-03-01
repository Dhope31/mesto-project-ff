const popups = document.querySelectorAll('.popup');

export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  popup.classList.add('popup_is-animated');
  document.addEventListener('keydown', closeEsc);
  document.addEventListener('click', closeClickOverlay);
};

export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  popup.classList.remove('popup_is-animated');
  document.removeEventListener('keydown', closeEsc);
  document.removeEventListener('click', closeClickOverlay);
};

function closeEsc(evt) {     
  popups.forEach((popup) => {
    if (popup.classList.contains('popup_is-opened') && evt.key === 'Escape')
      closePopup(popup)  
  }  
)};
  
function closeClickOverlay(evt) {     
  popups.forEach((popup) => {
    const content = popup.querySelector('.popup__content');
    if (popup === evt.target && !content.contains(evt.target)) 
    closePopup(popup)  
  }  
)};