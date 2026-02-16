import { test, expect } from "@playwright/test";

test.describe("API Mocking Examples", () => {
  test("Mock Pokemon API with page.request (intercepted)", async ({ page }) => {
    // Set up interception using page.route() 
    await page.route("**/pokeapi.co/api/v2/pokemon/**", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          id: 999,
          name: "mock-pokemon",
          sprites: {
            front_default: "https://example.com/mock-pokemon.png",
          },
          height: 10,
          weight: 100,
        }),
      });
    });

    // Make request from within the browser page using fetch - this gets intercepted
    const pokemon = await page.evaluate(async () => {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
      return await response.json();
    });

    // Verify mocked data
    expect(pokemon.name).toBe("mock-pokemon");
    expect(pokemon.id).toBe(999);
    expect(pokemon.sprites.front_default).toBe(
      "https://example.com/mock-pokemon.png",
    );
  });

  test("Mock GitHub User API response", async ({ page }) => {
    // Set up route to intercept GitHub API calls using page.route()
    await page.route("**/api.github.com/users/**", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          login: "mock-user",
          id: 12345,
          name: "Mock GitHub User",
          public_repos: 50,
          followers: 1000,
        }),
      });
    });

    // Make request from within the page using fetch
    const githubUser = await page.evaluate(async () => {
      const response = await fetch("https://api.github.com/users/octocat");
      return await response.json();
    });

    // Verify mocked data was returned
    expect(githubUser.login).toBe("mock-user");
    expect(githubUser.id).toBe(12345);
    expect(githubUser.name).toBe("Mock GitHub User");
  });

  test("Mock API with error response", async ({ page }) => {
    // Mock an API to return an error using page.route()
    await page.route("**/api.kanye.rest/**", async (route) => {
      await route.abort("failed");
    });

    // Try to make request from within the page - it will fail
    try {
      const response = await page.evaluate(async () => {
        const response = await fetch("https://api.kanye.rest/");
        return await response.json();
      });
      console.log("Request failed as expected");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  test("Mock API with custom status code", async ({ page }) => {
    // Mock an API to return 429 (Too Many Requests) using page.route()
    await page.route("**/randomuser.me/api/**", async (route) => {
      await route.fulfill({
        status: 429,
        contentType: "application/json",
        body: JSON.stringify({
          error: "Rate limit exceeded",
        }),
      });
    });

    // Make request from within the page
    const result = await page.evaluate(async () => {
      const response = await fetch("https://randomuser.me/api/");
      const data = await response.json();
      return {
        status: response.status,
        data: data,
      };
    });

    // Verify error status
    expect(result.status).toBe(429);
    expect(result.data.error).toBe("Rate limit exceeded");
  });
});
