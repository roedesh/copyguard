import browser from "webextension-polyfill";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ToastContainer } from "react-toastify";
import Settings from "../../../src/settings/pages/Settings";

const renderSettings = () =>
  render(
    <>
      <ToastContainer />
      <Settings />
    </>,
  );
const getWhitelistInput = () => screen.getByLabelText("Whitelist") as HTMLTextAreaElement;
const getSubmitButton = () => screen.getByText("Save");

const submitForm = (whitelistValue) => {
  const whitelist = getWhitelistInput();
  const submitButton = getSubmitButton();
  fireEvent.input(whitelist, { target: { value: whitelistValue } });
  fireEvent.click(submitButton);
};

describe("Settings", () => {
  beforeEach(() => {
    (browser.storage.sync.set as jest.Mock).mockClear();
  });

  describe("given a valid form", () => {
    it("creates a toast", async () => {
      renderSettings();
      submitForm("www.example.com");

      await waitFor(() => {
        screen.getByRole("alert");
      });
    });

    it("saves the settings", async () => {
      renderSettings();
      submitForm("www.example.com");

      await waitFor(() => {
        expect(browser.storage.sync.set).toHaveBeenCalledWith({ whitelist: "www.example.com" });
      });
    });
  });

  describe("given a invalid form", () => {
    it("does not create a toast", async () => {
      renderSettings();
      submitForm("//www.example.com");

      await waitFor(() => {
        expect(screen.queryByRole("alert")).not.toBeInTheDocument();
      });
    });

    it("does not save the settings", async () => {
      renderSettings();
      submitForm("//www.example.com");

      await waitFor(() => {
        expect(browser.storage.sync.set).not.toHaveBeenCalled();
      });
    });
  });
});
