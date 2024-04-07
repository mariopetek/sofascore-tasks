import { forwardRef, MouseEventHandler } from 'react'

type LikedPokemonModalProps = {
    clickHandler: MouseEventHandler<HTMLDialogElement>
}

const LikedPokemonModal = forwardRef<HTMLDialogElement, LikedPokemonModalProps>(
    ({ clickHandler }, ref) => {
        return (
            <dialog ref={ref} onClick={clickHandler}>
                <h2>Liked Pokemon</h2>
                <ul>
                    <li>Pikachu</li>
                    <li>Bulbasaur</li>
                    <li>Charmander</li>
                </ul>
            </dialog>
        )
    }
)

export default LikedPokemonModal
