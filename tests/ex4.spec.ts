import test, { expect } from "@playwright/test";
import WorkType from "./types/Work";
import { OpenMeteoWeather } from "./types/OpenMeteoWeather";
import { ExchangeRates } from "./types/ExchangeRates";



test("library work type", async () => {
  const res = await fetch("https://openlibrary.org/works/OL15626917W.json");
  const data: WorkType = await res.json();
  expect(data.key).toContain("OL15626917W");
  expect(data.title).toBe("How to cool the planet");
  expect(data.revision).toBeGreaterThan(0);
  expect(data.revision).toBe(4);
});

test("post request", async ({ page }) => {
  const resp = await page.request.post("https://httpbin.org/anything", {
    data: {
      name: "John Doe",
      age: 30,
    },
  });

  const response = await resp.json();
  expect(response.json.name).toBe("John Doe");
  expect(response.json.age).toBe(30);
  expect(response.url).toBe("https://httpbin.org/anything");
  expect(response.method).toBe("POST");
});

test('openmetio weather API', async ({ page }) => {
  const resp = await page.request.get("https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&current_weather=true");
  const data: OpenMeteoWeather = await resp.json();
  expect(data.current_weather.temperature).toBeGreaterThan(0)
  expect(data.current_weather.windspeed).toBeGreaterThanOrEqual(0)
  expect(data.current_weather.weathercode).toBeGreaterThanOrEqual(0)
  expect(data.current_weather.time).toBeDefined()
  expect(data.current_weather.interval).toBeGreaterThanOrEqual(0)
});

test('exachange rate without acccess key', async ({ page }) => {
  const resp = await page.request.get('https://api.exchangerate.host//latest');
  const data: ExchangeRates = await resp.json();
  expect(data.success).toBe(false);
    expect(data.error).toBeDefined();
    expect(data.error?.code).toBe(101);
    expect(data.error?.type).toBe("missing_access_key");
    expect(data.error?.info).toContain(
      "You have not supplied an API Access Key");
});