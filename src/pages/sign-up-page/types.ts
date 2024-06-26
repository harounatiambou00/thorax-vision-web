export type ValuesType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  title: string;
  institution: string;
};

export type Errors = {
  emailError: boolean;
  passwordError: boolean;
  confirmPassowrdError: boolean;
};

export type EmailErrorType =
  | "isRequired"
  | "isInvalid"
  | "isAlreadyTaken"
  | "none";

export const EmailErrorMessages = {
  isInvalid: "Vous devez founir une adresse email valide.",
  isAlreadyTaken: "Cette adresse est déja utilisé par un autre client.",
  isRequired: "Vous devez renseigner votre adresse email",
};

export type PassworErrorTypes = "isRequired" | "isInvalid" | "none";
export const PassworErrorMessages = {
  isInvalid:
    "Un mot de passe doit contenir au moins 12 carateres dont au moins: \n-Une Lettre\n-Un chiffre\n-Un caractere special.",
  isRequired: "Vous devez saisir un mot de passe.",
};
export type ConfirmPassworErrorTypes = "isRequired" | "notTheSame" | "none";
export const ConfirmPassworErrorMessages = {
  isInvalid:
    "Ce mot de passe ne correspond pas au premier que vous avez saisi.",
  isRequired: "Vous devez confirmer votre mot de passe.",
};
