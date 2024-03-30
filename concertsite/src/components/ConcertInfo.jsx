import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function ConcertInfo({eventid}){
    let clientID = `?client_id=${API_KEY}`

    const [event, setEvent] = useState({
        title: "",
        average_price: "",
        url: "",
        venue:""
    })

    useEffect(() => {
        const getEvent = async () => {
            const response = await axios.get("https://api.seatgeek.com/2/events/"+ eventid + clientID);
            const eventData = {
                title: response.data.title,
                average_price: response.data.stats.average_price,
                url: response.data.url,
                venue: response.data.venue.name
            }
            setEvent(eventData);
        };
        getEvent();
    }, [])
    

    return(
        <div style={{display: "flex", flex:"1",color:"black", padding:"20px 50px", backgroundColor: "#f1cd8c", margin:"5px 20px", justifyContent: "space-around"}}>
            <h4 style={{margin: "5px 25px"}}>{event.title}</h4>
            <p style={{margin: "5px 25px"}}>${event.average_price}</p>
            <p style={{margin: "5px 25px"}}>{event.venue}</p>
            <a href={event.url} style={{ display: "inline-block", backgroundColor: "#9E2A2B", borderRadius: "30px", color:"white", padding:"10px"}}>Get Tickets</a>
        </div>
    );
}

export default ConcertInfo;