/**
 * @jest-environment jsdom
 */
import { ReactTestRenderer, act, create } from "react-test-renderer";
import PageComponentWeather from "../../../pages/components/weather";

describe("PageComponentWeather", () => {
  test("renders correctly", async () => {
    let component: ReactTestRenderer | undefined;

    // Render the component and flush useEffect updates.
    await act(async () => {
      component = create(<PageComponentWeather />);
    });

    expect(component?.toJSON()).toMatchSnapshot();
  });

  test("clicks the h1 element and updates the state", async () => {
    let component: ReactTestRenderer | undefined;

    // Initial render.
    await act(async () => {
      component = create(<PageComponentWeather />);
    });

    // Simulate the click handler to capture the updated UI state.
    await act(async () => {
      component?.root.findByType("h1").props.onClick();
    });

    expect(component?.toJSON()).toMatchSnapshot();
  });
});
