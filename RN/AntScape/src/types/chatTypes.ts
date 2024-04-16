export type Message = {
    id: number,
    body: string,
    sendAt: Date,
    sender: number,
}

export type Chat = {
    id: number,
    idGuild: number,
    lastMessage: string,
    usuario1: chatUser,
    usuario2: chatUser,
    messages: Array<Message>
}

export type chatUser = {
    id: number,
    username: string
}