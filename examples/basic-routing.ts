import { ModelRouter } from "../src/router/Router.js";
import { FirstAvailablePolicy } from "../src/router/Policy.js";

import { OpenAIAdapter } from "../src/providers/openai.js";
import { AnthropicAdapter } from "../src/providers/anthropic.js";
import { GeminiAdapter } from "../src/providers/gemini.js";
import { DeepSeekAdapter } from "../src/providers/deepseek.js";
import { GroqAdapter } from "../src/providers/groq.js";
import { LocalAdapter } from "../src/providers/local.js";

const router = new ModelRouter({
  policy: new FirstAvailablePolicy(),
  providers: [
    new OpenAIAdapter(),
    new AnthropicAdapter(),
    new GeminiAdapter(),
    new DeepSeekAdapter(),
    new GroqAdapter(),
    new LocalAdapter()
  ]
});

const res = await router.route({
  task: "chat",
  model: "axioz-default",
  input: { prompt: "hello" }
});

console.log(res);
