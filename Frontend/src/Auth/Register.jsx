import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { Form } from "react-bootstrap";

export default function Register() {

    const { setToken} = useContext(AppContext);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: ""
    })

    const [errors, setErrors] = useState({});


    async function handleRegister(e){
        e.preventDefault();

        const res = await fetch("/api/register", {
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
            console.log(data);
        }
        
        
    }

    return (
    //   <div className="max-w-xl mx-auto py-10 shadow-xl mt-10 px-10 rounded-lg">
    //         <div className="flex justify-center items-center mb-5">
    //             <h1 className="text-4xl font-medium">Register a new Account</h1>
    //         </div>
    //         <form className="space-y-10 mt-10" onSubmit={handleRegister}>
    //             <div>
    //                 <input className="outline-none" type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}/>
    //                 {errors && <p className="error">{errors.name}</p>}
    //             </div>

    //             <div>
    //                 <input className="outline-none" type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}/>
    //                 {errors && <p className="error">{errors.email}</p>}
    //             </div>

    //             <div>
    //                 <input className="outline-none" type="password" placeholder="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}/>
    //                 {errors && <p className="error">{errors.password}</p>}
    //             </div>

    //             <div>
    //                 <input className="outline-none" type="password" placeholder="password_confirmation" value={formData.password_confirmation} onChange={(e) => setFormData({...formData, password_confirmation: e.target.value})}/>
    //             </div>

    //             <div>
    //                <select name="" id="" className="w-full py-2 px-3" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}>
    //                     <option value="admin">Admin</option>
    //                     <option value="sales_manager">sales manager</option>
    //                     <option value="sales_rep">sales representative</option>
    //                </select>
    //                {errors && <p className="error">{errors.role}</p>}
    //             </div>

    //             <button className="bg-orange-700 w-full py-2 rounded-md text-white font-medium text-xl">
    //                 Register
    //             </button>
    //         </form>
    //   </div>


    <div className="d-flex justify-content-center  align-items-center position-absolute top-0" style={{height: "100vh", width: "100vw", background:"#434c5e"}}>
        <div className="shadow-lg bg-white px-4 pb-4 mt-4" style={{ width: "500px" }}>
            <div className="d-flex flex-column align-items-center">
                <h1 className="display-8 font-weight-mediu">Login</h1>
                <p className="d-flex gap-3">New to The Lead HUB? <Link to='/login' className="text-uppercase small">login</Link></p>
            </div>
            <form className="" onSubmit={handleRegister}>
                <div className="mb-3">
                    <Form.Label>
                        Name
                    </Form.Label>
                    <input
                        type="text"
                        placeholder="Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-white w-100 border border-secondary py-2 px-2 rounded" style={{ outline: "none" }}
                    />
                    {errors && <p className="text-danger mt-1">{errors.name}</p>}
                </div>

                <div className="mb-3">
                    <Form.Label>
                        Email
                    </Form.Label>
                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-white w-100 border border-secondary py-2 px-2 rounded" style={{ outline: "none" }}
                    />
                    {errors && <p className="text-danger mt-1">{errors.email}</p>}
                </div>

                <div className="mb-3">
                    <Form.Label>
                        Password
                    </Form.Label>
                    <input
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="bg-white w-100 border border-secondary py-2 px-2 rounded" style={{ outline: "none" }}
                    />
                    {errors && <p className="text-danger mt-1">{errors.password}</p>}
                </div>

                <div className="mb-3">
                    <Form.Label>
                        Password Confirmation
                    </Form.Label>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={formData.password_confirmation}
                        onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
                        className="bg-white w-100 border border-secondary py-2 px-2 rounded" style={{ outline: "none" }}
                    />
                </div>

                <div className="mb-4">
                    <select
                        className="bg-white w-100 border border-secondary py-2 px-2 rounded" style={{ outline: "none" }}
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    >
                        <option value="">Choose your role</option>
                        <option value="admin">Admin</option>
                        <option value="sales_manager">Sales Manager</option>
                        <option value="sales_rep">Sales Representative</option>
                    </select>
                    {errors && <p className="text-danger mt-1">{errors.role}</p>}
                </div>

                <button type="submit" className="btn w-100 mt-4 py-3 text-black fw-bold " style={{background:"#f88e1d"}}>
                    Register
                </button>
            </form>
        </div>
    </div>

    )
  }