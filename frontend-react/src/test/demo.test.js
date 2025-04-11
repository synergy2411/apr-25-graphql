/* eslint-disable no-undef */
// import { sum } from './utils'        => ESM

const { sum } = require("./utils"); // => CommonJS Module

xdescribe("Utility Testing Suite", () => {
  /* eslint-disable no-undef */
  test("should test for truthiness", () => {
    //   Assertion
    expect(true).toBeTruthy();
  });

  test("should return 6 when add 2 and 4", () => {
    let result = 2 + 4;
    expect(result).toEqual(6);
  });

  test("should add two numbers", () => {
    const result = sum(3, 5);
    expect(result).toEqual(8);
  });
});
