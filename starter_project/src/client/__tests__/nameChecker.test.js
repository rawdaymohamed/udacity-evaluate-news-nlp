import { checkForName } from "../js/nameChecker";
describe("nameChecker", () => {
  test("nameChecker works as expected", async () => {
    expect(checkForName("Picard")).toBe(true);
    expect(checkForName("Janeway")).toBe(true);
    expect(checkForName("John")).toBeFalsy();
    expect(checkForName("Jane")).toBeFalsy();
  });
});
