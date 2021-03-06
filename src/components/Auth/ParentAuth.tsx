import React, { FC, useState } from "react";
import classes from '././Auth.module.css'
import {useDispatch, useSelector} from 'react-redux';
import { Link } from "react-router-dom";
import { IParent } from "../../types/types";

interface ParentAuthProps {
    setParent: (parent: IParent) => void
}

const ParentAuth: FC<ParentAuthProps> = ({setParent}) => {

    const dispatch = useDispatch();
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [isAbleToRedirect, setIsAbleToRedirect] = useState(false)

    const sendCredentials = () => {
        fetch(`https://diary.alma-mater-spb.ru/e-journal/api/check_login_js.php?username=${login}&password=${password}&token=alma831`, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(response => {
            if (response.status === 0 && response.type === 2 ) {
                console.log(response);
                setIsAbleToRedirect(true);
                setParent({
                    pk: 0,
                    clue: response.clue,
                    user_id: response.user_id,
                    name: response.student[0].name,
                    surname: response.student[0].surname,
                    choice: '',
                    voted: ''
                })
                console.log(isAbleToRedirect)
            } else if (login === '' || password === '') {
                alert('Введите логин и пароль');
            } else if (response.status === 0 && response.type !== 2) {
                alert('Воспользуйтесь другой опцией входа')
            }
            else {
                alert('Вы ввели неверный логин или пароль');
            }
        })
        .catch(error => {
            console.log(error);
            alert('Что-то пошло не так...')
        });
    };

    // const setEmptyVoter = () => {
    //     setVoter({
    //         clue: '',
    //         user_id: 'null',
    //         form: 0,
    //         name: '',
    //         surname: '',
    //         choice: ''
    //     })
    // }

    return (
        <div className={classes.block}>
            <div className={classes.container}>
                <input type="text" className={classes.login_input} placeholder='Введите логин' value={login} onChange={(e) => setLogin(e.target.value)}></input>
                <input type="password" className={classes.login_input} placeholder='Введите пароль' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <div className={classes.login_button} onClick={sendCredentials}>
                    <Link to={isAbleToRedirect ? '/parentVote' : '/parentAuth'}>Вход</Link>
                </div>
                {/* <Link className={classes.skip_button} onClick={setEmptyVoter} to="/teams">Продолжить без авторизации</Link> */}
            </div>      
        </div>
    );
}

export default ParentAuth;
