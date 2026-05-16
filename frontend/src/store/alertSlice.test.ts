/// <reference types="jest" />
import alertReducer from "./alertSlice";

describe("alertSlice reducer", () => {
  it("should return initial state", () => {
    const state = alertReducer(undefined, { type: "" });

    expect(state).toBeDefined();
  });
});