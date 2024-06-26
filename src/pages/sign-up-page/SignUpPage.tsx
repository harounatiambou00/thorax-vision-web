import {
  Button,
  Chip,
  Divider,
  IconButton,
  OutlinedInput,
} from "@mui/material";
import React from "react";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineMail,
} from "react-icons/ai";
import { IoLogoGoogle } from "react-icons/io5";
import { MdLockOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  EmailErrorMessages,
  EmailErrorType,
  Errors,
  ValuesType,
} from "./types";
import { auth } from "../../config/firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { saveUserAdditionalInfo } from "../../services/userService";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();
  const [values, setValues] = React.useState<ValuesType>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    title: "",
    institution: "",
  });

  const [errors, setErrors] = React.useState<Errors>({
    emailError: false,
    passwordError: false,
    confirmPassowrdError: false,
  });
  const [emailErrorType, setEmailErrorType] =
    React.useState<EmailErrorType>("none");

  /**
   * handle the onChange event of our email input and
   * check the validity of the current email
   */
  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, email: event.target.value });
    if (event.target.value === "") {
      setErrors((currentState) => ({
        ...currentState,
        emailError: true,
      }));
      setEmailErrorType("isRequired");
    } else if (
      !event.target.value
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setErrors((currentState) => ({
        ...currentState,
        emailError: true,
      }));
      setEmailErrorType("isInvalid");
    } else {
      setErrors((currentState) => ({
        ...currentState,
        emailError: false,
      }));
      setEmailErrorType("none");
    }
  };

  /**
   * handle the onChange event of our password input and
   * check the validity of the current password
   */
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, password: event.target.value });
    if (event.target.value.length < 8) {
      setErrors({ ...errors, passwordError: true });
    } else {
      setErrors({ ...errors, passwordError: false });
    }
    if (event.target.value !== values.confirmPassword) {
      setErrors({ ...errors, confirmPassowrdError: true });
    } else {
      setErrors({ ...errors, confirmPassowrdError: false });
    }
  };

  const handleChangeConfirmPassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, confirmPassword: event.target.value });

    if (event.target.value !== values.password) {
      setErrors({ ...errors, confirmPassowrdError: true });
    } else {
      setErrors({ ...errors, confirmPassowrdError: false });
    }
  };
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSignUp = async () => {
    if (
      !errors.emailError &&
      !errors.passwordError &&
      !errors.confirmPassowrdError
    ) {
      if (values.email === "") {
        setErrors((currentState) => ({ ...currentState, emailError: true }));
        setEmailErrorType("isRequired");
        //If the email field is not filled, we want to stop the function
        return;
      } else {
        setErrors((currentState) => ({ ...currentState, emailError: false }));
      }
      if (values.password === "") {
        setErrors((currentState) => ({ ...currentState, passwordError: true }));
        //If the password field is not filled, we want to stop the function
        return;
      } else {
        setErrors((currentState) => ({
          ...currentState,
          passwordError: false,
        }));
      }

      try {
        setIsLoading(true);
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        const user = userCredential.user;
        if (user) {
          let saveUserAdditionInfoResponse = await saveUserAdditionalInfo(
            user.uid,
            {
              uid: user.uid,
              name: values.name,
              title: values.title,
              institution: values.institution,
              photoURL: "",
            }
          );

          navigate("/sign-in");
        } else {
        }
        setIsLoading(false);
      } catch (error) {
        console.log("");
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center my-10">
      <div className="p-10 bg-gray-50 rounded-md w-8/12">
        <h1 className="font-kalnia text-3xl font-semibold">
          Création d'un compte
        </h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum
          quos inventore voluptates, molestias architecto minus voluptatem.
          <br />
          Avez-vous déja un compte ?{" "}
          <span
            className="text-blue-600 underline cursor-pointer"
            onClick={() => navigate("/sign-in")}
          >
            connectez-vous ici
          </span>
          .
        </p>
        <div className="grid grid-cols-2 gap-5 mt-10">
          <div className="flex flex-col">
            <label htmlFor="" className="font-medium font-kalnia mb-2">
              Nom complet
            </label>
            <OutlinedInput
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
              type="text"
              className="rounded-lg font-rubik font-light"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="font-medium font-kalnia mb-2">
              Adresse mail <span className="font-rubik text-red-600">*</span>
            </label>
            <OutlinedInput
              error={errors.emailError}
              value={values.email}
              onChange={handleChangeEmail}
              type="email"
              startAdornment={
                <AiOutlineMail
                  className={
                    errors.emailError
                      ? "text-3xl mr-3 text-red-600"
                      : "text-3xl mr-3"
                  }
                />
              }
              className="rounded-lg pl-2 font-rubik font-light"
            />
            <small className="text-red-600 font-rubik">
              {errors.emailError && emailErrorType !== "none"
                ? EmailErrorMessages[emailErrorType]
                : ""}
            </small>
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="font-medium font-kalnia mb-2">
              Titre/Poste
            </label>
            <OutlinedInput
              value={values.title}
              onChange={(e) => setValues({ ...values, title: e.target.value })}
              type="text"
              className="rounded-lg font-rubik font-light"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="font-medium font-kalnia mb-2">
              Institution
            </label>
            <OutlinedInput
              value={values.institution}
              onChange={(e) =>
                setValues({ ...values, institution: e.target.value })
              }
              type="text"
              className="rounded-lg font-rubik font-light"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="font-medium font-kalnia mb-2">
              Mot de passe <span className="font-rubik text-red-600">*</span>
            </label>
            <OutlinedInput
              error={errors.passwordError}
              value={values.password}
              onChange={handleChangePassword}
              type={showPassword ? "text" : "password"}
              startAdornment={
                <MdLockOutline
                  className={
                    errors.passwordError
                      ? "text-3xl mr-3 text-red-600"
                      : "text-3xl mr-3"
                  }
                />
              }
              endAdornment={
                <IconButton
                  color={errors.passwordError ? "error" : "default"}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible className="text-3xl" />
                  ) : (
                    <AiOutlineEye className="text-3xl" />
                  )}
                </IconButton>
              }
              className="rounded-lg pl-2 font-rubik font-light"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="font-medium font-kalnia mb-2">
              Confirmez le mot de passe{" "}
              <span className="font-rubik text-red-600">*</span>
            </label>
            <OutlinedInput
              error={values.confirmPassword !== values.password}
              value={values.confirmPassword}
              onChange={handleChangeConfirmPassword}
              type={showPassword ? "text" : "password"}
              startAdornment={<MdLockOutline className="text-3xl mr-3" />}
              endAdornment={
                <IconButton
                  color={
                    values.confirmPassword !== values.password
                      ? "error"
                      : "default"
                  }
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible className="text-3xl" />
                  ) : (
                    <AiOutlineEye className="text-3xl" />
                  )}
                </IconButton>
              }
              className="rounded-lg pl-2 font-rubik font-light"
            />
          </div>
        </div>

        <div className="w-full flex flex-col items-center mt-10">
          <p className="w-1/2 text-center">
            En créant un compte, vous acceptez les conditions d'utilisation et
            la politique de confidentialité.
          </p>
          <Button
            variant="contained"
            className=" mt-2 font-kalnia text-xl font-medium normal-case rounded-lg"
            onClick={handleSignUp}
            disabled={isLoading}
          >
            Créer le compte
          </Button>
        </div>
        <Divider className="mt-5">
          <Chip label="OU" size="small" />
        </Divider>
        <div className="w-full flex justify-center">
          <Button
            variant="outlined"
            className="rounded-lg mt-5"
            startIcon={<IoLogoGoogle />}
            size="large"
          >
            Continuer avec google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
