import React from 'react'
import Notes from './Notes';



export const Home = (props) => {

    return (
        <>
            <Notes showAlert={props.showAlert} />
        </>
    )
}
export default Home;