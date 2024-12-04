import { checkURL } from "../js/urlChecker.js";

describe("urlChecker", () => {
  test("urlChecker", () => {
    expect(checkURL("invalid url")).toBe(false);
    expect(checkURL("https://www.mozilla.org/")).toBe(true);
  });
});
