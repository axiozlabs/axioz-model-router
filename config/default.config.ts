export const defaultConfig = {
  providers: ["openai", "anthropic", "gemini", "deepseek", "groq", "local"],
  policy: "first-available"
} as const;
