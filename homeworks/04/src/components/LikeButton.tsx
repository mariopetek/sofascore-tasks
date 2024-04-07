import { PiHeartStraightLight } from 'react-icons/pi'
import { IconContext } from 'react-icons'

import styles from './styles/LikeButton.module.css'

type LikeButtonProps = {
    clickHandler: () => void
}

function LikeButton({ clickHandler }: LikeButtonProps) {
    return (
        <IconContext.Provider value={{ className: styles.heartIcon }}>
            <PiHeartStraightLight onClick={clickHandler} />
        </IconContext.Provider>
    )
}

export default LikeButton
