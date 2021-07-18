

const LoginButton = ({handleMySkyLogin}) => {

    return(
        <button className='bouncy' onClick={handleMySkyLogin} id='login-button'>
            Login to MySky
        </button>
    )

}



export default LoginButton