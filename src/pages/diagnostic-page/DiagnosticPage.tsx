import React from "react";
import ImagesSections from "./ImagesSections";
import PatientInfo from "./PatientInfo";
import { Backdrop, Button, Step, StepLabel, Stepper } from "@mui/material";
import { GiBrain } from "react-icons/gi";
import LoadingBackdrop from "./LoadingBackdrop";
import { ErrorsType } from "./types";
import ResultsDialog from "./results/ResultsDialog";

export type RayXImageType = {
  id: number;
  base64: string | null;
  file: File | null;
};
export type PatientInfoType = {
  age: number | undefined;
  sex: "M" | "F" | undefined;
  bloodType:
    | "O+"
    | "O-"
    | "A+"
    | "A-"
    | "B+"
    | "B-"
    | "AB+"
    | "AB-"
    | undefined;
  height: number | undefined;
  weight: number | undefined;
  smokingHistory: {
    smoker: boolean;
    numberOfCigarettesPerDay?: number;
  };

  // Symptoms
  cough: boolean;
  shortnessOfBreath: boolean;
  chestPain: boolean;
  hemoptysis: boolean;
  wheezing?: boolean;
  nightSweats?: boolean;
  fatigue?: boolean;
  weightLoss?: boolean;
  occupationalExposures?: boolean;
};

const DiagnosticPage = () => {
  const [images, setImages] = React.useState<RayXImageType[]>([]);
  const [patientInfo, setPatientInfo] = React.useState<PatientInfoType>({
    age: undefined,
    sex: undefined,
    bloodType: undefined,
    height: undefined,
    weight: undefined,
    smokingHistory: { smoker: false, numberOfCigarettesPerDay: 0 }, // Default values for smoking history
    cough: false, // Default value for cough
    shortnessOfBreath: false, // Default value for shortnessOfBreath
    chestPain: false, // Default value for chestPain
    hemoptysis: false, // Default value for hemoptysis
    wheezing: false, // Default value for wheezing
    nightSweats: false, // Default value for nightSweats
    fatigue: false,
    weightLoss: false,
    occupationalExposures: false,
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [openResultsDialog, setOpenResultsDialog] = React.useState(false);
  const [predictions, setPredictions] = React.useState<string[]>([]);
  const [errors, setErrors] = React.useState<ErrorsType>({
    imageError: false,
    patientAgeError: false,
    patientGenderError: false,
    patientBloodTypeError: false,
    patientWeightError: false,
    patientHeightError: false,
  });
  const handleSubmit = async () => {
    if (images.length === 0) {
      setErrors((current) => ({ ...current, imageError: true }));
      return;
    } else {
      setErrors((current) => ({ ...current, imageError: false }));
    }

    if (patientInfo.age == undefined) {
      setErrors((current) => ({ ...current, patientAgeError: true }));
      return;
    } else {
      setErrors((current) => ({ ...current, patientAgeError: false }));
    }
    if (patientInfo.height === undefined) {
      setErrors((current) => ({ ...current, patientHeightError: true }));
      return;
    } else {
      setErrors((current) => ({ ...current, patientHeightError: false }));
    }

    if (patientInfo.weight === undefined) {
      setErrors((current) => ({ ...current, patientWeightError: true }));
      return;
    } else {
      setErrors((current) => ({ ...current, patientWeightError: false }));
    }

    if (patientInfo.bloodType === undefined) {
      setErrors((current) => ({ ...current, patientBloodTypeError: true }));
      return;
    } else {
      setErrors((current) => ({ ...current, patientBloodTypeError: false }));
    }

    if (patientInfo.sex === undefined) {
      setErrors((current) => ({ ...current, patientGenderError: true }));
      return;
    } else {
      setErrors((current) => ({ ...current, patientGenderError: false }));
    }

    if (
      !errors.imageError &&
      !errors.patientAgeError &&
      !errors.patientBloodTypeError &&
      !errors.patientGenderError &&
      !errors.patientHeightError &&
      !errors.patientWeightError
    ) {
      setIsLoading(true);

      let formdata = new FormData();
      images[0].file && formdata.append("image", images[0].file);
      let url = "http://127.0.0.1:5001/predict";

      let response = await fetch(url, {
        method: "POST",
        body: formdata,
      });
      setIsLoading(false);

      let content = await response.json();
      if (content.predictions) {
        setIsLoading(false);
        setOpenResultsDialog(true);
        setPredictions(content.predictions);
      }
      console.log(content);
    }
  };

  return (
    <div className="w-full p-10 grid grid-cols-2 gap-5">
      <h1 className="text-4xl font-bold font-kalnia col-span-2">
        Diagnostique pulmonaire
      </h1>
      <ImagesSections
        images={images}
        setImages={setImages}
        errors={errors}
        setErrors={setErrors}
      />
      <PatientInfo
        patientInfo={patientInfo}
        setPatientInfo={setPatientInfo}
        errors={errors}
      />
      <div></div>
      <div className="flex w-full justify-start mt-5">
        <Button
          size="large"
          variant="contained"
          className="rounded-lg py-3 font-kalnia"
          startIcon={<GiBrain />}
          onClick={handleSubmit}
        >
          Proceder au diagnostique
        </Button>
      </div>
      <LoadingBackdrop isLoading={isLoading} />
      <ResultsDialog
        open={openResultsDialog}
        setOpen={setOpenResultsDialog}
        patientInfo={patientInfo}
        predictions={predictions}
        images={images}
        setImages={setImages}
      />
    </div>
  );
};

export default DiagnosticPage;
