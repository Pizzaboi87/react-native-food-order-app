import React, { useState, useEffect, useContext } from "react";
import { useStripe } from "@stripe/stripe-react-native";
import { BigGif, Container, PayMessage } from "./checkout.styles";
import { PaymentButton } from "../cart/cart.styles";
import { DialogWindow } from "../../components/dialog-modal/dialog-modal.component";
import { CartContext } from "../../services/cart/cart.context";

/*const goToCheckout = (amount) => {
  navigation.navigate("Checkout", {
    amount: amount,
    userName: `${order.user.firstName} ${order.user.lastName}`,
    phone: order.user.phone,
    address: {
      city: order.address.city,
      line1: `${order.address.number}. ${order.address.floor}/${order.address.door}`,
      postal_code: order.address.zip,
      state: order.address.state,
    },
    email: currentUser.email,
    uid: uid,
  });
};*/
/*const data = {
  address: {
    city: "Berwyn",
    door: "2",
    floor: "1",
    number: "2125",
    state: "IL",
    street: "Clinton Ave",
    zip: "60402",
  },
  amount: 0,
  currentUser: {
    _redirectEventId: undefined,
    apiKey: "AIzaSyDmfc3QRM3nHNMO6SHCthlm8p3dr5UcF3g",
    appName: "[DEFAULT]",
    createdAt: "1679610027832",
    displayName: "Pepe",
    email: "deakpeter1987@gmail.com",
    emailVerified: true,
    isAnonymous: false,
    lastLoginAt: "1681760383052",
    phoneNumber: undefined,
    photoURL: undefined,
    providerData: [Array],
    stsTokenManager: [Object],
    tenantId: undefined,
    uid: "uRLUOPZ8mFNFjT4Cz8RfhESBYtg1",
  },
  distance: "14.7",
  restaurant: {
    address: "24 South Michigan Avenue, Chicago",
    business_status: "OPERATIONAL",
    geometry: { location: [Object], viewport: [Object] },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
    name: "The Gage",
    opening_hours: [
      [Array],
      [Array],
      [Array],
      [Array],
      [Array],
      [Array],
      [Array],
    ],
    photo: "https://peterweiser.com/mealstogo/chicago/chicago08.jpg",
    place_id: "chicago08",
    rating: 4.5,
    user_ratings_total: 2771,
  },
  uid: "uRLUOPZ8mFNFjT4Cz8RfhESBYtg1",
  user: { firstName: "Peter", lastName: "Weiser", phone: "+36702066450" },
};*/

export const CheckoutScreen = ({ navigation, route }) => {
  const { order } = route.params;
  console.log(order);
  const userName = `${order.user.firstName} ${order.user.lastName}`;
  const address = {
    city: order.address.city,
    line1: `${order.address.number}. ${order.address.floor}/${order.address.door}`,
    postal_code: order.address.zip,
    state: order.address.state,
  };

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
            amount: (order.amount * 100).toFixed(0),
            userName: userName,
            phone: order.user.phone,
            address: address,
            email: order.currentUser.email,
            uid: order.uid,
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
        Pay {order.amount}€
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
