import React, {FC, ReactElement} from "react";
import styles from "./MyModal.module.css"

interface MyModalProps {
    children: ReactElement,
    visible: boolean,
    setVisible: (visible: boolean) => void
}

const MyModal: FC<MyModalProps> = ({children, visible, setVisible}) => {

    const rootStyles = [styles.myModal]

    if(visible) {
        rootStyles.push(styles.active)
    }

    return (<div className={rootStyles.join(' ')} onClick={() => setVisible(false)}>
            <div className={styles.myModalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
    </div>)
}

export default MyModal;