import { collection, addDoc, updateDoc, doc, getDocs, query, where  } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { setJobs, setLoading, setError } from "./jobSlice";

export const addJobToFirestore = async (jobData) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not logged in");
  const { id, ...rest } = jobData || {};

  const dataWithUser = {
     ...rest,
    userId: user.uid,       
    createdAt: new Date(), 
  };

 const docRef = await addDoc(collection(db, "jobApplications"), dataWithUser); 
  return docRef.id;
};

export const updateJobInFirestore = async (id, updatedData) => {
  const jobRef = doc(db, "jobApplications", id); 
  await updateDoc(jobRef, updatedData);
};

export const fetchJobsForCurrentUser = async (dispatch) => {
  const user = auth.currentUser;
  if (!user) return;

  try {
    dispatch(setLoading(true));
    const jobsRef = collection(db, "jobApplications");
    const q = query(jobsRef, where("userId", "==", user.uid)); // only fetch this user’s jobs
    const querySnapshot = await getDocs(q);
    const jobs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    dispatch(setJobs(jobs));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};