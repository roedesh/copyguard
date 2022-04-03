import browser from "webextension-polyfill";
import { act, render, screen } from "@testing-library/react";
import ReactRouterDom, { MemoryRouter } from "react-router-dom";
import InsightsDetail from "../../../src/settings/pages/InsightsDetail";
import StorageProvider from "../../../src/settings/providers/StorageProvider";

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as typeof ReactRouterDom),
  useParams: () => ({
    id: "example.com",
  }),
}));

const setListOfWarnings = async () => {
  browser.storage.sync.set({
    warnings: {
      "example.com": [
        {
          type: "alteredClipboard",
          selection: "Example selection 1",
          clipboard: "Example clipboard 1",
        },
        {
          type: "hiddenElements",
          selection: "Example selection 2",
          clipboard: "",
        },
      ],
    },
  });
};

const renderInsightsDetail = () =>
  render(
    <MemoryRouter>
      <StorageProvider>
        <InsightsDetail />
      </StorageProvider>
    </MemoryRouter>,
  );

describe("InsightsDetail", () => {
  describe("given a valid id", () => {
    it("shows a table with the warnings for that id", async () => {
      await act(async () => {
        await setListOfWarnings();
        renderInsightsDetail();
      });

      screen.queryByText("alteredClipboard");
      screen.queryByText("Example selection 1");
      screen.queryByText("Example clipboard 1");

      screen.queryByText("hiddenElements");
      screen.queryByText("Example selection 2");
    });
  });
});
