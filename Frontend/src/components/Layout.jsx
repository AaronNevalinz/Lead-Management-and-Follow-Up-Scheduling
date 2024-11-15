import { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';


export default function Layout() {

    const navigate = useNavigate();


    const {user, token, setUser, setToken} = useContext(AppContext);

    async function handleLogout(e){
        e.preventDefault();

        const res = await fetch("/api/logout", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const data = await res.json();
        

        if(res.ok){
            setUser(null);
            setToken(null);
            localStorage.removeItem("token");
            navigate("/login");
            console.log(data);
        }
    }

    return (
      <div className="font-body position-relative">

            <Navbar className="bg-body-tertiar position-fixed top-0 start-0 w-100" style={{zIndex: 50, background:"#cbd0d8"}}>
                <Container>
                    <Navbar.Brand>
                        <Link to='/' className="d-flex flex-column align-items-center text-decoration-none text-black gap-0 fs-6"><span>The Lead</span> <span className="fw-bold fs-4" style={{letterSpacing: "3px"}}>HUB</span></Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                    {user ? (
                        <ul className="nav gap-4 text-lg font-medium align-items-center">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/leads" className="nav-link">Leads</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/followups" className="nav-link">Follow-ups</Link>
                            </li>
                            <li className="nav-item">
                                <form onSubmit={handleLogout} className="d-inline">
                                    <button className="btn text-black px-4 py-2 rounded border-none fw-medium" type="submit" style={{background:"#ff7800", border:"none"}}>Logout</button>
                                </form>
                            </li>
                        </ul>
                    ):(
                        <ul className="nav gap-4 text-lg font-medium">
                            <li className="nav-item">
                                <Link to="/register" className="nav-link">Register</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">Login</Link>
                            </li>
                        </ul>
                )}
                    </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

          <main>
            <Outlet />
          </main>
      </div>
    )
  }