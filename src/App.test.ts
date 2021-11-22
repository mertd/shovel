import React from "react";
import { render, waitFor } from "@testing-library/react";
import App from "./App";

test("renders spinner", () => {
  const { getByText } = render(App());
  const spinner = getByText("Loading...");
  expect(spinner).toBeInTheDocument();
});

test("renders search bar", async () => {
  const { getByPlaceholderText } = render(App());
  await waitFor(() => {
    const searchBar = getByPlaceholderText("Search");
    expect(searchBar).toBeInTheDocument();
  });
});
