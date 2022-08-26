import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFeatureState } from "../../../hooks/useFeatureState.js";
import { getCart } from "../../../features/cart/cartSlice.js";
import { Link } from "react-router-dom";
import EnsureAuthentication from "../../utils/ensure-authentication/EnsureAuthentication.js";
import LoadingSpinner from "../../utils/loading-spinner/LoadingSpinner.js";
import CheckoutDetails from "../checkout-details/CheckoutDetails.js";
import PaymentForm from "../payment-form/PaymentForm.js";
import ShippingAddressForm from "../shipping-address-form/ShippingAddressForm.js"
import styles from "./CheckoutPage.module.css";

const CheckoutPage = () => {

  const dispatch = useDispatch();
  
  // Get cart state from the store
  const { cart, status, error } = useFeatureState("cart");
  const shouldRefresh = useSelector(state => state.cart.shouldRefresh);

  // Local state variable to track a successful checkout
  const [ orderId, setOrderId ] = useState(null);

  // Populate cart state if not already there or if a refresh is needed
  useEffect(() => {
    if (!cart || shouldRefresh) {
      dispatch(getCart());
    }
  }, [dispatch, cart, shouldRefresh]);

  // If an order was placed successfully, return the orderId to the customer
  if (orderId) {
    return (
      <EnsureAuthentication showMessage={true}>
        <section className={styles.container}>
          <h2 className={styles.title}>Order placed successfully!</h2>
          <p className={styles.successMessage}>Your order ID is: {orderId}</p>
          <Link to="/my-account/orders" className={styles.link}>
            View your orders
          </Link>
        </section>
      </EnsureAuthentication>
    );
  }

  // If cart is empty, show a message to the user
  if (cart && cart.items.length === 0) {
    return (
      <EnsureAuthentication showMessage={true}>
        <section className={styles.container}>
          <h2 className={styles.title}>Checkout</h2>
          <p className={styles.emptyMessage}>Cart is empty!</p>
          <Link to="/" className={styles.link}>
            Go to homepage
          </Link>
        </section>
      </EnsureAuthentication>
    );
  }

  // Render checkout details and the shipping address form
  return (
    <EnsureAuthentication showMessage={true}>
      <section className={styles.container}>
        <h2 className={styles.title}>Checkout</h2>
        { status === "loading" && <LoadingSpinner size="8px" /> }
        { error && <p className={styles.errorMessage}>{error}</p> }
        { cart && <CheckoutDetails cart={cart} /> }
        { cart && <PaymentForm /> }
        { cart && <ShippingAddressForm onCheckoutSuccess={setOrderId} /> }
      </section>
    </EnsureAuthentication>
  );
};

export default CheckoutPage;