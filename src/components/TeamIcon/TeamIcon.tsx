import React, { FC } from "react";
import { ITeam } from "../../types/types";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

interface TeamIconProps {
    team: ITeam;
    voted?: number;
}

const TeamIcon: FC<TeamIconProps> = ({team, voted}) => {
    const StyledBlock = styled.div`
        display: flex;
        flex-direction: row;
        height: 80px;
        margin: 5px;
    `;

    return (
        <StyledBlock>
            <img src={team.image} alt="team-logo" css={css`
                width: 30%;
                max-height: 100%;
            `} />
            <p css={css`
                display: flex;
                align-items: center;
                font-size: 20px;
            `}>
                {team.name}
            </p>
        </StyledBlock>
    );
}

export default TeamIcon;
