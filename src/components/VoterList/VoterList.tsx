import React, {useEffect, useState} from "react";
import styles from './VoterList.module.css'
import { voterAPI } from "../../services/VoterService"
import { parentAPI } from "../../services/ParentService";
import { voteAPI } from "../../services/VoteService";
import { IParent, IVote } from "../../types/types";
import { IVoter } from "../../types/types";

const VoterList = () => {
    let { data: votersData} = voterAPI.useFetchAllVotersQuery(5);
    let { data: parentsData} = parentAPI.useFetchAllParentsQuery(5);
    const {data: votes, isLoading} = voteAPI.useFetchAllVotesQuery(5);
    const [src, setSrc] = useState('voters');
    const [voters, setVoters] = useState(votersData)
    const [parents, setParents] = useState(parentsData)

    const checkVote = (voter: IVoter | IParent) => {
        if((votes as IVote[])[0].start != null && voter.voted >= ((votes as IVote[])[0].start as string) && voter.voted <= ((votes as IVote[])[0].finish as string)) return true
        return false
    }

    useEffect(() => {
        setVoters(sortVoters())
        setParents(sortParents())
    }, [])

    const sortVoters = () => {
        let newArr : IVoter[] = Object.assign([], voters);
        newArr.sort((a, b) => a.form - b.form)
        return newArr
    }

    const sortParents = () => {
        let newArr : IParent[] = Object.assign([], parents);
        newArr.sort((a, b) => Number(a.choice > b.choice))
        return newArr
    }
    

    return(
        <div className={styles.container}>
            {isLoading ? <div>Загрузка...</div> : <div className={styles.container}>
                <div style={{marginTop: '1vh'}}>Список проголосовавших:</div>
                <div style={{marginTop: '1vh'}}>
                    <button color={src === 'voters' ? 'white' : 'teal'} className={styles.submit_button} onClick={() => {setSrc('voters');}}>Ученики</button>
                    <button className={styles.submit_button} onClick={() => {setSrc('parents');}}>Родители</button>
                </div>
                    <table>
                        <thead>
                            <tr>
                            <th>ID</th>
                            <th>Имя</th>
                            <th>Фамилия</th>
                            {src === 'voters' && <th>Класс</th>}
                            <th>Выбор</th>
                            <th>Учтен</th>
                            </tr>
                        </thead>
                        <tbody>
                            {src === 'voters' ? voters?.map((voter) => <tr>
                                <td>{voter.user_id}</td>
                                <td>{voter.name}</td>
                                <td>{voter.surname}</td>
                                <td>{voter.form}</td>
                                <td>{voter.choice}</td>
                                <td>{checkVote(voter) ? 'Да' : 'Нет'}</td>
                            </tr>) : parents?.map((parent) => <tr>
                                <td>{parent.user_id}</td>
                                <td>{parent.name}</td>
                                <td>{parent.surname}</td>
                                <td>{parent.choice}</td>
                                <td>{checkVote(parent) ? 'Да' : 'Нет'}</td>
                            </tr>)}
                            
                        </tbody>
                    </table>
                </div>}
        </div>
    )
}

export default VoterList;