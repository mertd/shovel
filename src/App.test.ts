import React from "react";
import { render, waitFor } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

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

test("searches for a manifest", async () => {
  const { getByPlaceholderText, getByText } = render(App());
  await waitFor(async () => {
    const searchBar = getByPlaceholderText("Search");
    userEvent.type(searchBar, "sudo", {
      delay: 1,
    });
    await waitFor(() => {
      const name = getByText("gsudo");
      expect(name).toBeInTheDocument();
    });
  });
});

test("shows a single manifest", async () => {
  const { getByText } = render(App());
  window.location.href = "/bucket/main/manifest/gsudo";
  await waitFor(async () => {
    const name = getByText("gsudo");
    expect(name).toBeInTheDocument();
  });
});
