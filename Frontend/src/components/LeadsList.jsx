import { useContext, useEffect, useState } from "react"
import { AppContext } from "../Context/AppContext"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import Form from 'react-bootstrap/Form';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Modal, Button } from 'react-bootstrap';





export default function LeadsList() {
  const {leads, token} = useContext(AppContext)
  const navigate = useNavigate();
  const notify = () => toast("Wow so easy!");

  const [formData, setFormData] = useState({
    lead_id: '',
    scheduled_at: '',
    status: '',
  })

  const [errors, setErrors] = useState({});
  const [selectedLead, setSelectedLead] = useState({})

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);


  const [singleLead, setSingleLead] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  async function getSingleLead(id){
      try {
          setIsLoading(true);

          const res = await axios(`/api/follow-ups/${id}`, {
              headers:{
                  Authorization: `Bearer ${token}`
              }
          });  

          if(res.status === 200){
              setSingleLead(res.data[0])
          }
          
          
      } catch (error) {
          console.error('Error fetching single lead', error);            
      } finally{
        setIsLoading(false);
      }

  }

  const handleViewLead = async (lead) => {
    setSelectedLead(lead);
    await getSingleLead(lead.id);
    setShowModal(true);    
  };

  const handleCloseModal = () => setShowModal(false);

  const handleCloseModal2 = () => {
    setShowModal2(false);
    setFormData({
      lead_id: '', 
      scheduled_at: '', 
      status: ''
    })
    setErrors({});
  }

  const handleCloseModal3 = () => {
    setShowModal3(false);
    setFormData({
      lead_id: '', 
      scheduled_at: '', 
      status: ''
    })
    setErrors({});
  }

  const handleFollowupModal =  (lead) => {
    setSelectedLead(lead);
    setFormData({...formData, lead_id: String(lead.id)});
    setShowModal2(true);
  }

  const handleScheduleFollowUpModalForm = (lead) => {
    setSelectedLead(lead);
    setShowModal2(false);
    setFormData({...formData, lead_id: String(selectedLead)});
    setShowModal3(true);
  }
  const handleScheduleFormChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  }
  
  async function scheduleFollowUp(e, id){
    e.preventDefault();
    try{
      const res = await fetch(`/api/follow-ups/${id}`, {
          method: "PATCH",
          headers: {
              Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(formData),
      })

    const data = await res.json();
    console.log(data)

    
      
    if(data.errors){
        setErrors(data.errors);
    } else {
        handleCloseModal2();
        navigate("/leads");
    }
  } catch(error){
    console.error('Error Scheduling for follow up', error);
  }
}

// function to post to the backend - schedule a lead
async function scheduleLead(id){
    setFormData({lead_id: id, ...formData});

    try{
      const res = await fetch(`/api/follow-ups/`, {
          method: "POST",
          headers: {
              Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(formData),
      })

    const data = await res.json();
    console.log(data);
    console.log(formData);
    
    
      
    if(data.errors){
        setErrors(data.errors);
    } else {
        handleCloseModal3();
        navigate("/leads");
    }
    } catch(error){
      console.error('Error Scheduling for follow up', error);
    }
}

const handleViewScheduleLead = async (e, lead) => {
  e.preventDefault();
  console.log(lead);
  setShowModal2(false);
  setSelectedLead(lead);
  await scheduleLead(lead);
  setShowModal3(true);    
};


  return (
    <div className="container" style={{marginTop: "100px"}}>
    <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="display-4 font-weight-medium">Leads List</h1>
        <Link to="/create-lead" className="text-uppercase font-weight-bold text-decoration-none text-primary">Create new lead</Link>
    </div>

    <table className="table table-bordered shadow-sm">
        <thead>
            <tr className="bg-primary text-light">
                <th className="text-left font-weight-bold py-3 px-4 text-uppercase">Id</th>
                <th className="text-left font-weight-bold py-3 px-4 text-uppercase">Name</th>
                <th className="text-left font-weight-bold py-3 px-4 text-uppercase">Email</th>
                <th className="text-left font-weight-bold py-3 px-4 text-uppercase">Phone</th>
                <th className="text-left font-weight-bold py-3 px-4 text-uppercase">Action</th>
            </tr>
        </thead>
        <tbody>
            {leads.length > 0 ? (
                leads.map(lead => (
                    <tr className="table-hover" key={lead.id}>
                        <td className="py-3 px-4">{lead.id}</td>
                        <td className="py-3 px-4">{lead.name}</td>
                        <td className="py-3 px-4">{lead.email}</td>
                        <td className="py-3 px-4">{lead.phone}</td>
                        <td className="py-3 px-4 d-flex gap-2">
                            <button className="btn btn-info btn-sm fw-bold" style={{background:"#ff7800", border:"none"}} onClick={() => handleViewLead(lead)}>View Lead</button>
                            <button className="btn btn-sm text-white fw-bold" style={{background:"#333d51", border:"none"}}  onClick={() => handleFollowupModal(lead)}>Update Follow-up Status</button>
                            <button className="btn btn-primary btn-sm text-white fw-bold" onClick={() => handleScheduleFollowUpModalForm(lead)}>Schedule Follow up</button>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan="6" className="text-center font-weight-bold py-4">No leads found</td>
                </tr>
            )}
        </tbody>
    </table>

    <div>
        <button onClick={notify}>Notify!</button>
        <ToastContainer />
    </div>



    {/* Modal Popup for viewing lead details */}
    <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Follow Up Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         {isLoading ? (
            <p>is loading...</p>
         ): (
           singleLead && selectedLead ?  (
            <>
              <p><strong>Name:</strong> {selectedLead.name}</p>
              <p><strong>Phone:</strong> {selectedLead.phone}</p>
              <p><strong>Scheduled At:</strong> {singleLead.scheduled_at}</p>
              <p>
                <strong>Status: </strong> 
                { singleLead.status === 'pending' &&<span className="badge text-bg-dark badge-dark font-weight-bold px-2 py-1 rounded-pill">{singleLead.status}</span> }
                { singleLead.status === 'completed' &&<span className="badge text-bg-success badge-success font-weight-bold px-2 py-1 rounded-pill">{singleLead.status}</span> }
                { singleLead.status === 'missed' &&<span className="badge text-bg-danger badge-danger font-weight-bold px-2 py-1 rounded-pill">{singleLead.status}</span> }
              </p>
            </>
          ) : (
            <div className="d-flex flex-column align-items-center justify-content-center">
              <p>No Follow up Information found.</p>
              <button className="btn btn-primary btn-sm text-white font-weight-bold" onClick={()=>{handleScheduleFollowUpModalForm(selectedLead.id)}}>Schedule Follow-up</button>
            </div>
          )
         )}
         
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>



      {/* modal pop for Updating follow up Status -modal 2 */}
      <Modal show={showModal2} onHide={handleCloseModal2} centered>

        <Modal.Header closeButton>
          <Modal.Title>Update follow up status Follow-up</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={(e) => scheduleFollowUp(e, formData.lead_id)}>

              <Form.Group>
                <Form.Label>Select Follow-up Status</Form.Label>
              

                <Form.Select aria-label="Default select example" onChange={handleScheduleFormChange} name="status" value={formData.status}>
                  <option>Select the Status</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="missed">Missed</option>
                </Form.Select>
              </Form.Group>

              <Button className="mt-4" variant="" type="submit" style={{background:"#ff7800", border:"none"}}>
                submit
              </Button>
          </Form>
        </Modal.Body>
      </Modal>



       {/* modal pop for schudeling follow up - modal 3 */}
       <Modal show={showModal3} onHide={handleCloseModal3} centered>
        <Modal.Header closeButton>
          <Modal.Title>Schudeling follow up</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={(e) => handleViewScheduleLead(e, selectedLead.id)}>
              <Form.Group>
                <Form.Label className="fw-bold">Enter the schudeling Date:</Form.Label>
                <Form.Control
                  type="date"
                  name="scheduled_at"
                  value={formData.scheduled_at}
                  onChange={handleScheduleFormChange}
                />
                <p className="fst-italic fw-lighter fs-6">Note: The date must be any day after now</p>
                {errors.scheduled_at && <p className="text-danger mt-1">{errors.scheduled_at}</p>}
              </Form.Group>
              <Form.Group>
                
                <Form.Label className="fw-bold">Select Follow-up Status</Form.Label>
              

                <Form.Select aria-label="Default select example" onChange={handleScheduleFormChange} name="status" value={formData.status}>
                  <option>Select the Status</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="missed">Missed</option>
                </Form.Select>
              </Form.Group>

              <Button className="mt-4" variant="" type="submit" style={{background:"#ff7800", border:"none"}}>
                submit
              </Button>
          </Form>
        </Modal.Body>
      </Modal>
</div>

  )
}

 