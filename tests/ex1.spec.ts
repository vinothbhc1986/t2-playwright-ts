interface LoginData {
  username: string;
  password: string;
}

const user: LoginData = {
  username: "tomsmith",
  password: "SuperSecretPassword!",
};

import { test, expect } from "@playwright/test";
import { Post } from "./types/Post";
import {  User } from "./types/User";


test("successful login test", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/login");
  await page.fill("#username", user.username); // tomsmith
  await page.fill("#password", user.password); // SuperSecretPassword!
  await page.click('button[type="submit"]');

  await expect(page.locator("#flash")).toContainText(
    "You logged into a secure area!",
  );
});

test("fetch posts and validate", async ({ page }) => {
  const response = await page.request.get(
    "https://jsonplaceholder.typicode.com/posts/1",
  );
  const data: Post = await response.json();

  expect(data.id).toBe(1);
  expect(data.userId).toBe(1);
  expect(data.title).toBeDefined()
  expect(data.body).toBeDefined()
  expect(data.body).toContain('quia')
});

test("fetch users and validate", async ({ page }) => {
    const response = await page.request.get('https://jsonplaceholder.typicode.com/users');
    const users: User[] = await response.json();
    const firstUser = users[0];

    expect(firstUser.id).toBe(1);
    expect(firstUser.name).toBe('Leanne Graham');
    expect(firstUser.username).toBe('Bret');
    expect(firstUser.email).toBe('Sincere@april.biz');
    expect(firstUser.address.street).toBe('Kulas Light');
    expect(firstUser.company.name).toBe('Romaguera-Crona');
    expect(firstUser.company.catchPhrase).toBe('Multi-layered client-server neural-net');



})
