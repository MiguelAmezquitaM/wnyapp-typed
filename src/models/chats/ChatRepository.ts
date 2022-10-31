import { Chat } from "./Chat";

export interface ChatRepository {
    createChat(user1: string, user2: string): Promise<Chat>

    sendMessage(owner: string, content: string, chatId: string): Promise<void>

    getMessages(chatId: string): Promise<Chat>
    getChats(): Promise<Chat[]>

    queue(): Promise<{ who: string }[]>
    accept(who: string): Promise<void>
    request(who: string): Promise<boolean>

    chatsOf(who: string): Promise<Chat[]>
}