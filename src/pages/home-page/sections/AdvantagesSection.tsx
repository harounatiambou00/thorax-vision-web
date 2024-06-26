import React from "react";
import { IoSpeedometerOutline } from "react-icons/io5";
import { AiOutlineApi } from "react-icons/ai";

const AdvantagesSection = () => {
  return (
    <div className="px-20 py-10 grid grid-cols-3 gap-10">
      <div className="flex flex-col items-center p-10 rounded-md">
        <div className="p-3 bg-purple-100 rounded-full">
          <IoSpeedometerOutline className="text-5xl text-purple-700" />
        </div>
        <h1 className="font-kalnia font-semibold text-2xl text-center mt-2">
          Précision
        </h1>
        <p className="text-center mt-2">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim
          consectetur iusto labore veniam, molestiae impedit eligendi assumenda
          illum blanditiis beatae porro alias. Natus sequi quibusdam deleniti
          tempora, molestiae magni neque?
        </p>
      </div>
      <div className="flex flex-col items-center p-10 rounded-md">
        <div className="p-3 bg-green-100 rounded-full">
          <IoSpeedometerOutline className="text-5xl text-green-700" />
        </div>
        <h1 className="font-kalnia font-semibold text-2xl text-center mt-2">
          Gain de Temps et Efficacité
        </h1>
        <p className="text-center mt-2">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim
          consectetur iusto labore veniam, molestiae impedit eligendi assumenda
          illum blanditiis beatae porro alias. Natus sequi quibusdam deleniti
          tempora, molestiae magni neque?
        </p>
      </div>
      <div className="flex flex-col items-center p-10 rounded-md">
        <div className="p-3 bg-amber-100 rounded-full">
          <AiOutlineApi className="text-5xl text-amber-700" />
        </div>
        <h1 className="font-kalnia font-semibold text-2xl text-center mt-2">
          Intégration Facile et Sécurisée
        </h1>
        <p className="text-center mt-2">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim
          consectetur iusto labore veniam, molestiae impedit eligendi assumenda
          illum blanditiis beatae porro alias. Natus sequi quibusdam deleniti
          tempora, molestiae magni neque?
        </p>
      </div>
    </div>
  );
};

export default AdvantagesSection;
