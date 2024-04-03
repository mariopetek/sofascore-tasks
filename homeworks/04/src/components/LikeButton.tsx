import { PiHeartStraightLight } from 'react-icons/pi'
import { IconContext } from 'react-icons'

import styles from './styles/LikeButton.module.css'

function LikeButton() {
    return (
        <IconContext.Provider value={{ className: styles.heartIcon }}>
            <PiHeartStraightLight />
        </IconContext.Provider>
    )
}

export default LikeButton
