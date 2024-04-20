export type GuildUser = {
    id: number,
    name: string,
    img: string
}

export type GuildLevel = {
    id: number,
    cost: number,
    efect: string,
    level: number,
    name: string,
}

export type Guild = {
    id: number,
    leader: number,
    defenseNumber: number,
    defenseRange: number,
    name: string,
    description: string,
    quanttity: number,
    trophys: number,
    users: Array<GuildUser>,
    guildLevels: Array<GuildLevel>
}