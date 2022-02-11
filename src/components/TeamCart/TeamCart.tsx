import React, { FC } from "react";
import { IMember, ITeam } from "../../types/types";
import styles from "./Cart.module.css"

interface TeamCartProps {
    team: ITeam;
}

const TeamCart: FC<TeamCartProps> = ({team}) => {

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
            {team.members?.map((member: IMember) =>
                <p>{member.name}</p>
            )}
            </div>
        </div>
    );
};

export default TeamCart;
