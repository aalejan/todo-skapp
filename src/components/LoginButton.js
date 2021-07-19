

const LoginButton = ({handleMySkyLogin, loggedIn}) => {

    return(
        <button disabled={loggedIn} onClick={handleMySkyLogin} id='login-button'>
            Login to MySky
        </button>
    )

}



export default LoginButton