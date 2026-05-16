/// <reference types="jest" />

import userReducer, {
  setUserId,
  setUserToken,
  setUserHandle,
  setSocialUserId,
  setGuestMode,
  resetUserState,
} from "./UserSlice";

describe("UserSlice reducer", () => {

  it("should return initial state", () => {
    const state = userReducer(undefined, { type: "" });

    expect(state).toBeDefined();
    expect(state.user_id).toBe("");
    expect(state.user_token).toBe("");
    expect(state.user_handle).toBe("");
    expect(state.social_user_id).toBe("");
    expect(state.isGuest).toBe(false);
  });

  it("should handle setUserId", () => {
    const state = userReducer(undefined, setUserId("123"));

    expect(state.user_id).toBe("123");
  });

  it("should handle setUserToken", () => {
    const state = userReducer(undefined, setUserToken("token123"));

    expect(state.user_token).toBe("token123");
  });

  it("should handle setUserHandle", () => {
    const state = userReducer(undefined, setUserHandle("kumkum"));

    expect(state.user_handle).toBe("kumkum");
  });

  it("should handle setSocialUserId", () => {
    const state = userReducer(undefined, setSocialUserId("social123"));

    expect(state.social_user_id).toBe("social123");
  });

  it("should handle setGuestMode", () => {
    const state = userReducer(undefined, setGuestMode(true));

    expect(state.isGuest).toBe(true);
  });

  it("should handle resetUserState", () => {
    const initialState = {
      user_id: "1",
      user_token: "abc",
      user_handle: "test",
      social_user_id: "social",
      isGuest: true,
    };

    const state = userReducer(initialState, resetUserState());

    expect(state.user_id).toBe("");
    expect(state.user_token).toBe("");
    expect(state.user_handle).toBe("");
    expect(state.social_user_id).toBe("");
    expect(state.isGuest).toBe(false);
  });

});