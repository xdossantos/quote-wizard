"use client";

import React, { useState, useEffect, useCallback } from "react";
import { QuoteDetailsData } from "../app/types";

interface TransactionConfirmationProps {
  loading: boolean;
  details: QuoteDetailsData;
}

const TransactionConfirmation: React.FC<TransactionConfirmationProps> = ({
  loading,
  details,
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(30);

  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setTimeout(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleConfirm = () => {
    console.log("Transaction confirmed");
  };

  return (
    <section
      className="flex flex-col gap-3 items-start w-full max-w-[416px] sm:px-0 max-md:max-w-[400px] mx-auto"
      aria-labelledby="transaction-title"
    >
      <h2 id="transaction-title" className="sr-only">
        Transaction Confirmation
      </h2>

      <hr className="w-full h-px bg-slate-200" />

      <div className="flex gap-1 items-center w-full">
        <p className="flex-1 text-sm leading-6 text-gray-500">Amount due</p>
        <p className="text-sm font-medium leading-6 text-slate-900">
          {details.paidCurrency.amount}
        </p>
      </div>

      <hr className="w-full h-px bg-slate-200" />

      <div className="flex gap-1 items-center w-full">
        <p className="flex-1 text-sm leading-6 text-gray-500">
          Quoted price expires in
        </p>
        <p
          className="text-sm font-medium leading-6 text-slate-900"
          aria-live="polite"
        >
          {formatTime(timeLeft)}
        </p>
      </div>

      <hr className="w-full h-px bg-slate-200" />

      <div className="flex justify-center items-center w-full">
        <button
          onClick={handleConfirm}
          disabled={loading}
          className={`w-full sm:max-w-[336px] gap-2 px-4 py-2 text-sm font-medium leading-6 text-center text-white rounded shadow-[0_2px_4px_rgba(0,0,0,0.1)] cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
            loading
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
          aria-label="Confirm transaction"
        >
          Confirm {loading && "loading"}
        </button>
      </div>
    </section>
  );
};

export default TransactionConfirmation;
