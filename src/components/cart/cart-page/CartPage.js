import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFeatureState } from "../../../hooks/useFeatureState.js";
import { getCart } from "../../../features/cart/cartSlice.js";
import EnsureAuthentication from "../../utils/ensure-authentication/EnsureAuthentication.js";
import CartSummary from "../cart-summary/CartSummary.js";
import LoadingSpinner from "../../utils/loading-spinner/LoadingSpinner.js";
import styles from "./CartPage.module.css";

const CartPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, status, error } = useFeatureState("cart");
  const shouldRefresh = useSelector(state => state.cart.shouldRefresh);

  useEffect(() => {
    if (!cart || shouldRefresh) {
      dispatch(getCart());
    }
  }, [dispatch, cart, shouldRefresh]);

  return (
    <EnsureAuthentication showMessage={true}>
      <section className={styles.container}>
        <h2 className={styles.title}>Your Shopping Cart</h2>
        { status === "loading" && <LoadingSpinner size="8px" /> }
        { error && <p className={styles.errorMessage}>{error}</p> }
        { cart && <CartSummary cart={cart} /> }
        <section className={styles.footer}>
          <button className={styles.button} onClick={() => navigate(-1)}>
            Continue Shopping
          </button>
          { 
          (cart && cart.items.length > 0)
          && 
          <Link to="checkout" className={styles.link}>Proceed to Checkout</Link>
          }
        </section>

      </section>
    </EnsureAuthentication>
  );
};

export default CartPage;