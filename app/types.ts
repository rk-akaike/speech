export type MessageType = {
  id: number;
  type: "user" | "ai";
  isAiMsg: boolean;
  text: string;
};
