"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useQuoteManagement } from "../hooks/use-quote-management";
import ErrorNotification from "./error-notification";
import { QRCodeSVG } from "qrcode.react";
interface PayQuoteProps {
  uuid: string;
}

const PayQuote: React.FC<PayQuoteProps> = ({ uuid }) => {
  const { paymentDetails, loading, error, fetchPaymentDetails } =
    useQuoteManagement();
  const [timeLeft, setTimeLeft] = useState<string>("00:00:00");
  const [copied, setCopied] = useState<{ amount: boolean; address: boolean }>({
    amount: false,
    address: false,
  });

  useEffect(() => {
    fetchPaymentDetails(uuid);
  }, []);

  // Format the address for display (shortened version)
  const formatAddress = (address?: string): string => {
    if (!address) return "";
    return `${address.substring(0, 6)}...${address.substring(address.length - 5)}`;
  };

  // Format the full time remaining
  const formatTimeRemaining = useCallback((expiryTimestamp: number): string => {
    const now = new Date().getTime();
    const timeRemaining = Math.max(0, expiryTimestamp - now);

    if (timeRemaining <= 0) return "00:00:00";

    const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
    const minutes = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60),
    );
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }, []);

  // Copy text to clipboard
  const copyToClipboard = async (text: string, type: "amount" | "address") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied({ ...copied, [type]: true });
      setTimeout(() => {
        setCopied({ ...copied, [type]: false });
      }, 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  // Update the countdown timer
  useEffect(() => {
    if (!paymentDetails?.expiryDate) return;

    const updateTimer = () => {
      setTimeLeft(formatTimeRemaining(Number(paymentDetails?.expiryDate)));
    };

    updateTimer();
    const timerId = setInterval(updateTimer, 1000);

    return () => clearInterval(timerId);
  }, [paymentDetails?.expiryDate, formatTimeRemaining]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  if (error || !paymentDetails) return <ErrorNotification />;

  const {
    address: { address },
    paidCurrency: { amount, currency },
  } = paymentDetails;

  // TODO REDIECT TO EXPIREY?ERROR PAGE IF NO ADDRESS>ADDRSS

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f5f5f5] p-5">
      <div className="flex flex-col items-center w-[449px] p-[25px] bg-white rounded-[10px] gap-[25px]">
        <div className="text-[20px] font-medium leading-[28px] text-[#0A1628] font-[Inter,sans-serif] w-[303px] text-center">
          Pay with {currency}
        </div>
        <div className="w-[303px] text-[14px] leading-[22px] text-[#556877] text-center font-[Inter,sans-serif]">
          To complete this payment send the amount due to the {currency} address
          provided below.
        </div>
        <div className="w-full flex flex-col gap-[12px]">
          <div className="h-[1px] w-full bg-[#E3E8EE]" />
          <div className="flex items-center w-full">
            <div className="flex-1 text-[14px] leading-[22px] text-[#556877] font-[Inter,sans-serif]">
              Amount due
            </div>
            <div className="text-[14px] leading-[22px] text-[#0A1628] font-[Inter,sans-serif] font-medium">
              {amount} {currency}
            </div>
            <div
              className="text-[15px] leading-[24px] text-[#3F53DD] font-[Inter,sans-serif] ml-[16px] cursor-pointer"
              onClick={() => copyToClipboard(`${amount} ${currency}`, "amount")}
              aria-label="Copy amount"
            >
              {copied.amount ? "Copied" : "Copy"}
            </div>
          </div>
          <div className="h-[1px] w-full bg-[#E3E8EE]" />
          <div className="flex items-center w-full">
            <div className="flex-1 text-[14px] leading-[22px] text-[#556877] font-[Inter,sans-serif]">
              {currency} address
            </div>
            <div className="text-[14px] leading-[22px] text-[#0A1628] font-[Inter,sans-serif] font-medium">
              {formatAddress(address)}
            </div>
            <div
              className="text-[15px] leading-[24px] text-[#3F53DD] font-[Inter,sans-serif] ml-[16px] cursor-pointer"
              onClick={() => copyToClipboard(address, "address")}
              aria-label="Copy address"
            >
              {copied.address ? "Copied" : "Copy"}
            </div>
          </div>
          <div className="flex flex-col items-center gap-[12px] pt-[12px]">
            <QRCodeSVG
              value={address}
              size={140}
              level="L"
              className="w-[140px] h-[140px]"
            />
            <div className="text-[12px] leading-[16px] text-[#556877] font-[Inter,sans-serif] text-center">
              {address}
            </div>
          </div>
          <div className="h-[1px] w-full bg-[#E3E8EE]" />
          <div className="flex items-center w-full">
            <div className="flex-1 text-[14px] leading-[22px] text-[#556877] font-[Inter,sans-serif]">
              Time left to pay
            </div>
            <div className="text-[14px] leading-[22px] text-[#0A1628] font-[Inter,sans-serif] font-medium">
              {timeLeft}
            </div>
          </div>
          <div className="h-[1px] w-full bg-[#E3E8EE]" />
        </div>
      </div>
    </div>
  );
};

export default PayQuote;
