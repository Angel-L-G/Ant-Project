export type GraphqlResponse = {
    status: number
    name: String
    msg: String
}

export type GraphqlSaveInputDTO = {
    active: boolean,
    eggs: number,
    email: string,
    goldenEggs: number,
    img: string,
    name: string,
    password: string,
    rol: string,
}

export type GraphqlUpdateInputDTO = {
    active: boolean,
    eggs: number,
    email: string,
    goldenEggs: number,
    id: number,
    rol: string,
    img: string,
    name: string,
    password: string,
}