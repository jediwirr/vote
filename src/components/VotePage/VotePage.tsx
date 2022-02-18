import React, { FC } from "react";
import styled from "@emotion/styled";
import { teamAPI } from "../../services/TeamService";
import TeamsList from "../TeamsList/TeamsList";
import TeamIcon from "../TeamIcon/TeamIcon";
import Chart from '../Chart/Chart';
import { ITeam } from "../../types/types";

const VotePage: FC = () => {
    const { data: teams, error, isLoading } = teamAPI.useFetchAllTeamsQuery(5, {
        // pollingInterval: 1000
    });
    const [updateTeam, { error: updateError, isLoading: isUpdateLoading }] = teamAPI.useUpdateTeamMutation();

    const StyledBlock = styled.div`
        display: flex;
        flex-direction: row;
        
        width: 100%;
    `;

    const handleUpdate = (team: ITeam) => {
        updateTeam(team);
    };

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
            <Chart />
        </StyledBlock>
    );
}

export default VotePage;
