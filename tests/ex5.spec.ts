import test, { expect } from "@playwright/test";
import { IPAPI } from "./types/IPAPI";
import { Weather } from "./types/Weather";
import { User } from "./types/User";

test("IPAPI response structure", async ({ page }) => {
  const resp = await page.request.get("https://ipapi.co/json");
  const data: IPAPI = await resp.json();
  expect(data.ip).toBeDefined();
  expect(data.city).toBeDefined();
  expect(data.region).toBeDefined();
  expect(data.region_code).toBeDefined();
  expect(data.country).toBeDefined();
  expect(data.country_name).toBeDefined();
});

test("weather API response structure", async ({ page }) => {
  const resp = await page.request.get(
    `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=London`,
  );
  const weather: Weather = await resp.json();

  expect(weather.location.name).toBe("London");
  expect(weather.location.country).toBe("United Kingdom");
  expect(weather.location.region).toBe("City of London, Greater London");
  expect(weather.location.lat).toBeDefined();
  expect(weather.location.lon).toBeDefined();
});


test('user api first result', async ({ page }) => {
  const resp = await page.request.get('https://jsonplaceholder.typicode.com/users/1');
  const users: User = await resp.json();

    expect(users.id).toBe(1);
    expect(users.name).toBe("Leanne Graham");
    expect(users.username).toBe("Bret");
    expect(users.email).toBe("Sincere@april.biz");

});

test('user api with Record type', async ({ page }) => {
    const resp = await page.request.get('https://jsonplaceholder.typicode.com/users');
    const users: User[] = await resp.json();

    const userById: Record<number, User> = Object.fromEntries(users.map(user => [user.id, user]));
    console.log(userById[1]);

    expect(userById[1].id).toBe(1);
    expect(userById[1].name).toBe("Leanne Graham");
    expect(userById[1].username).toBe("Bret");
    expect(userById[1].email).toBe("Sincere@april.biz");

});