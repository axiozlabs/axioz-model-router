import { BaseAdapter } from "../adapters/BaseAdapter.js";
import type { RouterRequest, RouterResponse } from "../router/types.js";

export class GroqAdapter extends BaseAdapter {
  readonly name = "groq" as const;
  protected readonly supportedTasks = new Set(["chat"] as const);

  async run(req: RouterRequest): Promise<RouterResponse> {
    return { provider: this.name, model: req.model, output: { message: "groq-stub", input: req.input } };
  }
}
