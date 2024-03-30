import { useEffect, useState } from "react";
import Card from "./components/Card";
import "./App.css";
import axios from "axios";
import ConcertInfo from "./components/ConcertInfo";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  //API KEY for Seat Geek
  let clientID = `&client_id=${API_KEY}`;

  //Store list is gone
  const [list, setList] = useState(null);
  //most pop
  const [popEvent, setPopEvent] = useState(null);
  const [popArtist, setPopArtist] = useState(null);
  const [popVenue, setPopVenue] = useState(null);

  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  //get initial data
  useEffect(() => {
    const fetchData = async () => {
      let URL = "https://api.seatgeek.com/2/events?venue.state=NY" + clientID;
      const response = await axios.get(URL);
      setList(response.data.events);
    };
    const fetchPopEvents = async () => {
      let URL = "https://api.seatgeek.com/2/events?sort=score.asc" + clientID;
      const response = await axios.get(URL);
      setPopEvent(response.data.events[0]);
    };
    const fetchPopArtist = async () => {
      let URL =
        "https://api.seatgeek.com/2/performers?sort=score.asc" + clientID;
      const response = await axios.get(URL);
      setPopArtist(response.data.performers[0]);
    };
    const fetchPopVenue = async () => {
      let URL = "https://api.seatgeek.com/2/venues?sort=score.asc" + clientID;
      const response = await axios.get(URL);
      setPopVenue(response.data.venues[0]);
    };
    fetchData();
    fetchPopEvents();
    fetchPopArtist();
    fetchPopVenue();
  }, []);

  //search stuff
  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = list.filter((event) =>
        event.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(list);
    }
  };

  console.log(popEvent);

  return (
    <>
      <div
        style={{
          backgroundColor: "#EF271B",
          width: "100%",
          paddingTop: "30px",
        }}
      >
        <h1
          style={{
            fontFamily: "Modak",
            WebkitTextStroke: "2px black",
            color: "#FFEECF",
            margin: "0px",
            textShadow: "3px 3px 5px #282828",
          }}
        >
          CONCERT GIRL SUMMER
        </h1>

        <div style={{ display: "flex", justifyContent: "center" }}>
          {popArtist && popEvent && popVenue && (
            <>
              <Card label="Most Popular Event" title={popEvent.title} />
              <Card label="Most Popular Venue" title={popVenue.name} />
              <Card label="Most Popular Artist" title={popArtist.name} />
            </>
          )}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          border: "2px solid #9E2A2B",
          color: "black",
        }}
      >
        <h3 style={{ margin: "10px" }}>My Concerts</h3>
        <h3 style={{ margin: "10px" }}>Dashboard</h3>
        <h3 style={{ margin: "10px" }}>About</h3>
      </div>

      <div style={{ padding: "20px" }}>
        <input
          type="text"
          style={{
            color: "black",
            padding: "10px",
            borderRadius: "20px",
            backgroundColor: "white",
          }}
          onChange={(inputString) => searchItems(inputString.target.value)}
        />
        <button style={{ backgroundColor: "#9E2A2B" }}>Find Concerts</button>
      </div>

      {searchInput.length > 0
        ? filteredResults.map((event) => <ConcertInfo eventid={event.id} />)
        : list && list.map((event) =>  <ConcertInfo eventid={event.id} />)
          }
    </>
  );
}

export default App;
