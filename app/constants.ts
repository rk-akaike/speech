import { MessageType } from "./types";

export const SPEECH_KEY = "51518460228446eea72c63ceb10db0a6";
export const SPEECH_REGION = "eastus";

export const INITIAL_MESSAGES: MessageType[] = [
  {
    id: 1,
    type: "ai",
    isAiMsg: true,
    text: "Hello, how can I help you?",
  },
  {
    id: 2,
    type: "user",
    isAiMsg: false,
    text: "I want to book a flight",
  },
  {
    id: 3,
    type: "ai",
    isAiMsg: true,
    text: "Sure, I can assist you with that. Please provide me with your travel details.",
  },
  {
    id: 4,
    type: "user",
    isAiMsg: false,
    text: "I am looking to book a flight from New York to Los Angeles.",
  },
  {
    id: 5,
    type: "ai",
    isAiMsg: true,
    text: "Great! What is your preferred departure date and time?",
  },
  {
    id: 6,
    type: "user",
    isAiMsg: false,
    text: "I would like to depart on June 15th at 9:00 AM.",
  },
  {
    id: 7,
    type: "ai",
    isAiMsg: true,
    text: "Okay. Let me check the available flights for you.",
  },
  {
    id: 8,
    type: "ai",
    isAiMsg: true,
    text: "I found a few options for you. Here are the details...",
  },
  {
    id: 9,
    type: "user",
    isAiMsg: false,
    text: "That sounds good. How much does it cost?",
  },
  {
    id: 10,
    type: "ai",
    isAiMsg: true,
    text: "The total cost for the flight is $200.",
  },
];
