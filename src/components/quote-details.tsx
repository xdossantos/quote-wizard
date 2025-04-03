"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { QuoteDetailsData } from "../app/types";
import { useRouter } from "next/navigation";

interface QuoteDetailsProps {
  loading: boolean;
  confirmQuote: () => Promise<boolean>;
  details: QuoteDetailsData;
  handleUpdateQuote: () => Promise<void>;
}

const QuoteDetails: React.FC<QuoteDetailsProps> = ({
  loading,
  details,
  handleUpdateQuote,
  confirmQuote,
}) => {
  const router = useRouter();
  const timeLeftRef = useRef<number>(0);
  const { acceptanceExpiryDate } = details;

  const calculateTimeLeft = useCallback(() => {
    const now = new Date().getTime();
    const expiryTime = new Date(acceptanceExpiryDate).getTime();
    return Math.max(0, Math.floor((expiryTime - now) / 1000));
  }, [acceptanceExpiryDate]);

  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }, []);

  useEffect(() => {
    timeLeftRef.current = calculateTimeLeft();
  }, [acceptanceExpiryDate, calculateTimeLeft]);

  useEffect(() => {
    // Don't set up timer if already expired
    if (timeLeftRef.current <= 0) {
      handleUpdateQuote();
      return;
    }

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      timeLeftRef.current = newTimeLeft;

      // Force re-render to update the display
      forceUpdate();

      // Only update when timer actually hits 0
      if (newTimeLeft <= 0) {
        clearInterval(timer);
        handleUpdateQuote();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft, handleUpdateQuote]);

  const handleConfirm = async () => {
    const isQuoteConfirmed = await confirmQuote();
    if (isQuoteConfirmed) {
      router.push(`/pay/${details.uuid}`);
    }
  };

  // Force re-render hook
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

  if (details)
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
            {formatTime(timeLeftRef.current)}
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
            {loading ? "loading" : "Confirm"}
          </button>
        </div>
      </section>
    );
  return <></>;
};

export default QuoteDetails;
