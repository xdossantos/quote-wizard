import "@testing-library/jest-dom";
import Page from "../app/page";
import { redirect } from "next/navigation";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

describe("Page", () => {
  it("redirects to payin page with UUID", async () => {
    const mockUuid = "test-uuid-123";
    const params = Promise.resolve({ uuid: mockUuid });
    await Page({ params });

    expect(redirect).toHaveBeenCalledWith(`/payin/${mockUuid}`);
  });
});
