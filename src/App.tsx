import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import {
  ApiPage,
  DiagnosticPage,
  HomePage,
  SignInPage,
  SignUpPage,
  UserProfilePage,
} from "./pages";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { useAppDispatch } from "./hooks/redux-custom-hooks/useAppDispatch";
import { constants } from "fs";
import { setCurrentUser } from "./redux/slices/currentUserSlice";
import SavedDisgnosticsPage from "./pages/profil/diagnostic/SavedDisgnosticsPage";

function App() {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      dispatch(setCurrentUser(user));
    }
  }, [dispatch]);
  return (
    <div className="font-rubik font-light" id="app">
      <Header />
      <div className="h-24 w-full"></div>
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="api" element={<ApiPage />} />
        <Route path="sign-in" element={<SignInPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
        <Route path="diagnostic" element={<DiagnosticPage />} />
        <Route path="account" element={<UserProfilePage />}>
          <Route path="" element={<SavedDisgnosticsPage />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
