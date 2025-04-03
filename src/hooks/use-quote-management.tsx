import { useState } from "react";
import {
  ErrorResponse,
  PaymentDetails,
  QuoteDetails,
  QuoteSummary,
  UpdateQuoteBody,
} from "../app/types";

export const useQuoteManagement = () => {
  const [uuid, setUuid] = useState<string | null>(null);
  const [summary, setSummary] = useState<QuoteSummary | null>(null);
  const [details, setDetails] = useState<QuoteDetails | null>(null);
  const [isQuoteConfirmed, setIsQuoteConfirmed] = useState<boolean>(false);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | ErrorResponse | null>(null);

  const fetchSummary = async (uuidParams: string) => {
    if (!uuidParams || loading) return;
    try {
      setLoading(true);
      setError(null);
      setUuid(uuidParams);
      const response = await fetch(
        `https://api.sandbox.bvnk.com/api/v1/pay/${uuidParams}/summary`,
      );
      if (!response.ok) throw new Error("Failed to fetch summary");
      const data = await response.json();
      setSummary(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const updateQuote = async (body: UpdateQuoteBody) => {
    if (!body || loading) return;
    try {
      setLoading(true);
      setError(null);
      console.table({
        updateQuote: "updateQuote",
        preBody: body,
      });
      const response = await fetch(
        `https://api.sandbox.bvnk.com/api/v1/pay/${uuid}/update/summary`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        },
      );
      const data: ErrorResponse | QuoteDetails = await response.json();
      console.table({ updateQuote: "updateQuote", asyncDetails: data });

      if (
        (data as ErrorResponse).message ===
        "cannot update payment with status EXPIRED"
      ) {
        setError(data as ErrorResponse);
      } else {
        setDetails(data as QuoteDetails);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const confirmQuote = async () => {
    if (!details || loading) return;
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `https://api.sandbox.bvnk.com/api/v1/pay/${details?.uuid}/accept/summary`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ successUrl: "no_url" }),
        },
      );

      if (response.ok) {
        setIsQuoteConfirmed(true);
      }

      if (!response.ok) {
        throw new Error("Failed to accept quote");
      }
      console.table({ confirmQuote: "confirmQuote", response: response });
      return response.status === 200 && response.ok === true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error accepting quote:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPaymentDetails = async (uuidParams: string) => {
    if (!uuidParams || loading) return;
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `https://api.sandbox.bvnk.com/api/v1/pay/${uuidParams}/summary`,
      );
      if (!response.ok) throw new Error("Failed to fetch payment details");
      const data = await response.json();
      console.table({ fetchPaymentDetails: "fetchPaymentDetails", data });
      setPaymentDetails(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchSummary,
    fetchPaymentDetails,
    summary,
    details,
    loading,
    error,
    isQuoteConfirmed,
    paymentDetails,
    updateQuote,
    confirmQuote,
  };
};
