import React, { FC } from "react";
import { Link } from "react-router-dom";
import { ITeam, IVoter } from "../../types/types";
import styles from "./Cart.module.css"

interface TeamCartProps {
    team: ITeam;
    clue: string;
    voters?: IVoter[];
    push: (voter: IVoter) => void;
    update: (team: ITeam) => void;

}

const TeamCart: FC<TeamCartProps> = ({team, clue, voters, push, update}) => {

    let isAbleToRedirect = false

    const handleUpdate = (event: React.MouseEvent) => {

        //TODO: if for form

        if(voters?.find((item) => {
            if(item.clue === clue) return 1;
        }) ){
            alert(`${clue} is alredy vote`);
        }
        else{
            isAbleToRedirect = true
            push({clue: clue})
            const voted = team.voted ? team.voted + 1 : 1;
            update({...team, voted})
        }
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
            <strong className={styles.member}>Участники:</strong>
            {team.members?.split(",").map((member) =>
                <p className={styles.member} key={member}>{member}</p>
            )}
            </div>
            <button className={styles.submit_button} /*style={{border:'1px solid ' + team.color}}*/ onClick={handleUpdate}>
                <Link to={isAbleToRedirect ? '/vote' : '/teams'}>Голосовать за команду!</Link>
            </button>
        </div>
    );
};

export default TeamCart;