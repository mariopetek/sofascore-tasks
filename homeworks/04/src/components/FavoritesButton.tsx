import { PiHeartStraightLight } from 'react-icons/pi'
import { IconContext } from 'react-icons'

import styles from './styles/FavoritesButton.module.css'

type FavoritesButtonProps = {
    clickHandler: React.MouseEventHandler<SVGElement>
}

function FavoritesButton({ clickHandler }: FavoritesButtonProps) {
    return (
        <IconContext.Provider value={{ className: styles.heartIcon }}>
            <PiHeartStraightLight onClick={clickHandler} />
        </IconContext.Provider>
    )
}

export default FavoritesButton
