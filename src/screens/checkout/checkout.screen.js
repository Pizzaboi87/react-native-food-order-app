import React, { useState, useEffect, useContext } from "react";
import { useStripe } from "@stripe/stripe-react-native";
import { BigGif, Container, PayMessage } from "./checkout.styles";
import { PaymentButton } from "../cart/cart.styles";
import { DialogWindow } from "../../components/dialog-modal/dialog-modal.component";
import { CartContext } from "../../services/cart/cart.context";

export const CheckoutScreen = ({ navigation, route }) => {
  const { amount, userName, phone, address, email, uid } = route.params;

  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const { setCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [failed, setFailed] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  const fetchPaymentSheetParams = async () => {
    try {
      const response = await fetch(
        "https://pizzaboi.cyclic.app/payment-sheet",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: (amount * 100).toFixed(0),
            userName: userName,
            phone: phone,
            address: address,
            email: email,
            uid: uid,
          }),
        }
      );

      const { paymentIntent, ephemeralKey, customer } = await response.json();

      return {
        paymentIntent,
        ephemeralKey,
        customer,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const initializePaymentSheet = async () => {
    try {
      const { paymentIntent, ephemeralKey, customer } =
        await fetchPaymentSheetParams();

      const { error } = await initPaymentSheet({
        merchantDisplayName: "Weiser&Diamant LLC",
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name: "Jane Doe",
        },
      });

      if (!error) {
        setLoading(true);
      }
    } catch (error) {
      console.error("Payment sheet initialization failed: ", error);
    }
  };

  const openPaymentSheet = async () => {
    try {
      const { error } = await presentPaymentSheet();

      if (error) {
        setSuccessful(false);
        setFailed(true);
        setPaymentError(error.message);
      } else {
        setFailed(false);
        setSuccessful(true);
        setCart([]);
      }
    } catch (error) {
      setSuccessful(false);
      setFailed(true);
      setPaymentError(error.message);
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <Container>
      <BigGif source={require("../../../assets/final.gif")} />

      <PayMessage>
        {"To finalize your food order,\nplease click on the button below."}
      </PayMessage>
      <PaymentButton disabled={!loading} onPress={openPaymentSheet}>
        Pay {amount}€
      </PaymentButton>
      <DialogWindow
        variant="done"
        message={"Payment was successful,\nYour order is confirmed."}
        visible={successful}
        setVisible={setSuccessful}
        navigation={navigation}
        whereTo="Restaurants"
      />
      <DialogWindow
        variant="error"
        message={`Payment Failed\n${paymentError}.`}
        visible={failed}
        setVisible={setFailed}
      />
    </Container>
  );
};
