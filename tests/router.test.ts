import { describe, it, expect } from "vitest";
import { ModelRouter } from "../src/router/Router.js";
import { FirstAvailablePolicy } from "../src/router/Policy.js";
import { LocalAdapter } from "../src/providers/local.js";

describe("ModelRouter", () => {
  it("routes to a provider and returns response", async () => {
    const router = new ModelRouter({
      policy: new FirstAvailablePolicy(),
      providers: [new LocalAdapter()]
    });

    const res = await router.route({ task: "chat", model: "test", input: "ping" });
    expect(res.provider).toBe("local");
  });
});
