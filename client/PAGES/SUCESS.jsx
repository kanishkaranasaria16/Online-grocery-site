import React from "react";

const SuccessPage = () => {
  return (
    <div className="success-container">
      <div className="success-box">
        <h1>Payment Successful!</h1>
        <p>Your payment has been processed successfully.</p>
        <a href="/">Back to Home</a> {/* This can redirect to your home or another page */}
      </div>
    </div>
  );
};

export default SuccessPage;
