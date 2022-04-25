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
    pk: number
    clue: string,
    user_id: string,
    form: number,
    name: string,
    surname: string,
    choice: string,
    voted: string
}

export interface IParent {
    pk: number,
    clue: string,
    user_id: string,
    name: string,
    surname: string,
    choice: string,
    voted: string
}

export interface IVote {
    pk: number;
    start: string | null;
    finish: string | null;
    name: string;
}