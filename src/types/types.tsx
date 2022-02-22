export interface ITeam {
    pk: number,
    name: string,
    leader: string,
    image: string,
    members?: string,
    voted?: number,
    color: string
}