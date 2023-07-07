import React from "react";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import { useLottie } from "lottie-react";
import animationData from "../Assests/animations/107043-success.json";
import CheckoutSteps from "../components/Checkout/CheckoutSteps";

const OrderSuccessPage = () => {
  return (
    <div>
      <Header />
       <br />
       <br />
       <CheckoutSteps active={3} />
      <Success />
      <br />
      <br />
      <Footer />
    </div>
  );
};

const style = {
  height: 300,
};

const Success = () => {
  const options = {
    animationData: animationData,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options, style);

  return (
    <div>
      {View}
      <h5 className="text-center mb-14 text-[25px] text-[#000000a1]">
        Your order is successful 😍
      </h5>
    </div>
  );
};

export default OrderSuccessPage;