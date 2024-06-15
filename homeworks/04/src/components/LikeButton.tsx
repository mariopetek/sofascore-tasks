import { IconContext } from 'react-icons'
import { PiHeartStraightLight } from 'react-icons/pi'

import styles from './styles/HeartButton.module.css'

type LikeButtonProps = {
    clickHandler: React.MouseEventHandler<SVGElement>
    additionalClasses: string
}

function LikeButton({ clickHandler, additionalClasses }: LikeButtonProps) {
    return (
        <IconContext.Provider
            value={{
                className: `${styles.likeButton} ${additionalClasses} `
            }}>
            <PiHeartStraightLight onClick={clickHandler} />
        </IconContext.Provider>
    )
}

export default LikeButton
