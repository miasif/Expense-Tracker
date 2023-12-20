import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker"; // Import DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker styles
import { useAddTransaction } from "../hooks/useAddTransaction";
import { useGetCategories } from "../hooks/useGetCategories";

const FormComponent = () => {
  const { getCategories } = useGetCategories();
  const { addTransaction } = useAddTransaction();
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date()); // Add state for selected date

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      }
    };

    fetchCategories();
  }, [getCategories]);

  const onSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
      category: selectedCategory,
      createdAt: selectedDate, // Include selected date in the addTransaction call
    });

    // Reset form fields
    setDescription("");
    setTransactionAmount("");
    setSelectedCategory("");
    setTransactionType("expense");
    setSelectedDate(new Date()); // Reset date to the current date
  };
  return (
    <div className="d-flex align-items-center justify-content-center">
      <Form onSubmit={onSubmit}>
        <h1 className="text-center mb-4">Add Transaction</h1>

        <div className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            size="md"
            type="text"
            placeholder="Enter Name"
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            size="md"
            type="number"
            placeholder="Amount"
            value={transactionAmount}
            required
            onChange={(e) => setTransactionAmount(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories &&
              categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.categoryName}
                </option>
              ))}
          </Form.Select>
        </div>

        <div className="mb-3" style={{ zIndex: 5 }}>
          <Form.Label>Date</Form.Label>
          <br />
          <Form.Control
            size="md"
            as={DatePicker} // Use Bootstrap Form.Control as DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="MMMM d, yyyy"
          />
        </div>

        <div className="mb-3">
          <Form.Check
            inline
            name="group1"
            type="radio"
            id="expense"
            value="expense"
            checked={transactionType === "expense"}
            onChange={(e) => setTransactionType(e.target.value)}
          />
          <Form.Label className="me-3">Expense</Form.Label>

          <Form.Check
            className="ml-3"
            inline
            name="group1"
            type="radio"
            id="income"
            value="income"
            checked={transactionType === "income"}
            onChange={(e) => setTransactionType(e.target.value)}
          />
          <Form.Label>Income</Form.Label>
        </div>

        <div className="mb-3">
          <Button type="submit" variant="primary" className="w-100">
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default FormComponent;
