// src/services/userService.ts

import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../config/firebase-config";

interface UserAdditionalInfo {
  uid: string;
  name: string;
  title: string;
  institution: string;
  photoURL: string;
}

export const saveUserAdditionalInfo = async (
  uid: string,
  info: UserAdditionalInfo
) => {
  try {
    let response = await setDoc(doc(firestore, "users", uid), {
      uid: uid,
      name: info.name,
      title: info.title,
      institution: info.institution,
      photoURL: info.photoURL,
    });
    return true;
  } catch (error) {
    console.error("Error saving additional user info:", error);
    return false;
  }
};

export const updateUserAdditionalInfo = async (
  uid: string,
  info: Partial<UserAdditionalInfo>
) => {
  try {
    const docRef = doc(firestore, "users", uid);
    await updateDoc(docRef, {
      uid: uid,
      name: info.name,
      title: info.title,
      institution: info.institution,
      photoURL: info.photoURL,
    });
    return true;
  } catch (error) {
    console.error("Error updating additional user info:", error);
    return false;
  }
};
