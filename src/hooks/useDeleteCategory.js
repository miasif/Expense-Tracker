import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase-config";

const useDeleteCategory = () => {
  const deleteCategory = async (categoryId) => {
    const categoryDocRef = doc(db, "categories", categoryId);

    try {
      await deleteDoc(categoryDocRef);
      console.log(`Category with ID ${categoryId} deleted successfully.`);
      return true; // Indicate successful deletion
    } catch (error) {
      console.error("Error deleting category:", error.message);
      return false; // Indicate deletion failure
    }
  };

  return { deleteCategory };
};

export default useDeleteCategory;
