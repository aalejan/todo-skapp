import react from 'React'

export const Todo = ({input}) => {

    return(
        <li>
            <label class="list-item-label">
            <span data-list-item-text></span>
            </label>
            <button data-button-delete>Delete</button>
        </li>

    )
}