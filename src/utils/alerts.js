import SwalAlert from 'sweetalert2';

const modalMessage = (title_, text_, type, nameButton = 'Ok') => {
  return SwalAlert.fire({
    title: title_,
    text: text_,
    icon: type,
    showCancelButton: false,
    confirmButtonText: nameButton,
    allowEscapeKey: false,
    allowOutsideClick: false,
  });
};
export{ modalMessage }