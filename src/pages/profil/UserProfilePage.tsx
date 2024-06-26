import React from "react";
import { GiBrain } from "react-icons/gi";
import { MdOutlinePerson } from "react-icons/md";
import { PiUsersFourThin } from "react-icons/pi";
import { CiLogout, CiSettings } from "react-icons/ci";
import { Outlet } from "react-router-dom";

const UserProfilePage = () => {
  return (
    <div className="h-screen flex">
      <div className="w-3/12 bg-gray-50 h-full flex flex-col pt-5">
        <div className="w-full py-2 pl-10 pr-2 font-rubik font-normal text-lg hover:bg-gray-200 cursor-pointer mb-7 transition-all duration-300 flex items-center">
          <MdOutlinePerson className="text-3xl" />
          <div className="ml-2">Informations personnelles</div>
        </div>
        <div className="w-full py-2 pl-10 pr-2 font-rubik font-normal text-lg hover:bg-gray-200 cursor-pointer mb-7 transition-all duration-300 flex items-center">
          <GiBrain className="text-3xl" />
          <div className="ml-2">Diagnostiques</div>
        </div>
        <div className="w-full py-2 pl-10 pr-2 font-rubik font-normal text-lg hover:bg-gray-200 cursor-pointer mb-7 transition-all duration-300 flex items-center">
          <PiUsersFourThin className="text-3xl" />
          <div className="ml-2">Patients</div>
        </div>
        <div className="w-full py-2 pl-10 pr-2 font-rubik font-normal text-lg hover:bg-gray-200 cursor-pointer mb-7 transition-all duration-300 flex items-center">
          <CiSettings className="text-3xl" />
          <div className="ml-2">Parametres</div>
        </div>
        <div className="w-full py-2 pl-10 pr-2 bg-red-100 text-red-700 hover:bg-red-600 hover:text-white font-normal font-rubik text-lg cursor-pointer transition-all duration-300 flex items-center mt-10">
          <CiLogout className="text-3xl" />
          <div className="ml-2">Se déconnecter</div>
        </div>
      </div>
      <div className="w-9/12">
        <Outlet />
      </div>
    </div>
  );
};

export default UserProfilePage;
