import { useContext, useEffect } from "react"
import { AppContext } from "../Context/AppContext"
import { Link } from "react-router-dom"
import axios from "axios"

export default function FollowUps() {

  const {followups, token, setFollowups} = useContext(AppContext)

  async function getFollowups(){
    try {
      const res = await axios.get('/api/follow-ups', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(res.data);
      

      if (res.status === 200) { // Check for a successful status code
        setFollowups(res.data);
      }
    } catch (error) {
      console.error("Error fetching follow-ups:", error);
    }
  }


  useEffect(() => {
      if (token) {
          getFollowups();
      }        
  }, [])

  return (
    // <div className="max-w-5xl mx-auto py-10">
    //   <div className="flex justify-between items-center mb-5">
    //     <h1 className="text-4xl font-medium">Follow up List</h1>
    //     <Link to="/create-lead" className="hover:text-primary hover:underline uppercase font-bold">Create new lead</Link>
    //   </div>


    //   <table className="w-full border-collapse shadow-lg rounded-lg">
    //     <thead className="">
    //       <tr className="bg-primary text-accent">
    //         <th className="text-left font-bold py-3 px-4 uppercase">Id</th>
    //         <th className="text-left font-bold py-3 px-4 uppercase">Lead ID</th>
    //         <th className="text-left font-bold py-3 px-4 uppercase">Scheduled At</th>
    //         <th className="text-left font-bold py-3 px-4 uppercase">Status</th>
    //         <th className="text-left font-bold py-3 px-4 uppercase">Action</th>
    //       </tr>
    //     </thead>
    //     <tbody className="">
    //       { followups.length > 0 ?
    //         followups.map(followup => (
    //           <tr className="hover:bg-gray-100" key={followup.id}>
    //             <td className="py-3 px-4">{followup.id}</td>
    //             <td className="py-3 px-4">{followup.lead_id}</td>
    //             <td className="py-3 px-4">{followup.scheduled_at}</td>
    //             <td className="py-3 px-4">
    //               {followup.status === 'pending' && <span className="bg-black text-white font-bold px-2 py-1 rounded-full">pending</span>}
    //               {followup.status === 'Missed' && <span className="bg-red-700 text-white font-bold px-2 py-1 rounded-full">missed</span>}
    //               {followup.status === 'completed' && <span className="bg-green-700 text-white font-bold px-2 py-1 rounded-full">completed</span>}
    //             </td>
    //             <td className="py-3 px-4 flex gap-5">
    //             <button className="bg-cyan-500 hover:bg-cyan-700 text-black font-bold py-1 px-2 rounded focus:outline-none text-xs focus:shadow-outline">view lead</button>
    //               <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-2 rounded focus:outline-none text-xs focus:shadow-outline">
    //                 Schedule follow up
    //               </button>
    //             </td>
    //         </tr>
    //         )) : (
    //           <tr>
    //             <td><p className="text-lg text-center py-8 font-bold">No leads found</p></td>
    //           </tr>
    //         )
    //       }
    //     </tbody>
    //   </table>
    // </div>

    <div className="container" style={{marginTop: "100px"}}>
    <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="display-4 font-weight-medium">Follow-up List</h1>
        <Link to="/create-lead" className="text-uppercase fw-medium">Create New Lead</Link>
    </div>

    <table className="table table-bordered shadow-lg rounded-lg">
        <thead>
            <tr className="bg-primary text-white">
                <th scope="col" className="text-left font-weight-bold py-3 px-4 text-uppercase">Id</th>
                <th scope="col" className="text-left font-weight-bold py-3 px-4 text-uppercase">Lead ID</th>
                <th scope="col" className="text-left font-weight-bold py-3 px-4 text-uppercase">Scheduled At</th>
                <th scope="col" className="text-left font-weight-bold py-3 px-4 text-uppercase">Status</th>
                <th scope="col" className="text-left font-weight-bold py-3 px-4 text-uppercase">Action</th>
            </tr>
        </thead>
        <tbody>
            {followups.length > 0 ? (
                followups.map((followup) => (
                    <tr key={followup.id} className="hover:bg-light">
                        <td className="py-3 px-4">{followup.id}</td>
                        <td className="py-3 px-4">{followup.lead_id}</td>
                        <td className="py-3 px-4">{followup.scheduled_at}</td>
                        <td className="py-3 px-4">
                            {followup.status === 'pending' && (
                                <span className="badge text-bg-dark badge-dark font-weight-bold px-2 py-1 rounded-pill">{followup.status}</span>
                            )}
                            {followup.status === 'completed' && (
                                <span className="badge text-bg-success badge-success font-weight-bold px-2 py-1 rounded-pill">{followup.status}</span>
                            )}
                            {followup.status === 'missed' && (
                                <span className="badge text-bg-danger badge-danger font-weight-bold px-2 py-1 rounded-pill">{followup.status}</span>
                            )}
                        </td>
                        <td className="py-3 px-4 d-flex gap-3">
                            <button className="btn btn-sm fw-medium text-black" style={{background:"#ff7800", border:"none"}}>View Lead</button>
                            <button className="btn btn-warning btn-sm fw-medium text-white" style={{background:"#333d51", border:"none"}}>
                                Schedule Follow-up
                            </button>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan="5" className="text-center py-8 font-weight-bold">
                        No leads found
                    </td>
                </tr>
            )}
        </tbody>
    </table>
</div>

  )
}

 