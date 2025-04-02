import { PromptTemplate, ChatPromptTemplate, MessagesPlaceholder} from "@langchain/core/prompts";
import { HumanMessage } from "@langchain/core/messages";

// string prompt
const promptTemplate = PromptTemplate.fromTemplate('Tell me a joke about {topic}')

const result = await promptTemplate.invoke({
  topic: 'cats'
})
console.log('>>>', 'result', result.toString())

// ChatPromptTemplate
const chatPromptTemplate = ChatPromptTemplate.fromMessages([
  ['system', 'You are a helpful assistant'],
  ['user', 'tell me a joke about {topic}'],
])

const res = await chatPromptTemplate.invoke({
  topic: 'cats'
})
console.log('>>>', 'res2', res.toString())

// MessagePlageHolder
const messagePromptTemplate = ChatPromptTemplate.fromMessages([
  ['system', 'You are a helpful assistant'],
  new MessagesPlaceholder('msgs')
])


// 3 4 5 等效
const res3 = await messagePromptTemplate.invoke({
  msgs: ['tell me a joke about cats']
})
console.log('>>>', 'res3', res3)
const res4 = await messagePromptTemplate.invoke({
  msgs: [{'role': 'user', 'content': 'tell me a joke about cats'}]
})
console.log('>>>', 'res4', res4)
const res5 = await messagePromptTemplate.invoke({
  msgs: [new HumanMessage('tell me a joke about cats')]
})
console.log('>>>', 'res5', res5)






