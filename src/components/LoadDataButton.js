

const LoadDataButton = ({loadData, saving}) => {

    return(
        <button disabled= {saving} onClick={loadData}>
            Load Data
        </button>
    )
}


export default LoadDataButton