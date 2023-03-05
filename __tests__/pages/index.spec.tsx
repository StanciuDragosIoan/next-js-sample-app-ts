import { render, screen } from "@testing-library/react";
import HomePage from "@/pages/index";
it("Tests the HomePage", async () => {
  render(<HomePage />);

  const heading = screen.getByRole("heading", {
    name: "Home page here",
  });

  const smallHeading = screen.getByRole("heading", {
    level: 3,
  });

  expect(heading).toBeInTheDocument();
  expect(smallHeading).toBeInTheDocument();
  expect(smallHeading).toHaveTextContent(
    "We strive to provide you the best treatment for the best price!"
  );
});
