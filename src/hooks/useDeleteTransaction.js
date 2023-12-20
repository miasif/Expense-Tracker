// useDeleteTransaction.js
import { collection, deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";
import { toast } from "react-toastify";

export const useDeleteTransaction = () => {
  const transactionCollectionRef = collection(db, "transactions");
  const { userID } = useGetUserInfo();

  const deleteTransaction = async (transactionId) => {
    try {
      const transactionDocRef = doc(transactionCollectionRef, transactionId);
      const transactionDoc = await getDoc(transactionDocRef);

      if (transactionDoc.exists()) {
        const transactionData = transactionDoc.data();

        // Ensure the user can only delete their own transactions
        if (transactionData.userID === userID) {
          await deleteDoc(transactionDocRef);
          toast.success("Transaction deleted successfully");
        } else {
          console.error(
            "Permission denied: User cannot delete this transaction."
          );
          toast.error("Permission denied: Unable to delete transaction");
        }
      } else {
        console.error("Transaction document not found.");
        toast.error("Transaction not found");
      }
    } catch (error) {
      console.error("Error deleting transaction:", error.message);
      toast.error(`Error deleting transaction: ${error.message}`);
    }
  };

  return { deleteTransaction };
};
