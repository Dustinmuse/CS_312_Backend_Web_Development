/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen } from "@testing-library/react";
import ForecastBanner from "../../../pages/components/forecast-banner";

describe("ForecastBanner", () => {
  test("renders summary and keeps nearby zips hidden by default", () => {
    // Initial render with friend zips provided but list hidden until user interaction.
    render(
      <ForecastBanner
        zip="96815"
        weather="sunny"
        tempC="25C"
        tempF="70F"
        friends={["96814", "96826"]}
      />,
    );

    expect(screen.getByText("Forecast for 96815")).toBeInTheDocument();
    expect(screen.getByText("sunny | 25C / 70F")).toBeInTheDocument();
    // Hidden by default because showFriends starts as false.
    expect(screen.queryByLabelText("nearby-zips")).not.toBeInTheDocument();
  });

  test("shows and hides nearby zip list when the button is clicked", () => {
    // Render once and then drive state changes with button clicks.
    render(
      <ForecastBanner
        zip="96815"
        weather="sunny"
        tempC="25C"
        tempF="70F"
        friends={["96814", "96826"]}
      />,
    );

    // First click reveals the list and both friend entries.
    fireEvent.click(screen.getByRole("button", { name: "Show nearby zips" }));
    expect(screen.getByLabelText("nearby-zips")).toBeInTheDocument();
    expect(screen.getByText("96814")).toBeInTheDocument();
    expect(screen.getByText("96826")).toBeInTheDocument();

    // Second click hides the list again, proving toggle behavior in both directions.
    fireEvent.click(screen.getByRole("button", { name: "Hide nearby zips" }));
    expect(screen.queryByLabelText("nearby-zips")).not.toBeInTheDocument();
  });

  test("shows empty-state text when nearby list is toggled with no friend zips", () => {
    render(
      <ForecastBanner zip="96815" weather="sunny" tempC="25C" tempF="70F" friends={[]} />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Show nearby zips" }));
    expect(screen.getByText("No nearby zips found.")).toBeInTheDocument();
    expect(screen.queryByLabelText("nearby-zips")).not.toBeInTheDocument();
  });
});
