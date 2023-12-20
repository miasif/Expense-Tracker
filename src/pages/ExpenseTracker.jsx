import  { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import TransactionTotals from "../components/TransactionTotals";
import { useGetTransactions } from "../hooks/useGetTransaction";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

const ExpenseTracker = () => {
  const { transactions, loading, deleteTransaction } = useGetTransactions();
  const recentTransactions = transactions.slice(0, 5);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (transactionId) => {
    setIsDeleting(true);

    try {
      await deleteTransaction(transactionId);
    } catch (error) {
      console.error("Error deleting transaction:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    // Additional actions when the transactions data changes
  }, [transactions]);

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
      <ToastContainer />
      <Container className="h-100" fluid>
        <Row className="justify-content-center mt-5">
          <TransactionTotals />
          <Col md="6" className="mt-3">
            <h3 className="text-center mb-4">Recent Transactions</h3>
            {loading ? (
              <Loader />
            ) : (
              <table className="table">
                <tbody>
                  {recentTransactions.map((transaction) => {
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
                            color:
                              transactionType === "expense" ? "red" : "green",
                          }}
                        >
                          ${transactionAmount}
                        </td>
                        <td>{formatDate(createdAt.toDate())}</td>

                        {/* <td>
                          <Button
                            variant="danger"
                            onClick={() => handleDelete(id)}
                            disabled={isDeleting}
                          >
                            {isDeleting ? (
                              "Deleting..."
                            ) : (
                              <span>
                                <ion-icon name="trash-outline"></ion-icon>
                              </span>
                            )}
                          </Button>
                        </td> */}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default ExpenseTracker;
