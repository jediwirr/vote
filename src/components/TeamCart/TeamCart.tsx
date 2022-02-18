import React, { FC } from "react";
import { ITeam } from "../../types/types";
import styles from "./Cart.module.css"

interface TeamCartProps {
    team: ITeam;
    update: (team: ITeam) => void;
}

const TeamCart: FC<TeamCartProps> = ({team, update}) => {

    const handleUpdate = (event: React.MouseEvent) => {
        const voted = team.voted ? team.voted + 1 : 1;
        update({...team, voted})
    };

    return (
        <div className={styles.cart}>
            <h2>{team.name}</h2>
            <div className={styles.logo}>
                <img src={team.image} alt="logo" />
            </div>
            
            <div>
                <strong>Капитан: </strong>
                <span>{team.leader}</span>
            </div>

            <div className={styles.list}>
            <strong>Участники:</strong>
            {team.members?.split(",").map((member) =>
                <p key={member}>{member}</p>
            )}
            </div>
            <button onClick={handleUpdate}>Vote!</button>
        </div>
    );
};

export default TeamCart;