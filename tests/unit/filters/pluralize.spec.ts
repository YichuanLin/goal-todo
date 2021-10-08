import { pluralize } from "@/filters/pluralize";

describe("Pluralize filter", () => {
  it("returns text in plural when amount is not one", () => {
    const text = "task";
    const amount = 10;
    const expected = "tasks";

    const result = pluralize(text, amount);
    expect(result).toBe(expected);
  });

  it("returns text in sngular when amount is one", () => {
    const text = "task";
    const amount = 1;
    const expected = "task";

    const result = pluralize(text, amount);
    expect(result).toBe(expected);
  });
});
