import React, { FC } from "react";
import { ITeam } from "../../types/types";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

interface TeamIconProps {
    team: ITeam;
    update: (team: ITeam) => void;
}

const TeamIcon: FC<TeamIconProps> = ({team, update}) => {
    const StyledBlock = styled.div`
        display: flex;
        flex-direction: row;
        height: 80px;
        margin: 5px;
    `;

    const handleUpdate = (event: React.MouseEvent) => {
        const voted = team.voted ? team.voted + 1 : 1;
        update({...team, voted})
    };

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
            <p css={css`
                display: flex;
                align-items: center;
                font-size: 20px;
                margin: 0 5px;
                font-weight: bold;
            `}>
                ({team.voted})
            </p>
            <button onClick={handleUpdate}>Vote!</button>
        </StyledBlock>
    );
}

export default TeamIcon;
