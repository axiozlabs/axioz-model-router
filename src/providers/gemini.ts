import { BaseAdapter } from "../adapters/BaseAdapter.js";
import type { RouterRequest, RouterResponse } from "../router/types.js";

export class GeminiAdapter extends BaseAdapter {
  readonly name = "gemini" as const;
  protected readonly supportedTasks = new Set(["chat"] as const);

  async run(req: RouterRequest): Promise<RouterResponse> {
    return { provider: this.name, model: req.model, output: { message: "gemini-stub", input: req.input } };
  }
}
