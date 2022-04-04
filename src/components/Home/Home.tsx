import React, { FC, useEffect } from "react";
import TeamCart from "../../components/TeamCart/TeamCart";
import { teamAPI } from "../../services/TeamService";
import { voterAPI } from "../../services/VoterService";
import { ITeam, IVoter } from "../../types/types";
import styles from "./Home.module.css";

const Home: FC = () => {
    const { data: teams, error, isLoading, refetch } = teamAPI.useFetchAllTeamsQuery(5);
    const [updateTeam, { error: updateError, isLoading: isUpdateLoading }] = teamAPI.useUpdateTeamMutation();
    const { data: voters } = voterAPI.useFetchAllVotersQuery(5);
    const [ pushVoter ] = voterAPI.usePushVoterMutation();

    useEffect(() => {
        console.log(teams);
        console.log(voters);
    }, [teams]);

    const handleUpdate = (team: ITeam) => {
        updateTeam(team);
    };

    const handlePush = (voter: IVoter) => {
        pushVoter(voter);
    };

    return (
        <div className={styles.home}>
            {isLoading && <h1>Идет загрузка...</h1>}
            {error && <h1>Произошла ошибка</h1>}
            {teams?.map((team: ITeam) => 
                <TeamCart update={handleUpdate} voters={voters} push={handlePush} key={team.name} clue= {'test1'} team={team} />  
            )}
        </div>
    )
}

export default Home;
