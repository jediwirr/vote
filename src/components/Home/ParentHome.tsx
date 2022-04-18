import React, { FC, useEffect } from "react";
import TeamCart from "../TeamCart/TeamCart";
import { teamAPI } from "../../services/TeamService";
import { voterAPI } from "../../services/VoterService";
import { IParent, ITeam } from "../../types/types";
import styles from "./Home.module.css";
import { parentAPI } from "../../services/ParentService";
import ParentTeamCart from "../TeamCart/ParentTeamCart";

interface ParentHomeProps {
    parent: IParent
}

const ParentHome: FC<ParentHomeProps> = ({parent}) => {
    const { data: teams, error, isLoading, refetch } = teamAPI.useFetchAllTeamsQuery(5);
    const [updateTeam, { error: updateError, isLoading: isUpdateLoading }] = teamAPI.useUpdateTeamMutation();
    const { data: parents} = parentAPI.useFetchAllParentsQuery(5, {
        pollingInterval: 100
    });
    const [ pushParent ] = parentAPI.usePushParentMutation();

    useEffect(() => {
        console.log(teams);
        console.log(parents);
    }, [teams]);

    const handleUpdate = (team: ITeam) => {
        updateTeam(team);
    };

    const handlePush = (parent: IParent) => {
        pushParent(parent);
    };

    const isVoted = () => {
        if(parents?.find((item) => {if(item.user_id === parent.user_id) return 1;}) !== null) return true;
        return false;
    }


    return (
        <div className={styles.home}>
            {isVoted() && <div>
                {isLoading && <h1>Идет загрузка...</h1>}
                {error && <h1>Произошла ошибка</h1>}
                {teams?.map((team: ITeam) => 
                <ParentTeamCart update={handleUpdate} parents={parents} push={handlePush} parent={parent} key={team.name} team={team} />
                )}

            </div>}
            
        </div>  
    )
}

export default ParentHome;
