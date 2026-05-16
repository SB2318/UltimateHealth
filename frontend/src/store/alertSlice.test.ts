/// <reference types="jest" />
import alertReducer, { showAlert, hideAlert } from "./alertSlice";

describe("alertSlice reducer", () => {
  it("should return initial state", () => {
    const state = alertReducer(undefined, { type: "" });

    expect(state).toBeDefined();
  });
});
it("should handle showAlert", () => {
  const state = alertReducer(undefined, showAlert({
    title: "Test",
    message: "Hello",
    onConfirm: null,
    onCancel: null,
  }));

  expect(state.visible).toBe(true);
  expect(state.title).toBe("Test");
  expect(state.message).toBe("Hello");
});

it("should handle hideAlert", () => {
  const initialState = {
    visible: true,
    title: "Test",
    message: "Hello",
    onConfirm: null,
    onCancel: null,
  };

  const state = alertReducer(initialState, hideAlert());

  expect(state.visible).toBe(false);
  expect(state.title).toBe("");
  expect(state.message).toBe("");
});