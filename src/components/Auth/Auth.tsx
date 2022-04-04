import React, { FC, useState } from "react";
import classes from './Auth.module.css'
import {useDispatch, useSelector} from 'react-redux';
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

interface AuthProps {
    setClue: (clue: string) => void
}

const Auth: FC<AuthProps> = ({setClue}) => {

    const dispatch = useDispatch();
    const log_in = (students:any, user:any, user_type:any, user_data:any) => dispatch({type: 'LOG_IN', students, user, user_type, user_data});
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    let isAbleToRedirect = false

    // const pushToken = useSelector(state => state.note.pushToken);
    // mHv4Srb30jci4_Ja4ixm_:APA91bE4RJ2m7sFaCY7heZWoS1YMtVk4_Iburj38rGifPinngTOGp75WKY07l4SfMEgrta5-UI4n5jNmnKvYIguggt1B7YJb2fVMNWvuLooDnbbeTj9sIFdTXql6HaxybrCxKptS-0hb

    // const getAuthorized = (data) => {
    //     if (data != null) {
    //         let obj = {
    //             'clue': data.clue,
    //             'user_id': data.user_id
    //         }
    //         log_in(data.student, data.student[0], data.type, obj)
    //         console.log(data.student, data.student[0], data.type, obj)
    //     }
    // };


    // const storeData = async (value) => {
    //     try {
    //         const jsonValue = JSON.stringify(value)
    //         /await AsyncStorage.setItem('@storage_Key', jsonValue)
    //     } catch (e) {
    //         console.log(e)
    //     }
    // };

    // const getData = async () => {
    //     try {
    //         const jsonValue = await AsyncStorage.getItem('@storage_Key')
    //         const data = jsonValue != null ? JSON.parse(jsonValue) : null
    //         getAuthorized(data);
    //     } catch(e) {
    //         console.log(e)
    //     }
    // };

    const sendCredentials = () => {
        fetch(`https://diary.alma-mater-spb.ru/e-journal/api/check_login.php?username=${login}&password=${password}&token=alma831`, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(response => {
            if (response.status === 0 && response.type === 1) {

                console.log(response);
                console.log('TYPE = ', response.type)
                isAbleToRedirect = true
            } else if (login === '' || password === '') {
                alert('Введите логин и пароль');
            } else {
                alert('Вы ввели неверный логин или пароль');
            }
        })
        .catch(error => {
            console.log(error);
            alert('Error')
        });
    };

    return (
        <div className={classes.block}>
            <div className={classes.container}>
                <input type="text" className={classes.login_input} placeholder='Введите логин' value={login} onChange={(e) => setLogin(e.target.value)}></input>
                <input type="password" className={classes.login_input} placeholder='Введите пароль' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <Link className={classes.login_button} onClick={sendCredentials} to={isAbleToRedirect ? '/vote' : '/'} >Вход</Link>
                <Link className={classes.skip_button} to="/vote">Продолжить без регистрации</Link>
            </div>      
        </div>
    );
}

export default Auth;
