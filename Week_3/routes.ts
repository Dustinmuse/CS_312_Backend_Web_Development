import nodeFetch from "node-fetch";

const fetch = nodeFetch;

// /hello endpoint - returns "Hello World!"
const routeHello = (): string => "Hello World!";

// /api/names endpoint - displays a list of usernames and IDs
const routeAPINames = async (): Promise<string> => {
  const url = "https://www.usemodernfullstack.dev/api/v1/users";
  let data: responseItemType[];

  try {
    const response = await fetch(url);
    data = (await response.json()) as responseItemType[];
  } catch (error) {
    return error;
  }

  const names = data.map((item) => `id: ${item.id} - name: ${item.name}`).join("<br>");
  return names;
};

const routeWeather = (query: WeatherQueryInterface): WeatherDetailType => queryWeatherData(query);

const queryWeatherData = (query: WeatherQueryInterface): WeatherDetailType => {
  return {
    zipcode: query.zipcode,
    weather: "sunny",
    temp: 35,
  };
};

export { routeHello, routeAPINames, routeWeather };
