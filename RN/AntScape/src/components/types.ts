type User = {
    id: number,
    name: string,
}

type Chat = {
    id: number,
    name: string,
    messages: Array<Message>
}

type Message = {
    idUser: number,
    message: string
}

type Hormiguero = {
    id: number,
    img: string,
    antname: string,
    biome: string,
}

type AlmacenImg ={
    nombre: string;
    ubicacion: ReturnType<any>;
}