import { createContext, useEffect, useState } from "react";

export const AppContext = createContext()

export default function AppProvider({children}){

    const [token, setToken] = useState(localStorage.getItem('token'))

    const [user, setUser] = useState(null)

    const [leads, setLeads] = useState([]);

    const [followups, setFollowups] = useState([])

    async function getUser() {
        const res = await fetch('/api/user', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await res.json()
        setUser(data)
        
    }

    async function getLeads(){
        const res = await fetch('/api/leads', {
          headers:{
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();

        if(res.ok){
          setLeads(data);
        }
    } 

    useEffect(() => {
        if (token) {
            getUser();
            getLeads();
        }        
    }, [token])

    return (
        <AppContext.Provider value={{token, setToken, user, setUser, getLeads, leads, setLeads, followups, setFollowups}}>
            {children}
        </AppContext.Provider>
    )
}