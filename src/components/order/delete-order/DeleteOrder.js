import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteOrder } from "../../../features/orders/ordersSlice.js";
import LoadingSpinner from "../../utils/loading-spinner/LoadingSpinner.js";
import warningIcon from "../../../icons/warning.png";
import errorIcon from "../../../icons/error.png";
import styles from "./DeleteOrder.module.css";

const DeleteOrder = ({ orderId }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Local state variables
  const [ dialogToggle, setDialogToggle ] = useState(false);
  const [ status, setStatus ] = useState("idle");
  const [ error, setError ] = useState(null);

  // Handler for confirmation dialog box
  const handleDialogClick = () => {
    setDialogToggle(prevState => !prevState);
  };

  // Handler for order deletion
  const handleDelete = () => {
    setStatus("loading");
    setError(null);
    dispatch(deleteOrder(orderId))
      .unwrap()
      .then(result => {
        setStatus("succeeded");
        setError(null);
        navigate("/my-account/orders", { replace: true });
      })
      .catch(error => {
        setStatus("failed");
        setError(error);
      });
  };

  // Render button to toggle confirmation dialog
  if (!dialogToggle) {
    return (
      <div className={styles.container}>
        <button className={styles.button} onClick={handleDialogClick}>
          Cancel Order
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <p className={styles.message}>
        Pending orders can be canceled without cost. The amount charged in your credit card will be refunded and the order will be deleted from your history.
      </p>
      <p className={styles.message}>
        <img src={warningIcon} alt="Warning" className={styles.icon} />
        This action is irreversible.
      </p>
      <p className={styles.confirmationMessage}>
        Are you sure you want to cancel this order?
      </p>
      <div className={styles.buttonsContainer}>
        {
          status === "loading" ?
          <LoadingSpinner size="6px" />
          :
          <>
            <button className={styles.button} onClick={handleDelete}>
              Yes
            </button>
            <button className={styles.button} onClick={handleDialogClick}>
              No
            </button>
          </>
        }
      </div>
      {
        error && <p className={styles.errorMessage}>
                   <img src={errorIcon} alt="Error" className={styles.icon} />
                   {error}
                 </p> 
      }
    </div>
  );
};

export default DeleteOrder;