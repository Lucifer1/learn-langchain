import { SILICONFLOW_API_KEY, SILICONFLOW_URL } from '../constants/api.ts'
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const model = new ChatOpenAI({
  model: "Qwen/Qwen2.5-7B-Instruct",
  // model: "Pro/deepseek-ai/DeepSeek-V3",
  configuration: {
    baseURL: SILICONFLOW_URL,
    apiKey: SILICONFLOW_API_KEY
  }
});

// const messages = [
//   new SystemMessage("Translate the following from English into Italian"),
//   new HumanMessage("hi!"),
// ];

// const result = await model.invoke(messages);
// console.log(result);
// 下方三种也支持
// await model.invoke("Hello");
// await model.invoke([{ role: "user", content: "Hello" }]);
// await model.invoke([new HumanMessage("hi!")]);


// 流式
// const stream = await model.stream(messages);
// const chunks = [];
// for await (const chunk of stream) {
//   chunks.push(chunk);
//   console.log(`${chunk.content}|`);
// }

// PromptTemplate
const systemTemplate = "Translate the following from English into {language}";
const promptTemplate = ChatPromptTemplate.fromMessages([
  ["system", systemTemplate],
  ["user", "{text}"],
]);
const promptValue = await promptTemplate.invoke({
  language: "italian",
  text: "hi!",
});

const promptMessages = promptValue.toChatMessages();
console.log('>>>', 'promptMessages', promptMessages)

const result = await model.invoke(promptMessages);
console.log('>>>', 'result', result)

