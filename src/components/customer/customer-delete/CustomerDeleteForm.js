import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteCustomer } from "../../../features/customer/customerSlice.js";
import LoadingSpinner from "../../utils/loading-spinner/LoadingSpinner.js";
import ErrorMessage from "../../utils/error-message/ErrorMessage.js";
import styles from "./CustomerDeleteForm.module.css";

const CustomerDeleteForm = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Local state variables
  const [ status, setStatus ] = useState("idle");
  const [ error, setError ] = useState(null);

  // Confirm button click handler
  const handleConfirm = () => {
    setStatus("loading");
    setError(null);
    dispatch(deleteCustomer())
      .unwrap()
      .then(result => {
        setStatus("succeeded");
        setError(null);
        navigate("/my-account/delete/success", { replace: true });
      })
      .catch(error => {
        setStatus("failed");
        setError(error);
      });
  };

  return (
    <>
      <div className={styles.container}>
        {
          status === "loading" ?
          <LoadingSpinner size="8px" />
          :
          <>
            <button className={styles.button} onClick={handleConfirm}>
              Confirm
            </button>
            <button className={styles.button} onClick={() => navigate(-1)}>
              Cancel
            </button>
          </>
        }
      </div>
      { error && <ErrorMessage message={error} /> }
    </>
  );
};

export default CustomerDeleteForm;