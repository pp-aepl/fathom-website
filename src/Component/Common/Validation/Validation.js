import { validationMessages } from "../../../store/actions/api-url";

let regexNum = /^(?=.*[0-9])/;
// let regexSmlChar = /^(?=.*[a-z])/;
// let regexUprChar = /^(?=.*[A-Z])/;
// let regexSpclChar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

export const validateFirstName = (fName) => {
  const errMsg = !fName
    ? validationMessages.fName
    : !/^[a-z][a-z\s]*$/i.test(fName)
    ? validationMessages.allowAlphabets
    : "";
  return errMsg;
};

export const validateLastName = (lName) => {
  const errMsg = !lName
    ? validationMessages.lName
    : !/^[a-z][a-z\s]*$/i.test(lName)
    ? validationMessages.allowAlphabets
    : "";
  return errMsg;
};
export const validateNumber = (num) => {
  const errMsg = !num
    ? validationMessages.validnum
    : !regexNum.test(num)
    ? validationMessages.validnum
    : "";
  return errMsg;
};
export const validateName = (Name) => {
  const errMsg = !Name
    ? validationMessages.name
    : !/^[a-z][a-z\s]*$/i.test(Name)
    ? validationMessages.allowAlphabets
    : "";
  return errMsg;
};
export const validateEmail = (email) => {
  const errMsg = !email
    ? validationMessages.emailReq
    : !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)
    ? validationMessages.validEmail
    : "";
  return errMsg;
};
export const validateMobile = (Mobile) => {
  const errMsg = !Mobile
    ? ""
    : // ? validationMessages.phoneReq
    /\D/g.test(Mobile)
    ? // : !/^(\+\d{1,3}[- ]?)?\d{10}$/.test(Mobile)
      validationMessages.validMobile
    : Mobile.length < 8 || Mobile.length > 15
    ? validationMessages.validMobile
    : "";
  return errMsg;
};
export const validatePassWord = (password) => {
  const errMsg = !password
    ? validationMessages.passwReq
    : !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(password)
    ? validationMessages.validPass
    : "";
  return errMsg;
};
export const validateCPassWord = (cpassword, password) => {
  const errMsg = !cpassword
    ? validationMessages.cpasswReq
    : cpassword !== password
    ? validationMessages.notMatchPassw
    : "";
  return errMsg;
};
export const validatetitle = (title) => {
  const errMsg = !title
    ? validationMessages.require
    : // : !/^[a-z][a-z\s]*$/i.test(title)
      // ? validationMessages.allowAlphabets
      "";
  return errMsg;
};
export const validateRequire = (val) => {
  const errMsg =  !String(val)  ? validationMessages.require : "";
  return errMsg;
};

export const validateContentType = (val) => {
  const errMsg = !val ? validationMessages.require : "";
  return errMsg;
};
export const validatePalteform = (pId) => {
  const errMsg = !pId ? validationMessages.require : "";
  return errMsg;
};
export const validateImage = (img) => {
  const errMsg = !img ? validationMessages.require : "";
  return errMsg;
};
export const validateTextField = (val) => {
  const errMsg = !val
    ? validationMessages.require
    : !/^[a-z][a-z\s]*$/i.test(val)
    ? validationMessages.allowAlphabets
    : "";
  return errMsg;
};

export const validateOTP=(otp)=>{
  const errMsg = !otp
  ? validationMessages.otpEnter
  : otp&&otp.length<4
  ? validationMessages.validOtp
  : "";
return errMsg;
}
export const validateblogDescription = (val) => {
  const errMsg = !val
    ? validationMessages.require
    : // : !/^[a-z][a-z\s]*$/i.test(val)
    // ? validationMessages.allowAlphabets
    val.length > 80
    ? validationMessages.blogDescriptionMax
    : "";
  return errMsg;
};
export const validateStartTime = (sTime) => {
  let errMsg = "";
  const currentDate = new Date();
  const selectedFromDate = new Date(sTime);
  if (sTime) {
    if (
      currentDate.getDate() === selectedFromDate.getDate() &&
      !(currentDate.getTime() < selectedFromDate.getTime())
    ) {
      errMsg = validationMessages.invalTime;
    }
  } else {
    errMsg = "";
  }
  return errMsg;
};

export const validateEndTime = (sTime, eTime) => {
  let errMsg = "";
  const currentDate = new Date();
  const selectedFromDate = new Date(sTime);
  const selectedToDate = new Date(eTime);
  if (eTime) {
    if (
      currentDate.getDate() === selectedToDate.getDate() &&
      !(currentDate.getTime() < selectedToDate.getTime())
    ) {
      errMsg = validationMessages.invalTime;
    }
    if (selectedFromDate.getTime() === selectedToDate.getTime()) {
      errMsg = validationMessages.sameTime;
    }
    if (!(selectedFromDate.getTime() < selectedToDate.getTime())) {
      errMsg = validationMessages.invalTime;
    }
  }else {
    errMsg = "";
  }
  return errMsg;
};

export const isValid = (errors) => {
  let keys = Object.keys(errors);
  let countError = keys.reduce(
    (acc, curr) => (errors[curr] ? acc + 1 : acc),
    0
  );
  return countError === 0;
};
