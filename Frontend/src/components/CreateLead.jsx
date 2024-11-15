import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { Form } from "react-bootstrap";

export default function CreateLead() {

    const { token } = useContext(AppContext);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: ""
    })

    const [errors, setErrors] = useState({});


    async function handleCreateLead(e){
        e.preventDefault();

        const res = await fetch("/api/leads", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(formData),
        })
        

        const data = await res.json();

        if(data.errors){
            setErrors(data.errors);
        } else {
            navigate("/leads");
        }
    }

    return (

        <div className="d-flex justify-content-center  align-items-center position-absolute top-0" style={{height: "100vh", width: "100vw", background:"#434c5e"}}>
            <div className="shadow-lg bg-white p-4" style={{ width: "500px" }}>
                <div className="mb-4 d-flex flex-column align-items-center gap-2">
                    <h1 className="display-8 font-weight-medium">Create a New Lead</h1>
                </div>

                <form className="mt-4" onSubmit={handleCreateLead}>
                    <div className="mb-3">
                        <Form.Label>
                            Name:
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
                            Email:
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
                            Phone:
                        </Form.Label>
                        <input
                            type="text"
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="bg-white w-100 border border-secondary py-2 px-2 rounded" style={{ outline: "none" }}
                        />
                        {errors && <p className="text-danger mt-1">{errors.phone}</p>}
                    </div>

                    <button type="submit" className="btn mt-4 btn-warning w-100 py-2 text-black font-weight-bold" style={{background:"#f88e1d"}}>
                        Create New Lead
                    </button>
                </form>
            </div>
        </div>

    )
  }