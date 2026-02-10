import { test, expect } from "@playwright/test";

import { Product } from "./types/Product";
import { Todo } from "./types/Todo";
import { Comment } from "./types/Comment";
import { Album } from "./types/Album";

import { Post } from "./types/Post";
import { AdviceSlip } from "./types/AdviceSlip";

import { Photo } from "./types/Photo";

import { DogImage } from "./types/DogImage";
import { ChuckNorrisJoke    } from "./types/ChuckNorrisJoke";
import { CatFact } from "./types/CatFact";

test("fetch product", async ({ page }) => {
  const response = await page.request.get(
    "https://fakestoreapi.com/products/1",
  );
  const product: Product = await response.json();

  expect(product.id).toBe(1);
  expect(product.title).toBe(
    "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  );
  expect(product.price).toBe(109.95);
  expect(product.description).toBe(
    "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  );
  expect(product.description).toBeDefined();
  expect(product.category).toBe("men's clothing");
  expect(product.image).toBe(
    "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
  );
  expect(product.rating.rate).toBe(3.9);
  expect(product.rating.count).toBe(120);
});

test("todo test", async ({ page }) => {
  const response = await page.request.get(
    "https://jsonplaceholder.typicode.com/todos/1",
  );
  const todo: Todo = await response.json();

  expect(todo.userId).toBe(1);
  expect(todo.id).toBe(1);
  expect(todo.title).toBe("delectus aut autem");
  expect(todo.completed).toBe(false);
});

test("comment test", async ({ page }) => {
  const response = await page.request.get(
    "https://jsonplaceholder.typicode.com/comments/1",
  );
  const comment: Comment = await response.json();

  expect(comment.postId).toBe(1);
  expect(comment.id).toBe(1);
  expect(comment.name).toBe("id labore ex et quam laborum");
  expect(comment.email).toBe("Eliseo@gardner.biz");
  expect(comment.body).toBe(
    "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium",
  );
});

test("album test", async ({ page }) => {
  const response = await page.request.get(
    "https://jsonplaceholder.typicode.com/albums/1",
  );
  const album: Album = await response.json();

  expect(album.userId).toBe(1);
  expect(album.id).toBe(1);
  expect(album.title).toBe("quidem molestiae enim");
});

test("post test", async ({ page }) => {
  const response = await page.request.get(
    "https://jsonplaceholder.typicode.com/posts",
  );
  const post: Post[] = await response.json();
  expect(post[0].userId).toBe(1);
  expect(post[0].id).toBe(1);
  expect(post[0].title).toBe(
    "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  );
  expect(post[0].body).toBe(
    "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
  );
});

test("photo test", async ({ page }) => {
  const response = await page.request.get(
    "https://jsonplaceholder.typicode.com/photos/1",
  );
  const photo: Photo = await response.json();
  expect(photo.albumId).toBe(1);
  expect(photo.id).toBe(1);
  expect(photo.title).toBe(
    "accusamus beatae ad facilis cum similique qui sunt",
  );
  expect(photo.url).toBe("https://via.placeholder.com/600/92c952");
  expect(photo.thumbnailUrl).toBe("https://via.placeholder.com/150/92c952");
});

test("dog image test", async ({ page }) => {
  const response = await page.request.get(
    "https://dog.ceo/api/breeds/image/random",
  );
  const dogImage: DogImage = await response.json();
  expect(dogImage.message).toBeDefined();
  expect(dogImage.status).toBe("success");
});

test("cat fact test", async ({ page }) => {
  const response = await page.request.get("https://catfact.ninja/fact");
  const catFact: CatFact = await response.json();
  expect(catFact.fact).toBeDefined();
  expect(catFact.length).toBeDefined();
});

test("advice slip test", async ({ page }) => {
  const response = await page.request.get("https://api.adviceslip.com/advice");
  const adviceSlip: AdviceSlip = await response.json();
  expect(adviceSlip.slip.id).toBeDefined();
  expect(adviceSlip.slip.advice).toBeDefined();
});

test("chuck norris joke test", async ({ page }) => {
  const response = await page.request.get("https://api.chucknorris.io/jokes/random");
  const joke: ChuckNorrisJoke = await response.json();  
    expect(joke.categories).toBeDefined();
    expect(joke.created_at).toBeDefined();
    expect(joke.icon_url).toBeDefined();
    expect(joke.id).toBeDefined();
    expect(joke.updated_at).toBeDefined();
    expect(joke.url).toBeDefined();
    expect(joke.value).toBeDefined();
});