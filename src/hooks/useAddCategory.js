import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useAddCategory = () => {
  const categoryCollectionRef = collection(db, "categories");
  const { userID } = useGetUserInfo();

  const addCategory = async (categoryName) => {
    await addDoc(categoryCollectionRef, {
      userID,
      categoryName,
      createdAt: serverTimestamp(),
    });
  };

  return { addCategory };
};
