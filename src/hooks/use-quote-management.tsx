import { useState } from "react";
import { QuoteDetails, QuoteSummary, UpdateQuoteBody } from "../app/types";

export const useQuoteManagement = () => {
  const [uuid, setUuid] = useState<string | null>(null);
  const [summary, setSummary] = useState<QuoteSummary | null>(null);
  const [details, setDetails] = useState<QuoteDetails | null>(null);
  const [isQuoteConfirmed, setIsQuoteConfirmed] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSummary = async (uuidParams) => {
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
      if (!response.ok) throw new Error("Failed to update quote");
      const data = await response.json();
      console.table({ updateQuote: "updateQuote", asyncDetails: data });
      setDetails(data);
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
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error accepting quote:", err);
    } finally {
      setLoading(false);
    }
    return isQuoteConfirmed;
  };

  return {
    fetchSummary,
    summary,
    details,
    loading,
    error,
    isQuoteConfirmed,
    updateQuote,
    confirmQuote,
  };
};
