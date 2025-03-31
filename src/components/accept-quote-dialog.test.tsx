import { render } from "@testing-library/react";
import AcceptQuoteDialog from "./accept-quote-dialog";

describe("AcceptQuoteDialog", () => {
  it.only("renders the component with initial data", () => {
    render(<AcceptQuoteDialog uuid={"uuid"} />);
  });
});
