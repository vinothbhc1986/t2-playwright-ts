import test, { expect } from "@playwright/test";

test("mock pokemon api", async ({ page }) => {
  await page.route("**/pokeapi.co/api/v2/pokemon/**", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        id: 999,
        name: "mock-pokemon",
        sprites: {
          front_default: "http://dummy/mock-pokemon.png",
        },
        height: 88,
        weight: 100,
      }),
    });
  });

  // make api request - this gets intercepted
  const pokemon = await page.evaluate(async () => {
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon/mock-pokemo",
    );
    return await response.json();
  });

  // verify mocked data

  expect(pokemon.id).toBe(999);
  expect(pokemon.name).toBe("mock-pokemon");
  expect(pokemon.sprites.front_default).toBe("http://dummy/mock-pokemon.png");
  expect(pokemon.height).toBe(88);
  expect(pokemon.weight).toBe(100);
});

test("should mock github user", async ({ page }) => {
  // setup route to intercept github api calls using page.route()
  await page.route("**/api.github.com/users/**", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        id: 999,
        name: "mock-github-user",
        login: "mock-github-user",
        avatar_url: "http://dummy/mock-github-user.png",
      }),
    });
  });

  const githubUser = await page.evaluate(async () => {
    const response = await fetch(
      "https://api.github.com/users/mock-github-user",
    );
    return await response.json();
  });

  expect(githubUser.id).toBe(999);
  expect(githubUser.name).toBe("mock-github-user");
  expect(githubUser.login).toBe("mock-github-user");
  expect(githubUser.avatar_url).toBe("http://dummy/mock-github-user.png");
});

test("mock api with error response", async ({ page }) => {
  // setup route to intercept github api calls using page.route()
  await page.route("**/api.kanye.rest/**", async (route) => {
    await route.abort("failed");
  });

  // try to make request - it will fail
  try {
    const quote = await page.evaluate(async () => {
      const response = await fetch("https://api.kanye.restmock/");
      return await response.json();
    });
  } catch (error) {
    console.log("Request failed as expected");
    expect(error).toBeDefined();
  }
});


test('mock api rate limit', async ({ page }) => {
    // mock an api to return 429 status code
    await page.route("**/randomuser.me/api/**", async (route) => {
      await route.fulfill({
        status: 429,
        contentType: "application/json",
        body: JSON.stringify({
          error: "Rate limit exceeded",
        }),
      });
    });

    // try to make request - it will fail
      const result = await page.evaluate(async () => {
        const response = await fetch("https://randomuser.me/api/mock");
        const data = await response.json();
        return {
          status: response.status,
          data,
        }
      });
    
    expect(result.status).toBe(429);
    expect(result.data.error).toBe("Rate limit exceeded");
})
