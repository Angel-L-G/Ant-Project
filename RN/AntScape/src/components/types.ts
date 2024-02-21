export type ContextUser = {
    id: number,
    nombre: string,
    password: string,
    email: string,
    rol: string,
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

export type Chat = {
    id: number,
    name: string,
    messages: Array<Message>
}

export type Message = {
    idUser: number,
    message: string
}

export type AlmacenImg ={
    nombre: string;
    ubicacion: ReturnType<any>;
}