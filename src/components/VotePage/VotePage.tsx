import React, { FC, useCallback, useEffect, useLayoutEffect, useState } from "react";
import styled from "@emotion/styled";
import { teamAPI } from "../../services/TeamService";
import Chart from '../Chart/Chart';
import { IParent, ITeam, IVote, IVoter } from "../../types/types";
import styles from "./VotePage.module.css"
import { voterAPI } from "../../services/VoterService"
import {parentAPI} from "../../services/ParentService";
import { voteAPI } from "../../services/VoteService";
import { Link } from "react-router-dom";

const VotePage: FC = () => {
    let { data: teamsData, error, isLoading } = teamAPI.useFetchAllTeamsQuery(5, {
        pollingInterval: 10000
    });
    const [updateTeam, { error: updateError, isLoading: isUpdateLoading }] = teamAPI.useUpdateTeamMutation();
    const { data: voters, isLoading: isVotersLoading} = voterAPI.useFetchAllVotersQuery(5, {
        pollingInterval: 20000
    });
    const { data: parents, isLoading: isParentsLoading} = parentAPI.useFetchAllParentsQuery(5, {
        pollingInterval: 20000
    });
    const {data: votes, isLoading: isVotesLoading} = voteAPI.useFetchAllVotesQuery(5, {
        pollingInterval: 10000
    });
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

    const filterVoters = (seconds: number) => {
        let newArr: IVoter[] = Object.assign([], voters);
        const minTime = Date.parse((votes as IVote[])[0].start as string);
        const maxTime = minTime + seconds * 1000;
        newArr = newArr.filter((voter) => {
            const votedTime = Date.parse(voter.voted);
            console.log(votedTime)
            if(votedTime >= minTime && votedTime <= maxTime) return true;
            return false;
        })
        console.log(newArr);
        return newArr;
    }

    useEffect(()=>{
        let myInterval = setInterval(() => {
            const voteFinish = ((votes as IVote[])[0].finish !== null ? Date.parse((votes as IVote[])[0].finish as string) : 12312312)
            let curTime = new Date()
            setRemainingTime(Math.trunc((voteFinish - Date.parse(curTime.toISOString())) / 1000))
            }, 1000)
            return ()=> {
                clearInterval(myInterval);
              };
        });

    useEffect(() => {
        let billArr: number[] = [];
        let labelsArr: string[] = [];
        let colorsArr: string[] = [];
        teams = sortTeams()
        teams?.map((team: ITeam) => {
            let voted = 0
            if(src === 'voters'){
                voted = team.voted ? team.voted : 0;
                voters?.forEach((voter:IVoter) => {
                    if(voter.choice === team.name && (votes as IVote[])[0].start !== null && voter.voted >= ((votes as IVote[])[0].start as string) && voter.voted <= ((votes as IVote[])[0].finish as string)) voted++;
                })
            }
            else if(src === 'parents') {
                parents?.forEach((parent:IParent) => {
                    if(parent.choice === team.name) voted++;
                })
            }
            else if(src === 'oneMin') {
                voted = 0
                const temp = filterVoters(60);
                temp.forEach((voter:IVoter) => {
                    if(voter.choice === team.name) voted++;
                })
            }
            else if(src === 'twoMin') {
                const temp = filterVoters(120);
                temp.forEach((voter:IVoter) => {
                    if(voter.choice === team.name) voted++;
                })
            }
            else if(src === 'threeMin') {
                const temp = filterVoters(180);
                temp.forEach((voter:IVoter) => {
                    if(voter.choice === team.name) voted++;
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
            {isLoading && isParentsLoading && isVotersLoading && isVotesLoading && <h1>???????? ????????????????...</h1>}
            {error && <h1>?????????????????? ????????????</h1>}
            {teams && parents && voters && votes &&
                <div style={{height:'90%', width:'100%'}}>
                    <Chart bill={bill} labels={labels} colors={colors} />
                    <div className={styles.container}>
                    {teams?.map((team: ITeam) => 
                        <img className={styles.team_logo} src={team.image} alt="logo"/>
                    )}
                    </div>
                </div>
            }
            <div style={{marginTop: '7%'}}>
                <button className={src === 'voters' ? styles.submit_button : styles.passive_button} onClick={() => {setSrc('voters')}}>??????????????</button>
                <button className={src === 'parents' ? styles.submit_button : styles.passive_button} onClick={() => {setSrc('parents');}}>????????????????</button>
                <button className={src === 'oneMin' ? styles.submit_button : styles.passive_button} onClick={() => {setSrc('oneMin');}}>1 ????????????</button>
                <button className={src === 'twoMin' ? styles.submit_button : styles.passive_button} onClick={() => {setSrc('twoMin');}}>2 ????????????</button>
                <button className={src === 'threeMin' ? styles.submit_button : styles.passive_button} onClick={() => {setSrc('threeMin');}}>3 ????????????</button>
            </div>
            {votes && (remainingTime as number) > 0 ? <div className={styles.label}>???? ?????????? ?????????????????????? {remainingTime} ???????????? </div> : <div className={styles.label}>?????????????????????? ??????????????????????</div>}
        </StyledBlock>
        
    );
}

export default VotePage;
