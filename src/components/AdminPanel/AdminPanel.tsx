import React, { FC, useCallback, useEffect, useLayoutEffect, useState } from "react";
import styled from "@emotion/styled";
import { teamAPI } from "../../services/TeamService";
import Chart from '../Chart/Chart';
import { IParent, ITeam, IVote, IVoter } from "../../types/types";
import styles from "./AdminPanel.module.css"
import { voterAPI } from "../../services/VoterService"
import {parentAPI} from "../../services/ParentService";
import { voteAPI } from "../../services/VoteService";
import { Link } from "react-router-dom";

const AdminPanel: FC = () => {
    let { data: teamsData, error, isLoading } = teamAPI.useFetchAllTeamsQuery(5, {
        pollingInterval: 20000
    });
    const [updateTeam, { error: updateError, isLoading: isUpdateLoading }] = teamAPI.useUpdateTeamMutation();
    const { data: voters, isLoading: isVotersLoading} = voterAPI.useFetchAllVotersQuery(5, {
        pollingInterval: 20000
    });
    const { data: parents, isLoading: isParentsLoading} = parentAPI.useFetchAllParentsQuery(5, {
        pollingInterval: 20000
    });
    const {data: votes, isLoading: isVotesLoading} = voteAPI.useFetchAllVotesQuery(5)
    const [updateVote] = voteAPI.useUpdateVoteMutation();

    const [deleteVoter] = voterAPI.useDeleteVoterMutation();
    const [deleteParent] = parentAPI.useDeleteParentMutation();

    const [bill, setBill] = useState<number[]>([]);
    const [labels, setLabels] = useState<string[]>([]);
    const [colors, setColors] = useState<string[]>([]);
    const [src, setSrc] = useState('voters');
    let [teams, setTeams] = useState<ITeam[]>(teamsData as ITeam[]);
    const [remainingTime, setRemainingTime] = useState<number>()

    const sortTeams = () => {
        let newArr: ITeam[] = Object.assign([], teamsData);
        newArr.sort((a, b) => a.form - b.form)
        return newArr
    }

    useLayoutEffect(() => {
        let billArr: number[] = [];
        let labelsArr: string[] = [];
        let colorsArr: string[] = [];
        teams = sortTeams()
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
        setTeams(teams);
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

    const newVotedData = useCallback((team: ITeam, voted: number) => {
        updateTeam({...team, voted})
    }, []);

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
            {isLoading && isParentsLoading && isVotersLoading && isVotesLoading && <h1>Идет загрузка...</h1>}
            {error && <h1>Произошла ошибка</h1>}
            {teams && parents && voters && votes &&
                <div style={{height:'90%', width:'100%'}}>
                    <Chart bill={bill} labels={labels} colors={colors} />
                    <div className={styles.container}>
                    {teams?.map((team: ITeam) => 
                        <img className={styles.team_logo} src={team.image} alt="logo" key={team.name}/>
                    )}
                    {src === 'voters' ? teams?.map((team: ITeam) => 
                        <input type="text" className={styles.team_logo} key={team.name} placeholder={team.voted?.toString()} onKeyPress={(e) => { if(e.key === 'Enter') newVotedData(team, Number(e.currentTarget.value))}}/>
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
                <Link className={styles.submit_button} to='/votersList'>Список голосов</Link>
                <div style={{textAlign: 'center'}}>Проголосовало {src === 'voters' ? voters?.length : parents?.length} {src === 'voters' ? ' учеников' : ' родителей'}</div>
            </div> 
        </StyledBlock>
        
    );
}

export default AdminPanel;
