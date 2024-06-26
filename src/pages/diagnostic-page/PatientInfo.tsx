import React from "react";
import { PatientInfoType } from "./DiagnosticPage";
import {
  Checkbox,
  FormControlLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { ErrorsType } from "./types";

interface Props {
  patientInfo: PatientInfoType;
  setPatientInfo: React.Dispatch<React.SetStateAction<PatientInfoType>>;
  errors: ErrorsType;
}
export const symptomQuestions = {
  cough: "Avez-vous une toux ?",
  shortnessOfBreath: "Avez-vous des difficultés à respirer ?",
  chestPain: "Avez-vous des douleurs à la poitrine ?",
  hemoptysis: "Crachez-vous du sang ou des mucosités sanglantes ?",
  wheezing: "Avez-vous une respiration sifflante ?",
  nightSweats: "Avez-vous des transpirations nocturnes excessives ?",
  fatigue: "Vous sentez-vous constamment fatigué ou épuisé ?",
  weightLoss: "Avez-vous perdu du poids involontairement ?",
};

export const habitQuestions = {
  smoker: "Êtes-vous un fumeur actuel ?",
  numberOfPacksSmokedPerday: "Combien de cigarettes fumez-vous par jour ?",
  occupationalExposures:
    "Êtes-vous exposé à des poussières, fumées ou autres irritants potentiels dans votre travail ?",
};
const PatientInfo = ({
  patientInfo: {
    age,
    sex,
    bloodType,
    weight,
    height,
    smokingHistory: { smoker, numberOfCigarettesPerDay },
    cough,
    shortnessOfBreath,
    chestPain,
    hemoptysis,
    wheezing,
    nightSweats,
    fatigue,
    weightLoss,
    occupationalExposures,
  },
  setPatientInfo,
  errors,
}: Props) => {
  return (
    <div className="w-full px-3">
      <h1 className="text-3xl font-kalnia font-medium mb-2">
        Details sur le patient{" "}
      </h1>
      <div className="w-full grid grid-cols-6 gap-5 h-fit">
        <div className="flex flex-col col-span-2">
          <label htmlFor="" className="font-medium font-kalnia mb-2">
            Age<span className="text-red-600 font-rubik">*</span>
          </label>
          <OutlinedInput
            type="number"
            value={age}
            error={errors.patientAgeError}
            onChange={(e) =>
              setPatientInfo((current: PatientInfoType) => {
                let value = e.target.value;
                if (!isNaN(Number(value)) && Number(value) >= 0) {
                  return { ...current, age: Number(value) };
                } else return current;
              })
            }
            size="small"
            className="rounded-lg font-rubik font-light"
          />
          {errors.patientAgeError && (
            <small className="text-red-600">
              Vous devez saisir l'age du patient.
            </small>
          )}
        </div>
        <div className="flex flex-col col-span-2">
          <label htmlFor="" className="font-medium font-kalnia mb-2">
            Taille<span className="text-red-600 font-rubik">*</span>
          </label>
          <OutlinedInput
            type="number"
            error={errors.patientHeightError}
            endAdornment={<span className="font-kalnia">Cm</span>}
            value={height}
            onChange={(e) =>
              setPatientInfo((current: PatientInfoType) => {
                let value = e.target.value;
                if (!isNaN(Number(value)) && Number(value) >= 0) {
                  return { ...current, height: Number(value) };
                } else return current;
              })
            }
            size="small"
            className="rounded-lg font-rubik font-light"
          />
          {errors.patientHeightError && (
            <small className="text-red-600">
              Vous devez saisir la taille du patient.
            </small>
          )}
        </div>
        <div className="flex flex-col col-span-2">
          <label htmlFor="" className="font-medium font-kalnia mb-2">
            Poids<span className="text-red-600 font-rubik">*</span>
          </label>
          <OutlinedInput
            type="number"
            error={errors.patientWeightError}
            endAdornment={<span className="font-kalnia">Kg</span>}
            value={weight}
            onChange={(e) =>
              setPatientInfo((current: PatientInfoType) => {
                let value = e.target.value;
                if (!isNaN(Number(value)) && Number(value) >= 0) {
                  return { ...current, weight: Number(value) };
                } else return current;
              })
            }
            size="small"
            className="rounded-lg font-rubik font-light"
          />
          {errors.patientWeightError && (
            <small className="text-red-600">
              Vous devez saisir le poids du patient.
            </small>
          )}
        </div>
        <div className="flex flex-col col-span-3">
          <label htmlFor="" className="font-medium font-kalnia mb-2">
            Groupe sanguin<span className="text-red-600 font-rubik">*</span>
          </label>
          <Select
            value={bloodType}
            onChange={(e) => {
              let value = e.target.value;
              if (
                ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"].includes(
                  value
                )
              ) {
                setPatientInfo((current) => ({
                  ...current,
                  bloodType: value as
                    | "O+"
                    | "O-"
                    | "A+"
                    | "A-"
                    | "B+"
                    | "B-"
                    | "AB+"
                    | "AB-",
                }));
              } else {
                setPatientInfo((current) => ({
                  ...current,
                  bloodType: undefined,
                }));
              }
            }}
            size="small"
            error={errors.patientBloodTypeError}
            className="rounded-lg font-rubik font-light"
          >
            <MenuItem
              value={undefined}
              className="font-rubik font-light text-sm italic"
            >
              Choisir
            </MenuItem>
            <MenuItem value="O+" className="font-rubik font-light">
              O+
            </MenuItem>
            <MenuItem value="O-" className="font-rubik font-light">
              O-
            </MenuItem>
            <MenuItem value="A+" className="font-rubik font-light">
              A+
            </MenuItem>
            <MenuItem value="A-" className="font-rubik font-light">
              A-
            </MenuItem>
            <MenuItem value="B-" className="font-rubik font-light">
              B-
            </MenuItem>
            <MenuItem value="B+" className="font-rubik font-light">
              B+
            </MenuItem>
            <MenuItem value="AB-" className="font-rubik font-light">
              AB-
            </MenuItem>
            <MenuItem value="AB+" className="font-rubik font-light">
              AB+
            </MenuItem>
          </Select>
          {errors.patientBloodTypeError && (
            <small className="text-red-600">
              Vous devez saisir le groupe sanguin du patient.
            </small>
          )}
        </div>
        <div className="flex flex-col col-span-3">
          <label htmlFor="" className="font-medium font-kalnia mb-2">
            Sexe<span className="text-red-600 font-rubik">*</span>
          </label>
          <Select
            value={sex}
            onChange={(e) => {
              let value = e.target.value;
              if (["M", "F"].includes(value)) {
                setPatientInfo((current) => ({
                  ...current,
                  sex: value as "M" | "F",
                }));
              } else {
                setPatientInfo((current) => ({
                  ...current,
                  sex: undefined,
                }));
              }
            }}
            size="small"
            className="rounded-lg font-rubik font-light"
            error={errors.patientGenderError}
          >
            <MenuItem
              value={undefined}
              className="font-rubik font-light text-sm italic"
            >
              Choisir
            </MenuItem>
            <MenuItem value="M" className="font-rubik font-light">
              Homme
            </MenuItem>
            <MenuItem value="F" className="font-rubik font-light">
              Femme
            </MenuItem>
          </Select>
          {errors.patientGenderError && (
            <small className="text-red-600">
              Vous devez saisir le genre du patient.
            </small>
          )}
        </div>
      </div>
      <div className="mt-10">
        <h1 className="font-kalnia font-medium text-xl">Habitudes</h1>
        <FormControlLabel
          control={
            <Checkbox
              value={smoker}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPatientInfo((current) => ({
                  ...current,
                  smokingHistory: { smoker: e.target.checked, packYears: null },
                }))
              }
              size="small"
            />
          }
          label={
            <span className="font-rubik font-light ">
              {habitQuestions.smoker}
            </span>
          }
          className="mt-2"
        />
        {smoker && (
          <div className="flex items-center pl-7">
            <p className="font-rubik font-light">
              {habitQuestions.numberOfPacksSmokedPerday}
            </p>
            <OutlinedInput
              type="number"
              size="small"
              className="ml-4 w-20"
              value={numberOfCigarettesPerDay}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPatientInfo((current) => {
                  let value = e.target.value;
                  if (!isNaN(Number(value)) && Number(value) >= 0) {
                    return {
                      ...current,
                      smokingHistory: {
                        smoker: smoker,
                        numberOfCigarettesPerDay: Number(value),
                      },
                    };
                  } else return current;
                })
              }
            />
          </div>
        )}
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              value={occupationalExposures}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPatientInfo((current) => ({
                  ...current,
                  occupationalExposures: e.target.checked,
                }))
              }
            />
          }
          label={
            <span className="font-rubik font-light ">
              {habitQuestions.occupationalExposures}
            </span>
          }
          className="mt-2"
        />
      </div>

      <div className="mt-10 grid grid-cols-1">
        <h1 className="font-kalnia font-medium text-xl">Symptomes</h1>
        <FormControlLabel
          control={
            <Checkbox
              value={cough}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPatientInfo((current) => ({
                  ...current,
                  cough: e.target.checked,
                }))
              }
              size="small"
            />
          }
          label={
            <span className="font-rubik font-light ">
              {symptomQuestions.cough}
            </span>
          }
          className="mt-2 w-fit"
        />
        <FormControlLabel
          control={
            <Checkbox
              value={shortnessOfBreath}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPatientInfo((current) => ({
                  ...current,
                  shortnessOfBreath: e.target.checked,
                }))
              }
              size="small"
            />
          }
          label={
            <span className="font-rubik font-light ">
              {symptomQuestions.shortnessOfBreath}
            </span>
          }
          className="mt-2 w-fit"
        />
        <FormControlLabel
          control={
            <Checkbox
              value={chestPain}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPatientInfo((current) => ({
                  ...current,
                  chestPain: e.target.checked,
                }))
              }
              size="small"
            />
          }
          label={
            <span className="font-rubik font-light ">
              {symptomQuestions.chestPain}
            </span>
          }
          className="mt-2 w-fit"
        />
        <FormControlLabel
          control={
            <Checkbox
              value={fatigue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPatientInfo((current) => ({
                  ...current,
                  fatigue: e.target.checked,
                }))
              }
              size="small"
            />
          }
          label={
            <span className="font-rubik font-light ">
              {symptomQuestions.fatigue}
            </span>
          }
          className="mt-2 w-fit"
        />
        <FormControlLabel
          control={
            <Checkbox
              value={hemoptysis}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPatientInfo((current) => ({
                  ...current,
                  hemoptysis: e.target.checked,
                }))
              }
              size="small"
            />
          }
          label={
            <span className="font-rubik font-light ">
              {symptomQuestions.hemoptysis}
            </span>
          }
          className="mt-2 w-fit"
        />
        <FormControlLabel
          control={
            <Checkbox
              value={nightSweats}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPatientInfo((current) => ({
                  ...current,
                  nightSweats: e.target.checked,
                }))
              }
              size="small"
            />
          }
          label={
            <span className="font-rubik font-light ">
              {symptomQuestions.nightSweats}
            </span>
          }
          className="mt-2 w-fit"
        />
        <FormControlLabel
          control={
            <Checkbox
              value={weightLoss}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPatientInfo((current) => ({
                  ...current,
                  weightLoss: e.target.checked,
                }))
              }
              size="small"
            />
          }
          label={
            <span className="font-rubik font-light ">
              {symptomQuestions.weightLoss}
            </span>
          }
          className="mt-2 w-fit"
        />
        <FormControlLabel
          control={
            <Checkbox
              value={wheezing}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPatientInfo((current) => ({
                  ...current,
                  wheezing: e.target.checked,
                }))
              }
              size="small"
            />
          }
          label={
            <span className="font-rubik font-light ">
              {symptomQuestions.wheezing}
            </span>
          }
          className="mt-2 w-fit"
        />
      </div>
    </div>
  );
};

export default PatientInfo;
