import { BaseAdapter } from "../adapters/BaseAdapter.js";
import type { RouterRequest, RouterResponse } from "../router/types.js";

export class LocalAdapter extends BaseAdapter {
  readonly name = "local" as const;
  protected readonly supportedTasks = new Set(["chat", "embeddings"] as const);

  async run(req: RouterRequest): Promise<RouterResponse> {
    return {
      provider: this.name,
      model: req.model,
      output: { message: "local-stub", input: req.input }
    };
  }
}
