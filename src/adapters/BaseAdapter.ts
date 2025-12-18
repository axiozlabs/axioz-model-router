import type { ModelTask, ProviderAdapter, ProviderName, RouterRequest, RouterResponse } from "../router/types.js";

export abstract class BaseAdapter implements ProviderAdapter {
  abstract readonly name: ProviderName;
  protected abstract readonly supportedTasks: Set<ModelTask>;

  supports(task: ModelTask): boolean {
    return this.supportedTasks.has(task);
  }

  abstract run(req: RouterRequest): Promise<RouterResponse>;
}
