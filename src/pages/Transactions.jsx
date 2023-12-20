import  { useState, useEffect } from "react";
import { useGetTransactions } from "../hooks/useGetTransaction";
import { useDeleteTransaction } from "../hooks/useDeleteTransaction";
import {  Pagination, Form, Button } from "react-bootstrap";
import Header from "../components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/Footer";

const Transactions = () => {
  const { transactions, loading } = useGetTransactions();
  const { deleteTransaction } = useDeleteTransaction();

  const transactionsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Calculate the index of the first and last transaction for the current page
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const filteredTransactions = transactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset page when searching
  };

  const handleDelete = async (transactionId) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      await deleteTransaction(transactionId);
    }
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <>
      <Header />

      <div className="container h-100">
        <h3 className="text-center mb-4">Transactions</h3>

        <div className="row">
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Form.Group>
        </div>

        {loading ? (
          <div className="text-center">
            <p>Loading transactions...</p>
            {/* You can use a loading spinner here if desired */}
          </div>
        ) : (
          <table className="table">
            <tbody>
              {currentTransactions.map((transaction) => {
                const {
                  id,
                  description,
                  transactionAmount,
                  transactionType,
                  createdAt,
                  categoryName,
                } = transaction;

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
                    return `Today, ${date.toLocaleTimeString(
                      "en-US",
                      options
                    )}`;
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
                  <tr key={id}>
                    <td>{description}</td>
                    <td>{categoryName || "N/A"}</td>
                    <td
                      style={{
                        color: transactionType === "expense" ? "red" : "green",
                      }}
                    >
                      ${transactionAmount}
                    </td>
                    <td>{formatDate(createdAt.toDate())}</td>
                    <td>
                      <Button variant="danger" onClick={() => handleDelete(id)}>
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

        {filteredTransactions.length > transactionsPerPage && (
          <div className="d-flex justify-content-center mt-3">
            <Pagination>
              {[
                ...Array(
                  Math.ceil(filteredTransactions.length / transactionsPerPage)
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
        <ToastContainer />
      </div>
      <Footer />
    </>
  );
};

export default Transactions;
