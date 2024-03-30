(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-9",headers:{Authorization:"f313cf58-23c2-4016-9c78-146b5c5913a8","Content-Type":"application/json"}},t="users/me",n="cards",o=function(e){return"/cards/".concat(e,"/likes")},r=function(e,t){return fetch(e,t).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))},c=function(t){var n={method:"PUT",headers:e.headers};return r("".concat(e.baseUrl).concat(o(t)),n)},a=function(t){var n={method:"DELETE",headers:e.headers};return r("".concat(e.baseUrl).concat(o(t)),n)},u=document.querySelector("#card-template").content;function i(t,o,c,a,i){var l=u.querySelector(".card").cloneNode(!0);l.querySelector(".card__title").textContent=t.name,l.querySelector(".card__image").alt=t.name,l.querySelector(".card__image").src=t.link;var s=l.querySelector(".card__like-button"),d=l.querySelector(".card__like-counter"),p=l.querySelector(".card__delete-button");return console.log("userId:",i),console.log("cardData.owner._id:",t.owner._id),i!==t.owner._id?p.style.display="none":(p.style.display="",p.addEventListener("click",(function(){var o=t._id;!function(t,o){(function(t){var o={method:"DELETE",headers:e.headers};return r("".concat(e.baseUrl,"/").concat(n,"/").concat(t),o)})(o).then((function(){t.remove()})).catch((function(e){console.error(e)}))}(l,o)}))),t.likes.some((function(e){return e._id===i}))&&s.classList.add("card__like-button_is-active"),d.textContent=t.likes.length,s.addEventListener("click",(function(){c(d,s,t)})),l.querySelector(".card__image").addEventListener("click",a),l}function l(e,t,n){var o=t.classList.contains("card__like-button_is-active");(o?a:c)(n._id).then((function(n){t.classList.toggle("card__like-button_is-active"),e.textContent=n.likes.length})).catch((function(e){console.error("Произошла ошибка при ".concat(o?"удалении":"добавлении"," лайка:"),e)}))}var s=document.querySelectorAll(".popup");function d(e){e.classList.add("popup_is-opened"),e.classList.add("popup_is-animated"),document.addEventListener("keydown",f),document.addEventListener("click",_)}function p(e){e.classList.remove("popup_is-opened"),e.classList.remove("popup_is-animated"),document.removeEventListener("keydown",f),document.removeEventListener("click",_)}function f(e){s.forEach((function(t){t.classList.contains("popup_is-opened")&&"Escape"===e.key&&p(t)}))}function _(e){s.forEach((function(t){var n=t.querySelector(".popup__content");t!==e.target||n.contains(e.target)||p(t)}))}var m=function(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),o.classList.remove(n.errorClass),o.textContent=""};function v(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid||""==e.value}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))}function y(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);n.forEach((function(n){m(e,n,t)})),v(n,o,t)}function h(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}var S=document.querySelector(".places").querySelector(".places__list"),b=document.querySelector(".popup_type_image"),g=b.querySelector(".popup__image"),q=b.querySelector(".popup__caption"),E=document.querySelector(".profile__edit-button"),L=document.querySelector(".popup_type_edit"),C=document.querySelector(".profile__title"),k=document.querySelector(".profile__image"),A=document.querySelector(".popup__input_type_name"),x=document.querySelector(".popup__input_type_description"),w=document.querySelector(".profile__description"),U=document.querySelector(".profile__add-button"),T=document.querySelector(".popup_type_new-card"),j=document.querySelectorAll(".popup__close"),D=document.forms["edit-profile"],O=document.querySelector(".popup__input_type_card-name"),B=document.querySelector(".popup__input_type_url"),I=document.forms["new-place"],P=(document.querySelectorAll(".card-likes"),{formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"});function M(e){d(b);var t=e.target.closest(".card"),n=e.target.getAttribute("src"),o=e.target.getAttribute("alt"),r=t.querySelector(".card__title").textContent;g.src=n,g.alt=o,q.textContent=r}!function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);n.forEach((function(r){r.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?m(e,t,n):function(e,t,n,o){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(o.inputErrorClass),r.textContent=n,r.classList.add(o.errorClass)}(e,t,t.validationMessage,n)}(e,r,t),v(n,o,t)}))}))}(t,e)}))}(P);var N=document.querySelector(".popup__input_type_avatar"),H=document.querySelector(".profile__image"),J=document.querySelector(".popup-new-avatar");H.addEventListener("click",(function(){d(J),N.value="",y(J,P)})),U.addEventListener("click",(function(){d(T),y(T,P)})),E.addEventListener("click",(function(){d(L),A.value=C.textContent,x.value=w.textContent,y(L,P)})),j.forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(){p(t),y(D,P)}))})),D.addEventListener("submit",(function(n){$((function(){n.preventDefault(),function(n,o){var c={method:"PATCH",headers:e.headers,body:JSON.stringify({name:n,about:o})};return r("".concat(e.baseUrl,"/").concat(t),c)}(A.value,x.value).then((function(e){console.log(e),C.textContent=e.name,w.textContent=e.about})).catch((function(e){return console.log("Ошибка: ".concat(e))})),p(L)}),n)}));var V,z="";function G(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранить",o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"Сохранение...";t.textContent=e?o:n}function $(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранение...";t.preventDefault();var o=t.submitter,r=o.textContent;G(!0,o,r,n),e().then((function(){t.target.reset()})).catch((function(e){console.error("Ошибка: ".concat(e))})).finally((function(){G(!1,o,r,n)}))}I.addEventListener("submit",(function(t){$((function(){t.preventDefault();var o,c,a,u={name:O.value,link:B.value};return(o=u.name,c=u.link,a={method:"POST",headers:e.headers,body:JSON.stringify({name:o,link:c})},r("".concat(e.baseUrl,"/").concat(n),a)).then((function(e){console.log(e);var t=i(e,0,l,z);S.prepend(t),console.log("Closing the popup"),p(T)})).catch((function(e){return console.log(e)}))}),t)})),document.querySelector('.popup__form[name="avatar"]').addEventListener("submit",(function(n){$((function(){return n.preventDefault(),function(n){var o={method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:n})};return r("".concat(e.baseUrl,"/").concat(t,"/").concat("avatar"),o)}(N.value).then((function(e){k.style.backgroundImage="url(".concat(e.avatar,")")})).catch((function(e){return console.log("Ошибка: ".concat(e))})).finally((function(){p(J)}))}),n)})),Promise.all([r("".concat(e.baseUrl,"/").concat(t),{headers:e.headers}),(V={method:"GET",headers:e.headers},r("".concat(e.baseUrl,"/").concat(n),V))]).then((function(e){var t,n,o=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,r,c,a,u=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(o=c.call(n)).done)&&(u.push(o.value),u.length!==t);i=!0);}catch(e){l=!0,r=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw r}}return u}}(t,n)||function(e,t){if(e){if("string"==typeof e)return h(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?h(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),r=o[0],c=o[1];!function(e){console.log(e),e&&(C.textContent=e.name,w.textContent=e.about,k.style.backgroundImage="url(".concat(e.avatar,")"),z=e._id),console.log(z)}(r),S.innerHTML="",c.forEach((function(e){S.append(i(e,0,l,M,z))}))})).catch((function(e){return console.log("Ошибка: ".concat(e))}))})();