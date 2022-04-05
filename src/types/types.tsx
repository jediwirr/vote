export interface ITeam {
    pk: number,
    name: string,
    leader: string,
    image: string,
    members?: string,
    voted?: number,
    color: string,
    form: number
}

export interface IVoter {
    clue: string,
    user_id: string,
    form: number,
    name: string,
    surname: string,
    choice: string
}