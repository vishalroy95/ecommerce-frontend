// src/pages/account/Wallet.jsx
import React from "react";

const Wallet = () => {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">My Wallet</h1>
      <p>Balance: ₹0.00</p>
      <p>No transactions available.</p>
      {/* Later: show transaction history, add money, etc. */}
    </div>
  );
};

export default Wallet;
