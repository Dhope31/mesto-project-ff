export const nameInput = document.querySelector('.popup__input_type_name'); 
export const jobInput = document.querySelector('.popup__input_type_description'); 
const popups = document.querySelectorAll('.popup');

export function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    popup.classList.add('popup_is-animated');
    document.addEventListener('keydown', escClose);
    document.addEventListener('click', overlay);
  };

export function openTypeProfile() {
    openPopup(popupTypeEdit);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
  };

export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    popup.classList.remove('popup_is-animated');
    document.removeEventListener('keydown', escClose);
    document.removeEventListener('click', overlay);
  };

function escClose(evt) {     
    popups.forEach((popup) => {
          if (popup.classList.contains('popup_is-opened') && evt.key === 'Escape')
          closePopup(popup) 
          document.removeEventListener('keydown', escClose);  
    }  
    )};
  
    function overlay(evt) {     
        popups.forEach((popup) => {
          const content = popup.querySelector('.popup__content');
            if (popup === evt.target && !content.contains(evt.target)) 
            closePopup(popup)  
          }  
        )};

    //