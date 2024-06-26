import { Button } from "@mui/material";
import React from "react";
import { GiBrain } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const LandingSection = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full bg-gray-50 min-h-96 px-20 flex justify-between items-center border-b border-gray-500">
      <div className="w-5/12 py-40">
        <h1 className="font-kalnia text-4xl font-semibold">
          IA Médicale: Diagnostic Précis pour vos Patients
        </h1>
        <p className="text-lg mt-5">
          Optimisez vos diagnostics médicaux grâce à notre IA avancée : Une
          approche moderne pour des soins de santé plus rapides, précis et
          efficaces.
        </p>
        <div className="flex items-center mt-10">
          <Button
            variant="contained"
            startIcon={<GiBrain />}
            size="large"
            className="rounded-full font-rubik font-light"
            onClick={() => navigate("/diagnostic")}
          >
            Diagnostiquer un patient
          </Button>
          <Button
            variant="outlined"
            size="large"
            className="ml-7 rounded-full font-rubik font-light"
            onClick={() => navigate("/")}
          >
            En savoir plus
          </Button>
        </div>
      </div>
      <div className="w-5/12 py-20">
        <div className="w-full flex justify-center">
          <img
            className="h-40 rounded-xl drop-shadow-md"
            src="https://news.sanfordhealth.org/wp-content/uploads/2017/12/475273572-Sanford-Health-lung-cancer-diagnosis.jpg"
            alt=""
          />
        </div>
        <div className="w-full flex justify-between my-5">
          <img
            className="h-60 rounded-xl drop-shadow-md"
            src="https://healthandcare.portsmouth.gov.uk/wp-content/uploads/2022/05/pexels-cottonbro-7579819-scaled-e1656441511323.jpg"
            alt=""
          />
          <img
            className="h-60 rounded-md drop-shadow-md"
            src="https://upload.wikimedia.org/wikipedia/commons/0/03/LungCACXR.PNG"
            alt=""
          />
        </div>
        <div className="w-full flex justify-center">
          <img
            className="h-40 rounded-md drop-shadow-md"
            src="https://www.saintjohnscancer.org/thoracic/wp-content/uploads/sites/5/2023/08/what-is-lung-cancer-saint-johns-cancer-institute.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default LandingSection;
