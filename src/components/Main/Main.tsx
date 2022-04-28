import React from "react";
import styles from "./Main.module.css"
import { BsFillPeopleFill, BsPersonFill, BsGearFill, BsEyeFill } from "react-icons/bs";
import { Link } from "react-router-dom";


const Main = () => {


    return (
        <div className={styles.container}>
            <div className={styles.block}>
                <Link className={styles.post} to="/kidAuth">
                    <BsPersonFill size="6em"/>
                    <h2>Ученик</h2>
                </Link>
                <Link className={styles.post} to="/parentAuth">
                    <BsFillPeopleFill size="6em"/>
                    <h2>Родитель</h2>
                </Link>
                <Link className={styles.post} to="/stats">
                    <BsEyeFill size="6em"/>
                    <h2>Ведущий</h2>
                </Link>
                {/* <Link className={styles.post} to="/admin">
                    <BsGearFill size="6em"/>
                    <h2>Организатор</h2>
                </Link> */}
            </div>
        </div>
    )
}

export default Main;