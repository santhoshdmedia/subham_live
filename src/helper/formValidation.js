export const formValidation = (message) => {
  return {
    required: true,
    message: message,
  };
};

export const EmailValidation = (message) => {
  return [
    {
      required: true,
      message: message,
    },
    {
      type: "email",
      message: "Please enter a valid email address",
    },
  ];
};

export const PasswordValidation = () => {
  return formValidation("Enter a valid password");
};

export const NameValidation = () => {
  return formValidation(`Enter a valid  name`);
};
