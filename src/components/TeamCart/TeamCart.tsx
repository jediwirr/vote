import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import { ITeam, IVoter } from "../../types/types";
import MyModal from "../MyModal/MyModal";
import styles from "./Cart.module.css"

interface TeamCartProps {
    team: ITeam;
    voter: IVoter,
    voters?: IVoter[];
    push: (voter: IVoter) => void;
    update: (team: ITeam) => void;

}

const TeamCart: FC<TeamCartProps> = ({team, voter, voters, push, update}) => {

    let isAbleToRedirect = false
    const [visible, setVisible] = useState(false)

    const handleUpdate = (event: React.MouseEvent) => {
        if(voters?.find((item) => {
            if(item.user_id === voter.user_id) return 1;
        }) ){
            alert(`${voter.name} ${voter.surname} уже проголосовал(а)`);
        }
        else if (voter.form === team.form) {
            alert('Вы не можете голосовать за свою параллель');
        }
        else {
            isAbleToRedirect = true
            push({...voter, choice: team.name})
            const voted = team.voted ? team.voted + 1 : 1;
            update({...team, voted})
        }
    };

    return (
        <div className={styles.cart}>
            <h2>{team.name}</h2>
            <div className={styles.logo}>
                <img src={team.image} alt="logo" onClick={() => {setVisible(!visible);}} />
            </div>
            
            <MyModal visible={visible} setVisible={setVisible}>
                <div>
                    <h3>Состав команды:</h3>
                    <h3 style={{whiteSpace: 'pre-line'}}>{team.members}</h3>
                </div>
            </MyModal>
            {voter.user_id !== 'null' && <button className={styles.submit_button} /*style={{border:'1px solid ' + team.color}}*/ onClick={handleUpdate}>
                <Link to={isAbleToRedirect ? '/vote' : '/teams'}>Голосовать за команду!</Link>
            </button>}
            <div>
                <strong>Капитан: </strong>
                <span>{team.leader}</span>
            </div>

            <div style={{marginTop:'15px'}}>
                <strong>Команда {team.form === 12 ? 'экстерната' :  `${team.form} класса`}</strong>
            </div>
        </div>
    );
};

export default TeamCart;