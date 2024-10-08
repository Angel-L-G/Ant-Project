export type ContextUser = {
    id: number,
    nombre: string,
    password: string,
    email: string,
    rol: string
}

export type UserLogin = {
    nombre: string,
    password: string,
}

export type UserRegister = {
    nombre: string,
    password: string,
    email: string,
}

export type Friend = {
    id: number,
    nombre: string,
    email: string,
}

export type NestSaveDTO = {
    antType: string,
    deleted: boolean,
    map: string,
    nameUser: string,
}

export type NestDetails = {
    id: number,
    antType: string,
    deleted: boolean,
    map: string,
}

export type Hormiguero = {
    id: number,
    img: string,
    antname: string,
    biome: string,
}

export type AlmacenImg ={
    nombre: string;
    ubicacion: ReturnType<any>;
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

export type User = {
    id: number,
    eggs: number,
    goldenEggs: number,
    img: string,
    name: string,
    nests: Array<Nest>,
    id_guild: number | undefined,
    totalMoneyGenerated: number
}

export type Nest = {
    id: number,
    deleted: false,
    nestLevels: Array<NestLevel>,
    ant: Ant,
    user: User
}

export type ClanType = {
    id: number,
    name: string,
    description: string,
    quantity: number,
    leader: number,
    trophys: number,
    defenseRange: string,
    guildImage: string,
    defenseNumber: number,
    guildLevels: Array<GuildLevel>
}

export type GuildLevel = {
    id: number,
    cost: number,
    efect: string,
    level: number,
    name: string
}

export type ResultAttack = {
    eggs: number,
    goldenEggs: number,
    trophys: number
}