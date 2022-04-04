import React, { FC, useState } from "react";
import classes from './Auth.module.css'
import {useDispatch, useSelector} from 'react-redux';
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

interface AuthProps {
    setId: (id: string) => void
}

const Auth: FC<AuthProps> = ({setId}) => {

    const dispatch = useDispatch();
    const log_in = (students:any, user:any, user_type:any, user_data:any) => dispatch({type: 'LOG_IN', students, user, user_type, user_data});
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [isAbleToRedirect, setIsAbleToRedirect] = useState(false)

    const sendCredentials = () => {
        fetch(`https://diary.alma-mater-spb.ru/e-journal/api/check_login_js.php?username=${login}&password=${password}&token=alma831`, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(response => {
            if (response.status === 0 && response.type === 1) {
                console.log(response);
                setIsAbleToRedirect(true)
                console.log(isAbleToRedirect)
            } else if (login === '' || password === '') {
                alert('Введите логин и пароль');
            } else if (response.status === 0 && response.type !== 1) {
                alert('Вы не можете принять участие в голосовании')
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

    return (
        <div className={classes.block}>
            <div className={classes.container}>
                <input type="text" className={classes.login_input} placeholder='Введите логин' value={login} onChange={(e) => setLogin(e.target.value)}></input>
                <input type="password" className={classes.login_input} placeholder='Введите пароль' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <div className={classes.login_button} onClick={sendCredentials}>
                    <Link to={isAbleToRedirect ? '/vote' : '/'} >Вход</Link>
                </div>
                <Link className={classes.skip_button} to="/vote">Продолжить без регистрации</Link>
            </div>      
        </div>
    );
}

export default Auth;
