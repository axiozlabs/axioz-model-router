import { RouterError } from "../errors/RouterError.js";
import type { ProviderAdapter, RouterRequest, RouterResponse } from "./types.js";
import type { RoutingPolicy } from "./Policy.js";

export interface RouterOptions {
  policy: RoutingPolicy;
  providers: ProviderAdapter[];
}

export class ModelRouter {
  private readonly policy: RoutingPolicy;
  private readonly providers: Map<string, ProviderAdapter>;

  constructor(opts: RouterOptions) {
    this.policy = opts.policy;
    this.providers = new Map(opts.providers.map((p) => [p.name, p]));
  }

  listProviders(): string[] {
    return Array.from(this.providers.keys());
  }

  async route(req: RouterRequest): Promise<RouterResponse> {
    const providers = Array.from(this.providers.values());
    const decision = this.policy.decide(req, providers);
    const adapter = this.providers.get(decision.provider);

    if (!adapter) {
      throw new RouterError("PROVIDER_NOT_FOUND", `Provider '${decision.provider}' is not registered`);
    }

    if (!adapter.supports(req.task)) {
      throw new RouterError("TASK_UNSUPPORTED", `Provider '${adapter.name}' does not support task '${req.task}'`);
    }

    return adapter.run(req);
  }
}
