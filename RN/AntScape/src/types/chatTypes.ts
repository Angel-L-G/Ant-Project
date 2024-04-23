export type Message = {
    id: number,
    body: string,
    sentAt?: Date,
    senderId: number,
}

export type Chat = {
    id: number,
    idGuild?: number,
    lastMessage: string,
    nameUser1: string,
    nameUser2?: string,
    messages: Array<Message>
}

export type chatUser = {
    id: number,
    username: string
}

export type ChatInputSaveDTO = {
    idGuild?: number,
    nameUser2?: string
}
