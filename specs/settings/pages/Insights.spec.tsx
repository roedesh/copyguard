import browser from "webextension-polyfill";
import { act, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Insights from "../../../src/settings/pages/Insights";
import StorageProvider from "../../../src/settings/providers/StorageProvider";

const renderInsights = () =>
  render(
    <MemoryRouter>
      <StorageProvider>
        <Insights />
      </StorageProvider>
    </MemoryRouter>,
  );

const setListOfWarnings = async (): Promise<void> => {
  return browser.storage.sync.set({
    warnings: {
      "example.com": [
        {
          type: "alteredClipboard",
          selection: "Example selection",
          clipboard: "Example clipboard",
        },
        {
          type: "alteredClipboard",
          selection: "Example selection",
          clipboard: "Example clipboard",
        },
      ],
    },
  });
};

const setEmptyList = async (): Promise<void> => {
  return browser.storage.sync.set({
    warnings: {},
  });
};

describe("Insights", () => {
  beforeEach(() => {
    (browser.storage.sync.set as jest.Mock).mockClear();
  });

  describe("given a list of warnings", () => {
    it("shows a table with domains and amount of warnings", async () => {
      await act(async () => {
        await setListOfWarnings();
        renderInsights();
      });

      const exampleComTr = screen.getByTestId("host-example.com");
      within(exampleComTr).getByText("example.com");
      within(exampleComTr).getByText("2");
    });
  });

  describe("given an empty list", () => {
    it("a message is shown", async () => {
      await act(async () => {
        await setEmptyList();
        renderInsights();
      });

      screen.getByText("No warnings have been logged yet.");
    });
  });
});
