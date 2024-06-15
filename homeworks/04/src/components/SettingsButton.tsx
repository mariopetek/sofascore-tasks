import { IconContext } from 'react-icons'
import { PiGearLight } from 'react-icons/pi'

import styles from './styles/SettingsButton.module.css'

type SettingsButtonProps = {
    clickHandler: React.MouseEventHandler<SVGElement>
}

function SettingsButton({ clickHandler }: SettingsButtonProps) {
    return (
        <IconContext.Provider value={{ className: styles.gearIcon }}>
            <PiGearLight onClick={clickHandler} />
        </IconContext.Provider>
    )
}

export default SettingsButton
