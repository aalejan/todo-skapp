

const LogoutButton = ({handleMySkyLogout, loggedIn}) => {

    return (
        <button disabled={!loggedIn ? true : false} onClick={handleMySkyLogout}>
            Logout 
        </button>
    )
}



export default LogoutButton