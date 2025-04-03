import { renderHook, act } from "@testing-library/react";
import { expect } from "@jest/globals";
import { useQuoteManagement } from "./use-quote-management";

describe("useQuoteManagement", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should fetch summary successfully", async () => {
    const mockSummary = {
      uuid: "fcbacea9-070f-4d69-96ce-db873999c95a",
      merchantDisplayName: "Merchant Display Name",
      quoteStatus: "TEMPLATE",
      reference: "REF292970",
      displayCurrency: {
        currency: "EUR",
        amount: 200,
      },
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockSummary),
    });

    const { result } = renderHook(() => useQuoteManagement());

    await act(async () => {
      await result.current.fetchSummary("fcbacea9-070f-4d69-96ce-db873999c95a");
    });

    expect(result.current.summary).toEqual(mockSummary);
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeNull();
  });

  it("should update quote with currency selection successfully", async () => {
    const mockUpdateResponse = {
      uuid: "fcbacea9-070f-4d69-96ce-db873999c95a",
      quoteStatus: "ACCEPTED",
      paidCurrency: {
        currency: "BTC",
        amount: 0.00758898,
      },
      acceptanceExpiryDate: 1690373470000,
      address: {
        address: "mkCVeT3J5oCj7L4opm2rzb2UvEcgkWGRC2",
        protocol: "BTC",
      },
    };

    const updateBody = {
      currency: "BTC",
      payInMethod: "crypto",
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockUpdateResponse),
    });

    const { result } = renderHook(() => useQuoteManagement());

    await act(async () => {
      await result.current.updateQuote(updateBody);
    });

    expect(result.current.details).toEqual(mockUpdateResponse);
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeNull();
  });

  it("should handle expired quote", async () => {
    const mockExpiredResponse = {
      status: "EXPIRED",
      quoteStatus: "EXPIRED",
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockExpiredResponse),
    });

    const { result } = renderHook(() => useQuoteManagement());

    await act(async () => {
      await result.current.fetchSummary("fcbacea9-070f-4d69-96ce-db873999c95a");
    });

    expect(result.current.summary).toEqual(mockExpiredResponse);
    expect(result.current.loading).toBeFalsy();
  });
});
