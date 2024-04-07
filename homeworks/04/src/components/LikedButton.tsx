import { IconContext } from 'react-icons'
import { PiHeartStraightFill } from 'react-icons/pi'

import styles from './styles/HeartButton.module.css'

type LikedButtonProps = {
    clickHandler: () => void
    additionalClasses: string
}

function LikedButton({ clickHandler, additionalClasses }: LikedButtonProps) {
    return (
        <IconContext.Provider
            value={{
                className: `${styles.likedButton} ${additionalClasses} `
            }}>
            <PiHeartStraightFill onClick={clickHandler} />
        </IconContext.Provider>
    )
}

export default LikedButton
