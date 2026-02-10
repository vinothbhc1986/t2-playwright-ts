import {test, expect} from '@playwright/test';
import { RandomUser } from './types/RandomUser';
import { Quote } from './types/Quote';
import { RonQuote } from './types/RonQuote';
import { GithubUser } from './types/GithubUser';
import { Pokemon } from './types/Pokemon';

test('random user', async ({page}) => {
    const response = await page.request.get('https://randomuser.me/api/');
    const randomUser:RandomUser = await response.json();

    expect(randomUser.results[0].name.first).toBeDefined();
    expect(randomUser.results[0].name.last).toBeDefined();
    expect(randomUser.results[0].email).toBeDefined();

});

test('quote', async ({page}) => {
    const response = await page.request.get('https://api.kanye.rest/');
    const quote:Quote = await response.json();
    expect(quote.quote).toBeDefined();
});

test('ron quote', async ({page}) => {
    const response = await page.request.get('https://ron-swanson-quotes.herokuapp.com/v2/quotes');
    const ronQuote: RonQuote= { arr:  await response.json()};
    console.log(ronQuote);
    expect(ronQuote.arr[0]).toBeDefined();
});

test('github user', async ({page}) => {
    const response = await page.request.get('https://api.github.com/users/octocat');
    const githubUser:GithubUser  = await response.json();
    expect(githubUser.login).toBe('octocat');
    expect(githubUser.id).toBe(583231);
    expect(githubUser.name).toBe('The Octocat');
});

test('space lauch', async ({page}) => {
    const response = await page.request.get('https://api.spacexdata.com/v4/launches/latest');
    const spaceLaunch = await response.json();
    expect(spaceLaunch.name).toBeDefined();
    expect(spaceLaunch.date_utc).toMatch(/\d{4}-\d{2}-\d{2}/);
    expect(spaceLaunch.success).toBeTruthy();
    expect(spaceLaunch.id).toBe('62dd70d5202306255024d139');
});

test('Pokemon data', async ({page}) => {
    const response = await page.request.get('https://pokeapi.co/api/v2/pokemon/ditto');
    const pokemon: Pokemon = await response.json();

    expect(pokemon.name).toBe('ditto');
    expect(pokemon.sprites.front_default).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png');
    expect(pokemon.id).toBe(132);
});