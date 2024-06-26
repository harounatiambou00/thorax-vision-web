import React from "react";
import { UnderlinedAnimatedLink } from "../core";
import { Button, IconButton } from "@mui/material";
import {
  MdKeyboardArrowDown,
  MdOutlinePerson,
  MdOutlinePersonAddAlt1,
  MdPercent,
} from "react-icons/md";
import { GiBrain } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../redux/store";

const Header = () => {
  const navigate = useNavigate();
  let currentUser = useAppSelector(
    (state: RootState) => state.currentUserSlice
  );
  return (
    <div className="w-full h-24 bg-gray-50 fixed top-0 z-50 flex items-center justify-between py-2 px-10">
      <h1 className="text-3xl font-sedan">ThoraxVision</h1>
      <div className="flex items-center justify-end">
        <div className="px-5 border-r boder-gray-600 select-none">
          <UnderlinedAnimatedLink
            text="Accueil"
            action={() => {
              navigate("/");
            }}
          />
        </div>
        <div className="px-5 border-r boder-gray-600 select-none">
          <UnderlinedAnimatedLink
            text="A propos"
            action={() => {
              navigate("/");
            }}
          />
        </div>
        <div className="px-5 border-r boder-gray-600 select-none">
          <UnderlinedAnimatedLink
            text="Contacts"
            action={() => {
              navigate("/");
            }}
          />
        </div>
        <div className="px-5 border-r boder-gray-600 select-none">
          <UnderlinedAnimatedLink
            text="API"
            action={() => {
              navigate("/api");
            }}
          />
        </div>
        {currentUser.uid === null ? (
          <Button
            variant="outlined"
            startIcon={<MdOutlinePersonAddAlt1 />}
            className="ml-10 rounded-full font-rubik font-light"
            onClick={() => navigate("/sign-in")}
          >
            S'identifier
          </Button>
        ) : (
          <div
            className="overflow-x-hidden ml-10 px-4 py-1 rounded-full border flex items-center drop-shadow-md select-none cursor-pointer"
            onClick={() => navigate("/account")}
          >
            {<MdOutlinePerson className="text-3xl mr-2 text-gray-600" />}
            <p>
              {currentUser.email?.slice(0, 10)}
              {"..."}
            </p>
            <MdKeyboardArrowDown className="ml-2" />
          </div>
        )}
        <Button
          variant="contained"
          startIcon={<GiBrain />}
          className="ml-5 rounded-full font-rubik font-light"
          onClick={() => navigate("/diagnostic")}
        >
          Diagnostiquer
        </Button>
      </div>
    </div>
  );
};

export default Header;
