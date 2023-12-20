import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";
import { useState } from "react";

export const useGetCategories = () => {
  const { userID } = useGetUserInfo();
  const categoryCollectionRef = collection(db, "categories");
  const [loading, setLoading] = useState(false);

  const getCategories = async () => {
    setLoading(true);
    try {
      const q = query(categoryCollectionRef, where("userID", "==", userID));
      const querySnapshot = await getDocs(q);
      const categories = [];
      querySnapshot.forEach((doc) => {
        categories.push({ id: doc.id, ...doc.data() });
      });
      return categories;
    } catch (error) {
      console.error("Error fetching categories:", error);
      // Handle error if needed
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { getCategories, loading };
};
