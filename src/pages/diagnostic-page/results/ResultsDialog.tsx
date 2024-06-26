import React from "react";
import { PatientInfoType, RayXImageType } from "../DiagnosticPage";
import {
  Alert,
  AlertTitle,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  TextField,
} from "@mui/material";
import { MdClose, MdSave } from "react-icons/md";
import { useAppSelector } from "../../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
import { saveDiagnosticResults } from "../../../services/diagnosticService";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  patientInfo: PatientInfoType;
  predictions: string[];
  images: RayXImageType[];
  setImages: React.Dispatch<React.SetStateAction<RayXImageType[]>>;
};
type SymptomType = {
  [key: string]: string;
};

export const symptoms: SymptomType = {
  cough: "Vous avez une toux.",
  shortnessOfBreath: "Vous avez des difficultés à respirer.",
  chestPain: "Vous avez des douleurs à la poitrine.",
  hemoptysis: "Vous crachez du sang ou des mucosités sanglantes.",
  wheezing: "Vous avez une respiration sifflante.",
  nightSweats: "Vous avez des transpirations nocturnes excessives.",
  fatigue: "Vous vous sentez constamment fatigué ou épuisé.",
  weightLoss: "Vous avez perdu du poids involontairement.",
};

export const habits = {
  smoker: "Vous êtes un fumeur actuel.",
  numberOfPacksSmokedPerday: "Vous fumez [nombre] de cigarettes par jour.",
  occupationalExposures:
    "Vous êtes exposé à des poussières, fumées ou autres irritants potentiels dans votre travail.",
};

const ResultsDialog: React.FC<Props> = ({
  open,
  setOpen,
  patientInfo,
  predictions,
  images,
  setImages,
}: Props) => {
  let currentUser = useAppSelector(
    (state: RootState) => state.currentUserSlice
  );
  const saveResults = async () => {
    currentUser.uid &&
      saveDiagnosticResults({
        patientInfo: patientInfo,
        rayXImage: images[0],
        patientId: patientId,
        patientName: patientName,
        userId: currentUser.uid,
        results: predictions,
      });
    navigate("/account");
  };
  const navigate = useNavigate();

  const [openSavingDialog, setopenSavingDialog] = React.useState(false);
  const [patientName, setPatientName] = React.useState("");
  const [patientId, setPatientId] = React.useState("");
  return (
    <Dialog open={open} onClose={() => setOpen(true)} maxWidth="lg" fullWidth>
      <DialogTitle className="flex items-center justify-between">
        <h1 className="font-kalnia text-3xl font-medium">
          Resultats du diagnostique
        </h1>
        <IconButton onClick={() => setOpen(false)}>
          <MdClose />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <div className="w-full grid grid-cols-2 gap-7">
          {predictions.includes("No Finding") ? (
            <Alert
              severity="success"
              className="col-span-2 font-rubik font-light text-md"
              icon={<FiCheckCircle className="text-2xl" />}
            >
              <AlertTitle className="font-kalnia text-lg font-medium">
                Aucun problème
              </AlertTitle>
              Aucune anomalie n'a été détectée par le diagnostic pulmonaire
              après une évaluation complète. Les résultats montrent qu'il n'y a
              aucun signe de problème ou de dysfonctionnement dans les poumons.
            </Alert>
          ) : (
            <div>He</div>
          )}
          <div className="">
            <h1 className="text-2xl font-kalnia font-medium mb-4">
              Imagerie medicale
            </h1>
            {images &&
              images.map((image) => {
                return image.base64 && image.file ? (
                  <img
                    src={image.base64}
                    alt={image.file.name}
                    className="w-full rounded-md"
                  />
                ) : undefined;
              })}
          </div>
          <div className="">
            <h1 className="text-2xl font-kalnia font-medium mb-4">
              Informations sur le patient
            </h1>
            <div className="grid grid-cols-2 gap-3 mt-5">
              <div className="">
                <div className="text-lg font-rubik">Age</div>
                <div className="pl-2 font-rubik font-light">
                  {patientInfo.age} ans
                </div>
              </div>
              <div className="">
                <div className="text-lg font-rubik">Taille</div>
                <div className="pl-2 font-rubik font-light">
                  {patientInfo.height} cm
                </div>
              </div>
              <div className="">
                <div className="text-lg font-rubik">Poids</div>
                <div className="pl-2 font-rubik font-light">
                  {patientInfo.weight} kg
                </div>
              </div>
              <div className="">
                <div className="text-lg font-rubik">Groupe sanguin</div>
                <div className="pl-2 font-rubik font-light">
                  {patientInfo.bloodType}
                </div>
              </div>
              <div className="">
                <div className="text-lg font-rubik">Sexe</div>
                <div className="pl-2 font-rubik font-light">
                  {patientInfo.sex}
                </div>
              </div>
              <div className="mt-2 col-span-2">
                <h1 className="font-kalnia font-medium text-xl">Habitudes</h1>
                <div className="mt-2 ">
                  <FormControlLabel
                    control={
                      <Checkbox
                        readOnly
                        value={patientInfo.smokingHistory.smoker}
                        size="small"
                      />
                    }
                    label={
                      <span className="font-rubik font-light ">Fumeur</span>
                    }
                    className="block"
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        readOnly
                        value={patientInfo.occupationalExposures}
                      />
                    }
                    label={
                      <span className="font-rubik font-light ">
                        Travail dans un environnement a forte exposition au ...
                      </span>
                    }
                    className="block"
                  />
                </div>
              </div>
              <div className="mt-2 col-span-2">
                <h1 className="font-kalnia font-medium text-xl">Symptomes</h1>
                <div className="mt-2">
                  {Object.keys(symptoms).map((symptom) => (
                    <FormControlLabel
                      className="block"
                      control={
                        <Checkbox
                          readOnly
                          size="small"
                          value={
                            symptom === "cough" ||
                            symptom === "shortnessOfBreath" ||
                            symptom === "chestPain" ||
                            symptom === "hemoptysis" ||
                            symptom === "wheezing" ||
                            symptom === "nightSweats" ||
                            symptom === "fatigue" ||
                            symptom === "weightLoss"
                              ? patientInfo[symptom]
                              : false
                          }
                          checked={
                            symptom === "cough" ||
                            symptom === "shortnessOfBreath" ||
                            symptom === "chestPain" ||
                            symptom === "hemoptysis" ||
                            symptom === "wheezing" ||
                            symptom === "nightSweats" ||
                            symptom === "fatigue" ||
                            symptom === "weightLoss"
                              ? patientInfo[symptom]
                              : false
                          }
                        />
                      }
                      label={
                        <span className="font-rubik font-light">
                          {symptoms[symptom]}
                        </span>
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Dialog
          open={openSavingDialog}
          onClose={() => setopenSavingDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Les details</DialogTitle>
          <DialogContent className="w-full">
            <TextField
              fullWidth
              variant="standard"
              label={<span className="font-kalnia">ID du patient</span>}
              className="font-rubik font-light"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
            />
            <TextField
              variant="standard"
              fullWidth
              label={<span className="font-kalnia">Nom du patient</span>}
              className="mt-5 font-rubik font-light"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              startIcon={<MdClose />}
              color="error"
              className="font-kalnia normal-case font-light"
              onClick={() => setopenSavingDialog(false)}
            >
              Annuler
            </Button>
            <Button
              variant="contained"
              className="font-kalnia normal-case font-light"
              startIcon={<MdSave />}
              onClick={() => {
                currentUser === undefined
                  ? navigate("/sign-in")
                  : saveResults();
              }}
            >
              Enregistrer
            </Button>
          </DialogActions>
        </Dialog>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          size="large"
          color="error"
          className="font-kalnia normal-case font-light"
          onClick={() => setOpen(false)}
        >
          Fermer
        </Button>
        <Button
          variant="contained"
          size="large"
          className="font-kalnia normal-case font-light"
          startIcon={<MdSave />}
          onClick={() => {
            currentUser === undefined
              ? navigate("/sign-in")
              : setopenSavingDialog(true);
          }}
        >
          Enregistrer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ResultsDialog;
