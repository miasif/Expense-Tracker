import { useEffect, useState } from "react";
import {
  query,
  collection,
  where,
  orderBy,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionTotals, setTransactionTotals] = useState({
    balance: 0.0,
    income: 0.0,
    expenses: 0.0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const transactionCollectionRef = collection(db, "transactions");
  const categoryCollectionRef = collection(db, "categories");
  const { userID } = useGetUserInfo();

  const getCategories = async () => {
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
      setError("Error fetching categories");
      return [];
    }
  };

  const getTransactions = async () => {
    setLoading(true);
    setError(null);

    let unsubscribe;
    try {
      const queryTransactions = query(
        transactionCollectionRef,
        where("userID", "==", userID),
        orderBy("createdAt")
      );

      const categories = await getCategories();

      unsubscribe = onSnapshot(queryTransactions, async (snapshot) => {
        let docs = [];
        let totalIncome = 0;
        let totalExpenses = 0;

        for await (const doc of snapshot.docs) {
          const data = doc.data();
          const id = doc.id;

          // Fetch the category name based on the category ID
          let categoryName = "N/A";
          if (data.category) {
            const category = categories.find((cat) => cat.id === data.category);
            if (category) {
              categoryName = category.categoryName;
            }
          }

          docs.push({ ...data, id, categoryName });

          if (data.transactionType === "expense") {
            totalExpenses += Number(data.transactionAmount);
          } else {
            totalIncome += Number(data.transactionAmount);
          }
        }

        setTransactions(docs);

        let balance = totalIncome - totalExpenses;
        setTransactionTotals({
          balance,
          expenses: totalExpenses,
          income: totalIncome,
        });

        setLoading(false);
      });
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setError("Error fetching transactions");
      setLoading(false);
    }

    return () => unsubscribe();
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return { transactions, transactionTotals, loading, error };
};
