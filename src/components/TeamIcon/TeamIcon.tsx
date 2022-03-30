import React, { FC } from "react";
import { ITeam } from "../../types/types";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

interface TeamIconProps {
    team: ITeam;
    update: (team: ITeam) => void;
}

const TeamIcon: FC<TeamIconProps> = ({team, update}) => {
    const vote = 15;

    const StyledBlock = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 80px;
        margin: 5px;
        width: 100%;
    `;

    const Container = styled.div`
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
    `;

    const BillLine = styled.div`
        width: 25px;
        height: ${team.voted ? team.voted * vote : team.voted}px;
        background-color: ${team.color};
        margin-bottom: 30px;
        transition: height 2s ease;
    `;

    const handleUpdate = (event: React.MouseEvent) => {
        const voted = team.voted ? team.voted + 1 : 1;
        update({...team, voted})
    };

    return (
        <Container>
            {/* <BillLine /> */}
            <StyledBlock>
                <img src={team.image} alt="team-logo" css={css`
                    width: 100%;
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
                {/* <button onClick={handleUpdate}>Vote!</button> */}
            </StyledBlock>
        </Container>
    );
}

export default React.memo(TeamIcon);
