import {
  addDoc,
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { firestore, storage } from "../config/firebase-config";
import {
  PatientInfoType,
  RayXImageType,
} from "../pages/diagnostic-page/DiagnosticPage";
import { ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { type } from "@testing-library/user-event/dist/type";
export type AddDiagnosticType = {
  userId: string;
  patientInfo: PatientInfoType;
  rayXImage: RayXImageType;
  patientName: string;
  patientId: string;
  results: string[];
};
export const saveDiagnosticResults = async (request: AddDiagnosticType) => {
  try {
    let user = doc(firestore, "users", request.userId);
    if (user) {
      //Adding the image
      let generatedFileName = undefined;
      if (request.rayXImage.file) {
        generatedFileName = request.rayXImage.file.name;
        let imageRef = ref(storage, generatedFileName);
        let addingImageResponse = await uploadBytes(
          imageRef,
          request.rayXImage.file
        );
        let response = await addDoc(collection(firestore, "diagnostics"), {
          userId: request.userId,
          patientName: request.patientName,
          patientId: request.patientId,
          patientInfo: request.patientInfo,
          rayXImageURL: addingImageResponse.ref.name,
        });
      }
    } else {
    }
  } catch {}
};

export type DiagnosticType = {
  userId: string;
  patientName: string;
  patientId: string;
  patientInfo: PatientInfoType;
  rayXImageURL: string;
  results: string[];
};
export const getAllDiagnostics = async () => {
  return (await getDocs(collection(firestore, "diagnostics"))).docs;
};
