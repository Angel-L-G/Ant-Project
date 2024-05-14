export type ContextUser = {
    id: number,
    nombre: string,
    password: string,
    email: string,
    rol: string
}

export type UserLogin = {
    nombre: string,
    password: string
}

export type User = {
    id: number,
    eggs: number,
    goldenEggs: number,
    img: string,
    name: string,
    nests: Array<Nest>,
    id_guild: number | undefined,
    totalMoneyGenerated: string
}

export type Usuario = {
    id: number,
    active: boolean,
    banned: boolean,
    eggs: string,
    email: string,
    goldenEggs: string,
    hash: string,
    img: string,
    name: string,
    password: string,
    rol: string,
    totalMoneyGenerated: string
}

export type Nest = {
    id: number,
    deleted: boolean,
    nestLevels: Array<NestLevel>,
    ant: Ant,
    user: User
}

export type NestLevel = {
    id: number,
    cost: number,
    level: number,
    multiplier: number,
    name: string,
    production: number,
    id_nest: number
}

export type Ant = {
    id: number,
    biome: string,
    description: string,
    name: string,
    type: string
}