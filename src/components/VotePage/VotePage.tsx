import React, { FC, useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { teamAPI } from "../../services/TeamService";
import TeamsList from "../TeamsList/TeamsList";
import TeamIcon from "../TeamIcon/TeamIcon";
import Chart from '../Chart/Chart';
import { ITeam, IVoter } from "../../types/types";
import { Link } from "react-router-dom";
import styles from "./VotePage.module.css"
import { voterAPI } from "../../services/VoterService";

const VotePage: FC = () => {
    const { data: teams, error, isLoading } = teamAPI.useFetchAllTeamsQuery(5, {
        pollingInterval: 10000
    });
    const [updateTeam, { error: updateError, isLoading: isUpdateLoading }] = teamAPI.useUpdateTeamMutation();
    const { data: voters} = voterAPI.useFetchAllVotersQuery(5, {
        pollingInterval: 20000
    });

    const [bill, setBill] = useState<number[]>([]);
    const [labels, setLabels] = useState<string[]>([]);
    const [colors, setColors] = useState<string[]>([]);


    useEffect(() => {
        let billArr: number[] = [];
        let labelsArr: string[] = [];
        let colorsArr: string[] = [];
        teams?.map((team: ITeam) => {
            let voted = team.voted ? team.voted : 0;
            voters?.forEach((voter:IVoter) => {
                if(voter.choice === team.name) voted++;
            })
            billArr.push(voted);
            labelsArr.push(team.name);
            colorsArr.push(team.color);
        });

        setBill(billArr);
        setLabels(labelsArr);
        setColors(colorsArr);
    }, [teams, voters]);

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

    return (
        <StyledBlock>
            {isLoading && <h1>Идет загрузка...</h1>}
            {error && <h1>Произошла ошибка</h1>}
            {teams &&
            // <TeamsList
            //     items={teams}
            //     renderItems={item =>
            //         <TeamIcon key={item.name} team={item} update={handleUpdate} />
            //     }
            // />
            <div style={{height:'90%', width:'100%'}}>
                <Chart bill={bill} labels={labels} colors={colors} />
                <div className={styles.container}>
                {teams?.map((team: ITeam) => 
                    <img className={styles.team_logo} src={team.image} alt="logo"/>
                )}
                {teams?.map((team: ITeam) => 
                    <input type="text" className={styles.team_logo} value={team.voted} onChange={e => newVotedData(team, Number(e.target.value))}/>
                )
                }
            </div>
            </div>
            }

            <div style={{marginTop:'7%'}}>
                <button className={styles.submit_button}>Начать голосование!</button>
            </div> 
        </StyledBlock>
        
    );
}

export default VotePage;
