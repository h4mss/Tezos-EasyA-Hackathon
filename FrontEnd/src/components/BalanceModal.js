import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import colors from "../constants/colors";
export default function BalanceModal({ user, balanceModalVisible, setBalanceModalVisible, handleDeposit }) {
  const handleClose = () => setBalanceModalVisible(false);
  const [amount, setAmount] = React.useState(0);
  return (
    <>
      <Modal show={balanceModalVisible} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Balance: {user.wallet.balance}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your address is : {user.wallet.address}</Modal.Body>

        <Form style={{ width: 200, marginTop: 0, marginLeft: 20, marginBottom: 20 }}>
          <Form.Group>
            <Form.Control type="amount" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </Form.Group>
          <Button style={{ backgroundColor: colors.main, borderWidth: 0, marginTop: 10 }} variant="primary" onClick={() => handleDeposit(amount)}>
            Top up
          </Button>
        </Form>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
