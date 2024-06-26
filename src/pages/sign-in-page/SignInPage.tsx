import {
  Alert,
  Button,
  Chip,
  Divider,
  IconButton,
  OutlinedInput,
  Switch,
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
import { auth } from "../../config/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAppDispatch } from "../../hooks/redux-custom-hooks/useAppDispatch";
import { setCurrentUser } from "../../redux/slices/currentUserSlice";

const SignInPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();
  const [credentialsError, setCredentialsError] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useAppDispatch();
  const [remenberMe, setRemenberMe] = React.useState(true);

  const signIn = async () => {
    setIsLoading(true);

    try {
      let response = await signInWithEmailAndPassword(auth, email, password);
      setCredentialsError(false);
      if (response) {
        const userInfo = {
          uid: response.user.uid,
          email: response.user.email,
          displayName: response.user.displayName,
          photoURL: response.user.photoURL,
        };
        dispatch(setCurrentUser(userInfo));

        // Store user information in local storage if rememberMe is true
        if (remenberMe) {
          localStorage.setItem("currentUser", JSON.stringify(userInfo));
        }

        navigate("/");
        setIsLoading(false);
      }
    } catch (e) {
      setCredentialsError(true);
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="p-10 bg-gray-50 rounded-md w-5/12">
        <h1 className="font-kalnia text-3xl font-semibold">Connexion</h1>
        <p>
          Connectez vous en saisissant votre adresse mail et votre mot de passe.
          <br />
          Si vous n'avez pas encore de compte,{" "}
          <span
            className="text-blue-600 underline cursor-pointer"
            onClick={() => navigate("/sign-up")}
          >
            creez-en un
          </span>
          .
        </p>
        {credentialsError && (
          <Alert severity="error" className="font-rubik text-red-600">
            Les informations que vous avez fournies sont incorrectes. Veuillez
            vérifier les données saisies et essayer à nouveau.{" "}
          </Alert>
        )}
        <div className="flex flex-col mt-5">
          <label htmlFor="" className="font-medium font-kalnia mb-2">
            Email
          </label>
          <OutlinedInput
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            startAdornment={<AiOutlineMail className="text-3xl mr-3" />}
            className="rounded-lg pl-2 font-rubik font-light"
          />
        </div>
        <div className="flex flex-col mt-5">
          <label htmlFor="" className="font-medium font-kalnia mb-2">
            Mot de passe
          </label>
          <OutlinedInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            startAdornment={<MdLockOutline className="text-3xl mr-3" />}
            endAdornment={
              <IconButton onClick={() => setShowPassword(!showPassword)}>
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
        <p className="text-blue-600 underline cursor-pointer mt-3 w-fit">
          Mot de passe oublie ?
        </p>
        <Button
          variant="contained"
          className="mt-10 font-kalnia text-xl font-medium w-full normal-case rounded-lg"
          onClick={signIn}
          disabled={isLoading}
        >
          Connexion
        </Button>
        <div className="flex items-center mt-2">
          <Switch
            checked={remenberMe}
            onChange={() => setRemenberMe(!remenberMe)}
            className=""
          />
          <p className="font-rubik">Se souvenir de moi</p>
        </div>
        <Divider className="mt-5">
          <Chip label="OU" size="small" />
        </Divider>
        <Button
          variant="outlined"
          className="w-full rounded-lg mt-5"
          startIcon={<IoLogoGoogle />}
        >
          Continuer avec google
        </Button>
      </div>
    </div>
  );
};

export default SignInPage;
