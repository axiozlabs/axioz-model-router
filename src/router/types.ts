export type ProviderName =
  | "openai"
  | "anthropic"
  | "gemini"
  | "deepseek"
  | "groq"
  | "local";

export type ModelTask = "chat" | "embeddings";

export interface RouterRequest {
  task: ModelTask;
  model: string;
  input: unknown;
  metadata?: Record<string, unknown>;
}

export interface RouterResponse<T = unknown> {
  provider: ProviderName;
  model: string;
  output: T;
  usage?: Record<string, unknown>;
}

export interface ProviderAdapter {
  readonly name: ProviderName;
  supports(task: ModelTask): boolean;
  run(req: RouterRequest): Promise<RouterResponse>;
}

export interface RoutingDecision {
  provider: ProviderName;
  reason?: string;
}
