import React, { FC, useCallback, useEffect, useLayoutEffect, useState } from "react";
import styled from "@emotion/styled";
import { teamAPI } from "../../services/TeamService";
import Chart from '../Chart/Chart';
import { IParent, ITeam, IVote, IVoter } from "../../types/types";
import styles from "./VotePage.module.css"
import { voterAPI } from "../../services/VoterService"
import {parentAPI} from "../../services/ParentService";
import { voteAPI } from "../../services/VoteService";

const VotePage: FC = () => {
    let { data: teamsData, error, isLoading } = teamAPI.useFetchAllTeamsQuery(5, {
        pollingInterval: 100000
    });
    const [updateTeam, { error: updateError, isLoading: isUpdateLoading }] = teamAPI.useUpdateTeamMutation();
    const { data: voters} = voterAPI.useFetchAllVotersQuery(5, {
        pollingInterval: 20000
    });
    const { data: parents} = parentAPI.useFetchAllParentsQuery(5, {
        pollingInterval: 20000
    });
    const {data: votes} = voteAPI.useFetchAllVotesQuery(5)
    const [updateVote] = voteAPI.useUpdateVoteMutation();

    const [deleteVoter] = voterAPI.useDeleteVoterMutation();
    const [deleteParent] = parentAPI.useDeleteParentMutation();

    const [bill, setBill] = useState<number[]>([]);
    const [labels, setLabels] = useState<string[]>([]);
    const [colors, setColors] = useState<string[]>([]);
    const [src, setSrc] = useState('voters');
    const [teams, setTeams] = useState<ITeam[]>(teamsData as ITeam[]);

    const sortTeams = () => {
        let newArr: ITeam[] = Object.assign([], teamsData);
        newArr.sort((a, b) => a.form - b.form)
        return newArr
    }

    useEffect(() => {
        console.log(teamsData)
        let billArr: number[] = [];
        let labelsArr: string[] = [];
        let colorsArr: string[] = [];
        setTeams(sortTeams())
        console.log(votes)
        teams?.map((team: ITeam) => {
            let voted = 0
            if(src === 'voters'){
                voted = team.voted ? team.voted : 0;
                voters?.forEach((voter:IVoter) => {
                    if(voter.choice === team.name && (votes as IVote[])[0].start != null && voter.voted >= ((votes as IVote[])[0].start as string) && voter.voted <= ((votes as IVote[])[0].finish as string)) voted++;
                })
            }
            else{
                parents?.forEach((parent:IParent) => {
                    if(parent.choice === team.name) voted++;
                })
            }
            billArr.push(voted);
            labelsArr.push(team.name);
            colorsArr.push(team.color);
        });
        setBill(billArr);
        setLabels(labelsArr);
        setColors(colorsArr);
    }, [teamsData, voters, parents, src]);

    const StyledBlock = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 550px;
        padding: 5px;
    `;

    const handleUpdate = useCallback((team: ITeam) => {
        updateTeam(team);
    }, []);

    const newVotedData = (team: ITeam, voted: number) => {
        updateTeam({...team, voted})
    }

    const deleteAllVoters = () => {
        voters?.forEach(element => {
            deleteVoter(element.pk);
        });
    }

    const deleteAllParents = () => {
        parents?.forEach(element => {
            deleteParent(element.pk);
        });
    }

    const startVote = (vote: IVote) => {
        const curDate = new Date()
        var finDate = new Date(curDate.getTime() + 600000);
        updateVote({...vote, start: curDate.toISOString(), finish: finDate.toISOString() })
    }

    return (
        <StyledBlock>
            {isLoading && <h1>Идет загрузка...</h1>}
            {error && <h1>Произошла ошибка</h1>}
            {teams &&
                <div style={{height:'90%', width:'100%'}}>
                    <Chart bill={bill} labels={labels} colors={colors} />
                    <div className={styles.container}>
                    {teams?.map((team: ITeam) => 
                        <img className={styles.team_logo} src={team.image} alt="logo"/>
                    )}
                    {src === 'voters' ? teams?.map((team: ITeam) => 
                        <input type="text" className={styles.team_logo} value={team.voted} onChange={e => newVotedData(team, Number(e.target.value))}/>
                    ) : <div></div>
                    }
                    </div>
                </div>
            }
            <div style={{marginTop: '7%'}}>
                <button className={styles.submit_button} onClick={() => {setSrc('voters')}}>Ученики</button>
                <button className={styles.submit_button} onClick={() => {setSrc('parents');}}>Родители</button>
            </div>
            <div style={{marginBottom: '7%'}}>
                <button className={styles.submit_button} onClick={() => {
                    startVote((votes as IVote[])[0])
                    }
                }>Начать голосование!</button>
                <button className={styles.submit_button} onClick={() => {
                    deleteAllVoters(); 
                    deleteAllParents();
                    teams.forEach(element => {
                        newVotedData(element, 0)
                    });
                    updateVote({...(votes as IVote[])[0], start: null, finish: null})
                }}>Очистить</button>
                <div>Место для таймера</div>
            </div> 
        </StyledBlock>
        
    );
}

export default VotePage;
