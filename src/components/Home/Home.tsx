import React, { FC } from "react";
import TeamCart from "../../components/TeamCart/TeamCart";
import { teams } from "../../data/teams";
import { ITeam } from "../../types/types";
import styles from "./Home.module.css"

const Home: FC = () => {

    return (
        <div className={styles.home}>
            {teams.map((team: ITeam) => 
                <TeamCart key={team.name} team={team} />  
            )}
        </div>
    )
}

export default Home;
