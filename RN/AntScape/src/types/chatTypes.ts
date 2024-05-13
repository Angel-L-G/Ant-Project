export type Message = {
    body: string,
    sentAt?: Date,
    senderId: number,
}

export type groupMessage = {
    guildId: number,
    senderId: number,
    author: string,
    content: string,
    sentAt?: Date
}

export type websocketMessage ={
    author: string,
	receiver: string,
	content: string,
	sentAt: Date,
    senderId: number
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
