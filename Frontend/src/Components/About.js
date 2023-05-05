// import React, { useContext } from 'react'
// import NoteContext from '../Context/notes/NoteContext';

export const About = () => {

  // todo const a = useContext(NoteContext)

  return (
    <>
      <div className="container my-4">
        <div className="card">
          <div className="card-header">
            Quote
          </div>
          <div className="card-body">
            <blockquote className="blockquote mb-0">
              <p>“If there's a book that you want to read, but it hasn't been written yet, then you must write it.”
              </p>
              <footer className="blockquote-footer"> <cite title="Source Title"> Toni Morrison</cite></footer>
            </blockquote>
          </div>
        </div>
      </div>

      {/* <div> this is {a.name} and his age is {a.age}</div> */}
      {/* // todo (do one more card side of this card for co founder) about founder and his/her bio */}
      <div className="container my-3">
        <div className="card mb-3" style={{ maxWidth: 540 }}>
          <div className="row g-0">
            <div className="col-md-4">
              <img src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" className="img-fluid rounded-start" alt="..." />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Palak kumar</h5>
                <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed qui quis, rem et tempora error dolorem saepe aperiam nihil nostrum reiciendis consectetur nisi nesciunt labore fuga. Minima a ad placeat.</p>
                <p className="card-text"><small className="text-muted">Founder of <b>iNotebook</b> </small></p>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}
export default About;