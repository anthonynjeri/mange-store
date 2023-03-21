import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders start shopping link", () => {
  render(<App />);
  const linkElement = screen.getByText(/start shopping/i);
  expect(linkElement).toBeInTheDocument();
});
