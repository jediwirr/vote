import React from "react";
import styles from "./Main.module.css"
import { BsFillPeopleFill, BsPersonFill, BsGearFill } from "react-icons/bs";
import { Link } from "react-router-dom";


const Main = () => {


    return (
        <div className={styles.container}>
            <div className={styles.block}>
                <Link className={styles.post} to="/auth">
                    <BsPersonFill size="6em"/>
                    <h2>Ученик</h2>
                </Link>
                <Link className={styles.post} to="/auth">
                    <BsFillPeopleFill size="6em"/>
                    <h2>Родитель</h2>
                </Link>
                <Link className={styles.post} to="/stats">
                    <BsGearFill size="6em"/>
                    <h2>Организатор</h2>
                </Link>
            </div>
        </div>
    )
}

export default Main;