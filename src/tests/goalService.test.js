import React from "react";
import ReactDOM from "react-dom";
import { Route, Link, MemoryRouter } from "react-router-dom";
import { goalService } from "./../services";
import { HttpClientMock } from "./../utils/httpClient.mock";
import ApiClient from "./../utils/apiClient";
import { arranger } from "./../utils/mockDb";

beforeAll(() => {
    ApiClient.setHttpClient(new HttpClientMock());
});

beforeEach(() => {
    arranger.clearAll();
});

it("should get goals", async () => {

  let goals = await goalService.getGoals();
  expect(goals.length).toBe(0);

  let expectedGoals = [
    { id: 1, title: "do something", desc: "desc somthing", userId: 1 },
    { id: 2, title: "do something", desc: "desc somthing", userId: 1 }
  ];

  arranger.entity("goals").addRange(expectedGoals);

  goals  = await goalService.getGoals();
  expect(goals.length).toBe(2);
});

it("should create goal", async () => {
    let goal = {
        id: 1, title: 'have a good time', desc: 'desc is required', userId: 1
    };

    await goalService.createGoal(goal);

    expect(arranger.entity('goals').getAll().length).toBe(1);
    let addedGoal = arranger.entity('goals').getAll()[0];

    expect(goal.id).toBe(addedGoal.id);
    expect(goal.title).toBe(addedGoal.title);
    expect(goal.desc).toBe(addedGoal.desc);
    expect(goal.userId).toBe(addedGoal.userId);
});


