import React, { FC, useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { teamAPI } from "../../services/TeamService";
import TeamsList from "../TeamsList/TeamsList";
import TeamIcon from "../TeamIcon/TeamIcon";
import Chart from '../Chart/Chart';
import { ITeam } from "../../types/types";
import { Link } from "react-router-dom";

const VotePage: FC = () => {
    const { data: teams, error, isLoading } = teamAPI.useFetchAllTeamsQuery(5, {
        pollingInterval: 5000
    });
    const [updateTeam, { error: updateError, isLoading: isUpdateLoading }] = teamAPI.useUpdateTeamMutation();

    // const [bill, setBill] = useState<number[]>([]);
    // const [labels, setLabels] = useState<string[]>([]);
    // const [colors, setColors] = useState<string[]>([]);

    // useEffect(() => {
    //     let billArr: number[] = [];
    //     let labelsArr: string[] = [];
    //     let colorsArr: string[] = [];
    //     teams?.map((team: ITeam) => {
    //         billArr.push(team.voted ? team.voted : 0);
    //         labelsArr.push(team.name);
    //         colorsArr.push(team.color);
    //     });

    //     setBill(billArr);
    //     setLabels(labelsArr);
    //     setColors(colorsArr);
    // }, [teams]);

    const StyledBlock = styled.div`
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        margin: 0 0 0 auto;
    `;

    const handleUpdate = useCallback((team: ITeam) => {
        updateTeam(team);
    }, []);

    return (
        <StyledBlock>
            {isLoading && <h1>Идет загрузка...</h1>}
            {error && <h1>Произошла ошибка</h1>}
            {teams &&
            <TeamsList
                items={teams}
                renderItems={item =>
                    <TeamIcon key={item.name} team={item} update={handleUpdate} />
                }
            />
            }
            {/* <Chart bill={bill} labels={labels} colors={colors} /> */}
            {/* <div>
                <Link to="/teams">Голосовать!</Link>
            </div> */}
        </StyledBlock>
    );
}

export default VotePage;
