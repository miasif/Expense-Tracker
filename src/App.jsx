import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Auth } from "./pages/auth/index";
import ExpenseTracker from "./pages/ExpenseTracker";
import "bootstrap/dist/css/bootstrap.min.css";
import Transactions from "./pages/Transactions";
import "react-toastify/dist/ReactToastify.css";
import Categories from "./pages/Categories";
import AddTransaction from "./pages/AddTransaction";

function App() {
  return (
    <div
      className="App"
      style={{ display: "flex", flexDirection: "column", height: "100vh" }}
    >
      <Router>
        <Routes>
          <Route path="/" exact element={<Auth />} />
          <Route path="/expense-tracker" element={<ExpenseTracker />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/add-transaction" element={<AddTransaction />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
