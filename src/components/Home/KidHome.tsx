import React, { FC, useEffect } from "react";
import TeamCart from "../TeamCart/TeamCart";
import { teamAPI } from "../../services/TeamService";
import { voterAPI } from "../../services/VoterService";
import { ITeam, IVoter } from "../../types/types";
import styles from "./Home.module.css";

interface KidHomeProps {
    voter: IVoter
}

const KidHome: FC<KidHomeProps> = ({voter}) => {
    const { data: teams, error, isLoading, refetch } = teamAPI.useFetchAllTeamsQuery(5);
    const [updateTeam, { error: updateError, isLoading: isUpdateLoading }] = teamAPI.useUpdateTeamMutation();
    const { data: voters} = voterAPI.useFetchAllVotersQuery(5, {
        pollingInterval: 100
    });
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

    const isVoted = () => {
        if(voters?.find((item) => {if(item.user_id === voter.user_id) return 1;}) !== null) return true;
        return false;
    }

    useEffect(() => {
        isVoted()
    }, [voter])


    return (
        <div className={styles.home}>
            {isVoted() && <div>
                {isLoading && <h1>Идет загрузка...</h1>}
                {error && <h1>Произошла ошибка</h1>}
                {teams?.filter(team => team.form !== voter.form).map((team: ITeam) => 
                <TeamCart update={handleUpdate} voters={voters} push={handlePush} voter={voter} key={team.name} team={team} />
                )}

            </div>}
            
        </div>  
    )
}

export default KidHome;
