/**
 * @jest-environment node
 */

jest.setTimeout(20000);

describe("The API /weather/[zipcode]", () => {
  test("returns the correct data for the zipcode 96815", async () => {
    const zip = "96815";
    let response: Response;

    try {
      response = await fetch(`http://localhost:3000/api/weather/${zip}`);
    } catch {
      throw new Error(
        "Could not reach http://localhost:3000. Start the app with `npm run dev` before running this E2E test.",
      );
    }

    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.zip).toEqual(zip);
  });
});

export {};
