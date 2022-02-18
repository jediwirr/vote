import React, { FC } from "react";
import TeamCart from "../../components/TeamCart/TeamCart";
import { teamAPI } from "../../services/TeamService";
// import { teams } from "../../data/teams";
import { ITeam } from "../../types/types";
import styles from "./Home.module.css"

const Home: FC = () => {
    const { data: teams, error, isLoading, refetch } = teamAPI.useFetchAllTeamsQuery(5);

    return (
        <div className={styles.home}>
            {isLoading && <h1>Идет загрузка...</h1>}
            {error && <h1>Произошла ошибка</h1>}
            {teams?.map((team: ITeam) => 
                <TeamCart key={team.name} team={team} />  
            )}
        </div>
    )
}

export default Home;
