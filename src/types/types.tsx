export interface IMember {
    name: string,
}

export interface ITeam {
    name: string,
    leader: string,
    members: IMember[],
}