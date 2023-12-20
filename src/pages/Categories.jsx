import { useEffect, useState } from "react";
import {
  Pagination,
  Form,
  Button,
  Row,
  Col,
  Modal,
  Spinner, // Import Spinner component
} from "react-bootstrap";
import Header from "../components/Header";
import useDeleteCategory from "../hooks/useDeleteCategory";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAddCategory } from "../hooks/useAddCategory";
import Footer from "../components/Footer";
import { useGetCategories } from "../hooks/useGetCategories"; // Import the useGetCategories hook

const Categories = () => {
  const { getCategories, loading: categoriesLoading } = useGetCategories(); // Destructure the loading state
  const { deleteCategory, addingCategory, addCategory } = useDeleteCategory();
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const categoriesPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleCategoryNameChange = (event) =>
    setCategoryName(event.target.value);

  const handleAddCategory = async () => {
    try {
      await addCategory(categoryName);
      toast.success(`Category "${categoryName}" added successfully!`, {
        position: "top-right",
        autoClose: 3000,
      });
      console.log("Category added successfully:", categoryName);
      handleCloseModal();
    } catch (error) {
      toast.error(`Error adding category: ${error.message}`, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories
    .filter((category) =>
      category.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(indexOfFirstCategory, indexOfLastCategory);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleDeleteCategory = async (categoryId) => {
    const deletionConfirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (deletionConfirmed) {
      const deletionSuccessful = await deleteCategory(categoryId);

      if (deletionSuccessful) {
        toast.success("Category deleted successfully!", {
          position: "top-right",
          autoClose: 3000,
        });

        const updatedCategories = categories.filter(
          (category) => category.id !== categoryId
        );
        setCategories(updatedCategories);
      } else {
        toast.error("Error deleting category. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      }
    };

    if (!categories.length) {
      // Only fetch categories if the array is empty
      fetchCategories();
    }
  }, [categories, getCategories]);

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const formatDate = (date) => {
    const today = new Date();

    // Check if the date is today
    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      // If the date is today, include the time
      const options = { hour: "numeric", minute: "numeric" };
      return `Today, ${date.toLocaleTimeString("en-US", options)}`;
    } else {
      // If not today, format as "9 December, 2023"
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
  };

  return (
    <>
      <Header />

      <ToastContainer />
      <div className="container h-100">
        <h3 className="text-center mb-4">Categories</h3>
        <Row className="mb-2">
          <Col md="6" className="mt-3">
            <Button variant="primary" onClick={handleShowModal}>
              Add Category
            </Button>
          </Col>
        </Row>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="categoryName">
                <Form.Label>Category Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter category name"
                  value={categoryName}
                  onChange={handleCategoryNameChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={handleAddCategory}
              disabled={addingCategory || categoriesLoading}
            >
              {addingCategory ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="mr-2"
                  />
                  Adding Category...
                </>
              ) : (
                "Add Category"
              )}
            </Button>
          </Modal.Footer>
        </Modal>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Form.Group>

        {categoriesLoading ? (
          <Spinner
            animation="border"
            role="status"
            style={{ margin: "auto", display: "block" }}
          >
            <span className="sr-only"></span>
          </Spinner>
        ) : (
          <table className="table">
            <tbody>
              {currentCategories.map((category) => {
                const { id, categoryName, createdAt } = category;
                return (
                  <tr key={id}>
                    <td>{categoryName}</td>
                    <td>{formatDate(createdAt.toDate())}</td>

                    <td>
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteCategory(id)}
                        className="p-2"
                      >
                        <span>
                          <ion-icon name="trash-outline"></ion-icon>
                        </span>
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {categories.length > categoriesPerPage && !categoriesLoading && (
          <div className="d-flex justify-content-center mt-3">
            <Pagination>
              {[
                ...Array(
                  Math.ceil(categories.length / categoriesPerPage)
                ).keys(),
              ].map((pageNumber) => (
                <Pagination.Item
                  key={pageNumber + 1}
                  active={pageNumber + 1 === currentPage}
                  onClick={() => handlePageChange(pageNumber + 1)}
                >
                  {pageNumber + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Categories;
