export interface QuoteSummary {
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

export type QuoteDetails = QuoteSummary;

export interface UpdateQuoteBody {
  currency: Currency;
  payInMethod: "crypto";
}

export interface ErrorResponse {
  code: string;
  message: string;
  parameter: string;
  requestId: string;
}

export interface QuoteDetailsData {
  uuid: string;
  merchantDisplayName: string;
  merchantId?: string;
  dateCreated: number;
  expiryDate: number;
  quoteExpiryDate?: number;
  acceptanceExpiryDate: string;
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
  networkFeeCurrency?: string;
  displayRate?: number;
  exchangeRate?: number;
  address?: string;
  returnUrl: string;
  redirectUrl: string;
  transactions: string[];
  refund?: string;
  refunds: string[];
  currencyOptions: string[];
  flow: string;
  twoStep: boolean;
  customerId: string;
}

export interface PaymentDetails {
  uuid: string;
  merchantDisplayName: string;
  merchantId: string;
  dateCreated: number;
  expiryDate: number;
  quoteExpiryDate: number;
  acceptanceExpiryDate: number;
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
    currency: string;
    amount: number;
    actual: number;
  };
  feeCurrency: {
    currency: string;
    amount: number;
    actual: number;
  };
  networkFeeCurrency: {
    currency?: string;
    amount: number;
    actual: number;
  };
  displayRate: {
    base: string;
    counter: string;
    rate: number;
  };
  exchangeRate: {
    base: string;
    counter: string;
    rate: number;
  };
  address: {
    address: string;
    tag?: string;
    protocol: string;
    uri: string;
    alternatives: unknown[];
  };
  returnUrl: string;
  redirectUrl: string;
  transactions: unknown[];
  refund?: unknown;
  refunds: unknown[];
  currencyOptions: unknown[];
  flow: string;
  twoStep: boolean;
  customerId: string;
  networkFeeBilledTo: string;
  networkFeeRates: unknown[];
}

export type Currency = "BTC" | "ETH" | "LTC";

export const CURRENCY_OPTIONS = [
  { value: "BTC", label: "Bitcoin BTC" },
  { value: "ETH", label: "Ethereum ETH" },
  { value: "LTC", label: "Litecoin LTC" },
] as const;

export interface AcceptQuoteProps {
  uuid: string;
}
