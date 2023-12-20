import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";
import { toast } from "react-toastify";

export const useAddTransaction = () => {
  const transactionCollectionRef = collection(db, "transactions");
  const { userID } = useGetUserInfo();

  const addTransaction = async ({
    description,
    transactionAmount,
    transactionType,
    category: selectedCategory,
    createdAt: selectedDate, // Include selectedDate as a parameter
  }) => {
    try {
      await addDoc(transactionCollectionRef, {
        userID,
        description,
        transactionAmount,
        transactionType,
        category: selectedCategory,
        createdAt: selectedDate,
      });

      toast.success("Transaction added successfully");
    } catch (error) {
      console.error("Error adding transaction:", error.message);
      toast.error(`Error adding transaction: ${error.message}`);
    }
  };

  return { addTransaction };
};
