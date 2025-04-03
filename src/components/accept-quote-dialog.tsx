"use client";
import * as React from "react";
import { useQuoteManagement } from "../hooks/use-quote-management";
import { redirect } from "next/navigation";
import { Currency, CURRENCY_OPTIONS, ErrorResponse } from "../app/types";
import QuoteDetails from "./quote-details";
import Skeleton from "./skeleton";

export default function AcceptQuoteDialog({ uuid }) {
  const {
    summary,
    fetchSummary,
    loading,
    details,
    error,
    updateQuote,
    confirmQuote,
  } = useQuoteManagement();
  const [selectedCurrency, setSelectedCurrency] = React.useState<
    Currency | undefined
  >(undefined);

  React.useEffect(() => {
    fetchSummary(uuid);
  }, [uuid]);

  const handleCurrencyChange = async (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const currency = event.target.value as Currency;
    setSelectedCurrency(currency);
    await updateQuote({ currency, payInMethod: "crypto" });
  };

  if (loading) return <Skeleton />;
  if ((error as ErrorResponse)?.code) {
    redirect(`/payin/${uuid}/expired`);
  }

  return (
    <div className="flex flex-col items-center w-[460px] max-w-full bg-white rounded-[10px] p-[25px] gap-[25px]">
      <div className="flex flex-col items-center w-[303px] max-w-full gap-[4px]">
        <div className="w-full text-center text-[20px] font-normal text-[rgba(10,22,40,1)] font-[Inter,sans-serif]">
          {summary?.merchantDisplayName || "Merchant Display Name"}
        </div>
        <div className="w-full text-center">
          <span className="font-[Inter,sans-serif] font-bold text-[32px] text-[rgba(10,22,40,1)]">
            {summary?.displayCurrency.amount || "Default amount state"}
          </span>
          <span className="font-[Inter,sans-serif] font-bold text-[20px] text-[rgba(10,22,40,1)]">
            {summary?.displayCurrency.currency || "EUR"}
          </span>
        </div>
      </div>
      <div className="w-[303px] max-w-full text-center">
        <span className="font-[Inter,sans-serif] font-normal text-[14px] text-[rgba(85,104,119,1)]">
          For reference number:
        </span>
        <span className="font-[Inter,sans-serif] font-normal text-[14px] text-[rgba(10,22,40,1)]">
          {summary?.reference || "REF292970"}
        </span>
      </div>
      <div className="flex flex-col w-full gap-[4px]">
        <div className="font-[Inter,sans-serif] text-[14px] font-normal text-[rgba(10,22,40,1)]">
          Pay with
        </div>
        <select
          className="flex items-center w-full h-[56px] p-[16px] rounded-[4px] border border-[#E3E8EE] bg-white"
          value={selectedCurrency}
          onChange={handleCurrencyChange}
          data-testid="currency-select"
        >
          <option value="">Select Currency</option>
          {CURRENCY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {details && (
          <QuoteDetails
            handleUpdateQuote={() =>
              updateQuote({
                currency: selectedCurrency!,
                payInMethod: "crypto",
              })
            }
            confirmQuote={confirmQuote}
            details={details}
            loading={loading}
            uuid={uuid}
          />
        )}
      </div>
    </div>
  );
}
