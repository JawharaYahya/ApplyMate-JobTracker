import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase"; 

export const updateJobInFirestore = async (id, updatedData) => {
  const jobRef = doc(db, "jobs", id);
  await updateDoc(jobRef, updatedData);
};