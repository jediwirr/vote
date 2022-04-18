import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import { IParent, ITeam, IVoter } from "../../types/types";
import MyModal from "../MyModal/MyModal";
import styles from "./Cart.module.css"
import { BsInfoCircleFill } from "react-icons/bs";

interface ParentTeamCartProps {
    team: ITeam;
    parent: IParent,
    parents?: IParent[];
    push: (parent: IParent) => void;
    update: (team: ITeam) => void;

}

const ParentTeamCart: FC<ParentTeamCartProps> = ({team, parent, parents, push, update}) => {

    let isAbleToRedirect = false
    const [visible, setVisible] = useState(false)

    const handleUpdate = (event: React.MouseEvent) => {
        if(parents?.find((item) => {
            if(item.user_id === parent.user_id) return 1;
        }) ){
            alert(`${parent.name} ${parent.surname} уже проголосовал(а)`);
        }
        else {
            isAbleToRedirect = true
            push({...parent, choice: team.name})
            //const voted = team.voted ? team.voted + 1 : 1;
            // update({...team, voted})
        }
    };

    return (
        <div className={styles.cart}>
            <h2>{team.name}</h2>
            <div className={styles.logo}>
                <img src={team.image} alt={`${team.name} logo`}/>
            </div>
            {parent.user_id !== 'null' && <button className={styles.submit_button} /*style={{border:'1px solid ' + team.color}}*/ onClick={handleUpdate}>
                <Link to={isAbleToRedirect ? '/vote' : '/teams'}>Голосовать за команду!</Link>
            </button>}
            <div>
                <strong>Капитан: </strong>
                <span>{team.leader}</span>
            </div>
            <div className={styles.squad_container} onClick={() => {setVisible(!visible);}} >
                <strong style={{marginRight:'10px'}} >Команда {team.form === 12 ? 'экстерната' :  `${team.form} класса`}</strong>
                <BsInfoCircleFill/>
            </div>
            <MyModal visible={visible} setVisible={setVisible}>
                <div>
                    <h3>Состав команды:</h3>
                    <h3 style={{whiteSpace: 'pre-line'}}>{team.members}</h3>
                </div>
            </MyModal>
        </div>
    );
};

export default ParentTeamCart;