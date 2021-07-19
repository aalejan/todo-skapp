import styled from "styled-components"


const Title = () => {

    return (
        <AppTitle>
            Decentralized Todo App
        </AppTitle>
    )
}

const AppTitle = styled.div`
    font-size: 3rem;
    font-weight: 600;
    width: 90%;
    margin: auto;
`

export default Title