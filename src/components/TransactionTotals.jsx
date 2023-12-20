import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useGetTransactions } from "../hooks/useGetTransaction";

function TransactionTotals() {
  const { transactionTotals } = useGetTransactions();
  const { balance, income, expenses } = transactionTotals;

  return (
    <Card style={{ width: "30rem",maxWidth: "90%" }} className="summary_card ">
      {/* <Card.Header className="text-center fs-4">
        <b>Balance</b>
      </Card.Header> */}
      <ListGroup variant="flush">
        <ListGroup.Item className="border border-white p-2 mt-4">
          <div className="row p-1">
            <div className="col-6">
              <h2>INCOME</h2>
              <h4 className="text-success">  ${income} </h4> 
            </div>
            <div className="col-6">
              <h2>EXPENSE</h2> 
              <h4 className="text-danger">${expenses} </h4>
            </div>
          </div>
        </ListGroup.Item>
        <ListGroup.Item className="border border-white p-2 ">
          <div className="row p-1">
            <div className="col-12">
            <h6 className="text-muted">Current Balance</h6>
              <h2>
                {balance >= 0 ? (
                <span> ${balance}</span>
              ) : (
                <span> -${balance * -1}</span>
              )}
                </h2>
                
            </div>
          </div>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
}

export default TransactionTotals;
