import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFeatureState } from "../../../hooks/useFeatureState.js";
import { getCart } from "../../../features/cart/cartSlice.js";
import EnsureAuthentication from "../../utils/ensure-authentication/EnsureAuthentication.js";
import ErrorMessage from "../../utils/error-message/ErrorMessage.js";
import CartSummary from "../cart-summary/CartSummary.js";
import LoadingSpinner from "../../utils/loading-spinner/LoadingSpinner.js";
import checkoutIcon from "../../../icons/cart-checkout.png";
import styles from "./CartPage.module.css";

const CartPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get cart state variables from the store
  const { cart, status, error } = useFeatureState("cart");
  const shouldRefresh = useSelector(state => state.cart.shouldRefresh);

  // Populate cart state if not there or if a refresh is required
  useEffect(() => {
    if (!cart || shouldRefresh) {
      dispatch(getCart());
    }
  }, [dispatch, cart, shouldRefresh]);

  return (
    <EnsureAuthentication showMessage={false}>
      <section className={styles.container}>
        <h2 className={styles.title}>Your Shopping Cart</h2>
        { status === "loading" && <LoadingSpinner size="8px" /> }
        { error && <ErrorMessage message={error} /> }
        { cart && <CartSummary cart={cart} /> }
        <div className={styles.footer}>
          <button className={styles.button} onClick={() => navigate(-1)}>
            Continue Shopping
          </button>
          { 
          (cart && cart.items.length > 0)
          && 
          <Link to="checkout" className={styles.link}>
            <img src={checkoutIcon} alt="" className={styles.icon} />
            Proceed to Checkout
          </Link>
          }
        </div>
      </section>
    </EnsureAuthentication>
  );
};

export default CartPage;