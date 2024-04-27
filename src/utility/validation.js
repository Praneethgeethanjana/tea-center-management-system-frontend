export const customMobileValidation = (number, condition) => {
  let result = condition;
  if (!result) {
    let reg = new RegExp("^(9474)[0-9]{7}$");
    result = reg.test(number);
  }
  return result;
};

// export const mobileNumberInputValidation = (
//   currentValue,
//   preValue,
//   condition
// ) => {
//   let reg = new RegExp("^\\+[0-9]*$|^[0-9]*$");
//   return (
//     reg.test(currentValue) &&
//     (!condition ||
//       currentValue.length < preValue.length ||
//       (currentValue === "0" + preValue && condition))
//   );
// };

export const mobileNumberInputValidation = (value, withdialcode, condition) => {
  let reg = new RegExp("^\\+[0-9]*$|^[0-9]*$");
  return {
    numberInputValidation: reg.test(value),
    mobileNumberValidation: newMobileNumberValidation(
      withdialcode.substr(1).replace(/\s/g, ""),
      condition
    ),
  };
};

export const newMobileNumberValidation = (number, condition) => {
  let result = condition;
  if (!result) {
    let reg = new RegExp("^(9474)[0-9]{7}$");
    result = reg.test(number);
  }
  return result;
};

// export const allPhoneValidation = /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/g;
export const allPhoneValidation = /^\+?\d{1,3}-?\d{4,14}$/;

export const emailRegex =
  /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
