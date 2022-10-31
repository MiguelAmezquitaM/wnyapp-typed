
export type Message = {
    owner: string
    content: string
}

export type Chat = {
    participants: string[]
    messages: Message[]
    chatId: string
}