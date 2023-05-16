import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Signup = (props) => {
    const [credential, setCredential] = useState({ name: '', email: '', password: '', cpassword: '' })
    let history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ? destructuring:
        const { name, email, password } = credential;
        const response = await fetch(`http://localhost:5000/api/auth/createUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // todo save the auth toekn and redirect
            localStorage.setItem('token', json.authtoken);
            history.push("/")
            props.showAlert("Your Account has been created successfully", "success")

        }
        else {
            props.showAlert("invalid credentials", "danger")
        }
    }

    const onChange = (e) => {
        //? {...note} spread operator: 
        setCredential({ ...credential, [e.target.name]: e.target.value })

    }
    return (
        <>
            <div className="container my-3">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name="name" onChange={onChange} value={credential.name} aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name="email" onChange={onChange} value={credential.email} aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" id="password" name='password' onChange={onChange} value={credential.password} minLength={5} required className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                        <input type="password" id="password" name='cpassword' onChange={onChange} value={credential.cpassword} minLength={5} required className="form-control" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Signup