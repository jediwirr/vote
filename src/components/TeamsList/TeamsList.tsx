import React, { FC } from "react";
import { ITeam } from "../../types/types";
import styled from "@emotion/styled";

interface TeamsListProps {
    items: ITeam[];
    renderItems: (item: ITeam) => React.ReactNode;
}

const TeamsList: FC<TeamsListProps> = ({items, renderItems}) => {
    const StyledBlock = styled.div`
        display: flex;
        flex-direction: column;
        width: 30%;
    `;
    

    return (
        <StyledBlock>
            {items.map(renderItems)}
        </StyledBlock>
    );
}

export default TeamsList;
