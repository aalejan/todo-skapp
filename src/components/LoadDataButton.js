

const LoadDataButton = ({loadData, saving, loggedIn}) => {

    return(
        <button disabled= {!loggedIn ? true : saving} onClick={loadData}>
            Load Data
        </button>
    )
}


export default LoadDataButton