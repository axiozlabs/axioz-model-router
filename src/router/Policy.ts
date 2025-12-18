import type { ProviderAdapter, RoutingDecision, RouterRequest } from "./types.js";

export interface RoutingPolicy {
  decide(req: RouterRequest, providers: ProviderAdapter[]): RoutingDecision;
}

/**
 * Default policy:
 * - choose the first provider that supports the task
 * - (later) can be extended with priority, latency, cost, health checks, etc.
 */
export class FirstAvailablePolicy implements RoutingPolicy {
  decide(req: RouterRequest, providers: ProviderAdapter[]): RoutingDecision {
    const chosen = providers.find((p) => p.supports(req.task));
    return {
      provider: chosen?.name ?? "local",
      reason: chosen ? "first-available" : "fallback-local"
    };
  }
}
