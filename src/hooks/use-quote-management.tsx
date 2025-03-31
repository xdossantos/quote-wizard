import { useState, useEffect } from "react";
interface QuoteSummary {
  uuid: string;
  merchantDisplayName: string;
  dateCreated: number;
  expiryDate: number;
  quoteExpiryDate?: number;
  acceptanceExpiryDate?: number;
  quoteStatus: string;
  reference: string;
  type: string;
  subType: string;
  status: string;
  displayCurrency: {
    currency: string;
    amount: number;
    actual: number;
  };
  walletCurrency: {
    currency: string;
    amount: number;
    actual: number;
  };
  paidCurrency: {
    currency?: string;
    amount: number;
    actual: number;
  };
  feeCurrency: {
    currency: string;
    amount: number;
    actual: number;
  };
  networkFeeCurrency?: {
    currency: string;
    amount: number;
    actual: number;
  };
  displayRate?: number;
  exchangeRate?: number;
  address?: string;
  returnUrl?: string;
  redirectUrl: string;
  transactions: unknown[];
  refund: unknown;
  refunds: unknown[];
  currencyOptions: unknown[];
  flow: string;
  twoStep: boolean;
  customerId: string;
}

type QuoteDetails = QuoteSummary;

interface UpdateQuoteBody {
  currency: string;
  payInMethod: string;
}

export const useQuoteManagement = (uuid: string) => {
  const [summary, setSummary] = useState<QuoteSummary | null>(null);
  const [details, setDetails] = useState<QuoteDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.sandbox.bvnk.com/api/v1/pay/${uuid}/summary`,
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
    try {
      setLoading(true);
      console.table({ preBody: body });
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
      console.table({ asyncDetails: data });
      setDetails(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, [uuid]);

  return { summary, details, loading, error, updateQuote };
};
