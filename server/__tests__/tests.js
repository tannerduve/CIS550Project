const { expect } = require('@jest/globals');
const supertest = require('supertest');
const app = require('../server');
const results = require("./results.json")

//attempted Unit Testing
test('GET /random', async () => {
  await supertest(app).get('/random')
    .expect(200)
    .then((res) => {
      expect(res.body).toStrictEqual({
        RecipeId: expect.any(Number),
        Name: expect.any(String)
      });
    });
});

test('GET /recipes', async () => {
  await supertest(app).get('/recipes')
    .expect(200)
    .then((res) => {
      expect(res.body).toStrictEqual(results.recipes)
    });
});

test('GET /top_recipes all', async () => {
  await supertest(app).get('/top_recipes')
    .expect(200)
    .then((res) => {
      expect(res.body.length).toEqual(238)
      expect(res.body[22]).toStrictEqual(results.top_recipes_22)
    });
});

test('GET /top_recipes page 3', async () => {
  await supertest(app).get('/top_recipes?page=3')
    .expect(200)
    .then((res) => {
      expect(res.body).toStrictEqual(results.top_recipes_page_3)
    });
});