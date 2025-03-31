import React from "react";
import TransactionConfirmation from "./confirmation";

export default function QuoteDetails({ loading, details }) {
  const { acceptanceExpiryDate } = details;
  console.log({
    expiry: `Quote expires in ${new Date(acceptanceExpiryDate).toLocaleTimeString()}`,
  });

  if (details)
    return <TransactionConfirmation details={details} loading={loading} />;
  return <></>;
}
