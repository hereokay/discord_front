interface Chat {
  globalName: String;
  userName: String;
  content: String;
  guildId: String;
  channelId: String;
  msgId: String;
  timeStamp: String;
}

interface ChatParams {
  content: string;
  macro: boolean;
}
