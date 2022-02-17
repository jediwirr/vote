import React, { FC } from "react";
import styled from "@emotion/styled";

interface VotePageProps {
    children: React.ReactNode
}

const VotePage: FC<VotePageProps> = ({children}) => {
    const StyledBlock = styled.div`
        display: flex;
        flex-direction: row;
        
        width: 100%;
    `;

    return (
        <StyledBlock>
            {children}
        </StyledBlock>
    );
}

export default VotePage;
