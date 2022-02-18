import React, { FC } from "react";
import styled from "@emotion/styled";
import { teamAPI } from "../../services/TeamService";
import TeamsList from "../TeamsList/TeamsList";
import TeamIcon from "../TeamIcon/TeamIcon";
import Chart from '../Chart/Chart';

const VotePage: FC = () => {
    const { data: teams, error, isLoading } = teamAPI.useFetchAllTeamsQuery(5, {
        // pollingInterval: 10000
    });

    const StyledBlock = styled.div`
        display: flex;
        flex-direction: row;
        
        width: 100%;
    `;

    return (
        <StyledBlock>
            {isLoading && <h1>Идет загрузка...</h1>}
            {error && <h1>Произошла ошибка</h1>}
            {teams &&
            <TeamsList
                items={teams}
                renderItems={item =>
                <TeamIcon key={item.name} team={item} voted={0} />
                }
            />
            }
            <Chart />
        </StyledBlock>
    );
}

export default VotePage;
