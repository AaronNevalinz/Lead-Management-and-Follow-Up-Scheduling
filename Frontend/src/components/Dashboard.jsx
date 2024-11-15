import { useContext } from "react"
import { AppContext } from "../Context/AppContext"
import { Link } from "react-router-dom"

export default function Dashboard() {
  const {leads, followups} = useContext(AppContext)
  return (

    <div className="container" style={{marginTop: "100px"}}  >
        <div className="d-flex gap-4 justify-content-around align-items-center">
            <div className="shadow p-3 w-25 d-flex flex-column align-items-center text-center">
                <h1>{leads.length}</h1>
                <p>Leads</p>
                <Link to="/create-lead" className="text-uppercase">Create New Lead</Link>
            </div>

            <div className="shadow p-3 w-25 d-flex flex-column align-items-center text-center">
                <h1>{followups.length}</h1>
                <p>Follow Ups</p>
                <Link to="/followups">View Follow Ups</Link>
            </div>

            <div className="shadow p-3 w-25 d-flex flex-column align-items-center text-center">
                <h1>{leads.length}</h1>
                <p>Leads</p>
                <Link to="/create-lead">Create New Lead</Link>
            </div>
        </div>
        <div className="mt-4">
            <h1>Navigate to the important pages below</h1>
            <ul>
                <li>
                    <Link to='/create-lead'>Create Leads</Link>
                </li>
                <li>
                    <Link to='/leads'>View your Leads</Link>
                </li>
                <li>
                    <Link to='/followups'>View your scheduled follow ups</Link>
                </li>
            </ul>
        </div>

        <div>
            <p>Developed by Aaron Nevalinz Ogwal</p>
            <ul>
                <li>
                    <a href="https://github.com/AaronNevalinz" target="blank">My gitHub</a>
                </li>
                <li>
                    <a href="">This project code</a>
                </li>
                <li>
                    <a href="https://nike-flax-ten.vercel.app/" target="blank">View One of My projects in React Js</a>
                </li>
            </ul>
        </div>
        <div>
            <p>Thanks for considering me for this role, and I hope for the best. And to add value to your Company, <a href="https://neexa.co/" target="blank">Neexa.ai</a></p>
            <p>Signed: Aaron Ogwal</p>
        </div>
    </div>

  )
}
