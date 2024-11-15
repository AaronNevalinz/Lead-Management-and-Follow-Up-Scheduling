import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { Form } from "react-bootstrap";

export default function Login() {

    const { setToken} = useContext(AppContext);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const [errors, setErrors] = useState({});


    async function handleLogin(e){
        e.preventDefault();

        const res = await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify(formData),
        })

        const data = await res.json();

        if(data.errors){
            setErrors(data.errors);
        } else {
            localStorage.setItem("token", data.token);
            setToken(data.token);
            navigate("/");
        }
        
    }

    return (
        <div className="d-flex justify-content-center  align-items-center position-absolute top-0" style={{height: "100vh", width: "100vw", background:"#434c5e"}}>
            <div className="shadow-lg bg-white p-4" style={{ width: "500px" }}
            >
                <div className="mb-4 d-flex flex-column align-items-center gap-2">
                    <h1 className="display-8 font-weight-mediu">Login</h1>
                    <p className="d-flex gap-3"><span>New to <span className="fw-bold">The Lead HUB</span>?</span> <Link to='/register' className="text-uppercase small"> create an account</Link></p>
                </div>


                <form className="mt-4" onSubmit={handleLogin}>
                    <Form.Label>
                        Email
                    </Form.Label>
                    <div className="mb-3">
                        <input
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="bg-white w-100 border border-secondary py-3 px-2 rounded" style={{ outline: "none" }}
                        />
                        {errors && <p className="text-danger mt-1">{errors.email}</p>}
                    </div>
            
                    <Form.Label>
                        Password
                    </Form.Label>
                    <div className="mb-3">
                        <input
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-100 border border-secondary py-3 px-2 rounded"  style={{ outline: "none" }}
                        />
                        {errors && <p className="text-danger mt-1">{errors.password}</p>}
                    </div>
            
                    <button type="submit" className="btn w-100 mt-4 py-3 text-black fw-bold" style={{background:"#f88e1d"}}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    
    )
  }