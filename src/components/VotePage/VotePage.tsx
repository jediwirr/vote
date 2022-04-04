import React, { FC, useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { teamAPI } from "../../services/TeamService";
import TeamsList from "../TeamsList/TeamsList";
import TeamIcon from "../TeamIcon/TeamIcon";
import Chart from '../Chart/Chart';
import { ITeam } from "../../types/types";
import { Link } from "react-router-dom";
import styles from "./VotePage.module.css"

const VotePage: FC = () => {
    const { data: teams, error, isLoading } = teamAPI.useFetchAllTeamsQuery(5, {
        pollingInterval: 100000
    });
    const [updateTeam, { error: updateError, isLoading: isUpdateLoading }] = teamAPI.useUpdateTeamMutation();

    const [bill, setBill] = useState<number[]>([]);
    const [labels, setLabels] = useState<string[]>([]);
    const [colors, setColors] = useState<string[]>([]);


    useEffect(() => {
        let billArr: number[] = [];
        let labelsArr: string[] = [];
        let colorsArr: string[] = [];
        teams?.map((team: ITeam) => {
            billArr.push(team.voted ? team.voted : 0);
            labelsArr.push(team.name);
            colorsArr.push(team.color);
        });

        setBill(billArr);
        setLabels(labelsArr);
        setColors(colorsArr);
    }, [teams]);

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
            </div>
            
            
           
            }
            <div style={{marginTop:'25px'}}>
                <Link className={styles.submit_button} to="/teams">Голосовать!</Link>
            </div> 
        </StyledBlock>
        
    );
}

export default VotePage;
