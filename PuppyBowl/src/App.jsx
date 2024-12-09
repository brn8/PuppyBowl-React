import { useEffect, useState } from "react";
import "./App.css";
import AllUsers from "./Components/AllUsers";
import { Route, Routes, useParams } from "react-router-dom";
import SinglePlayer from "./Components/SinglePlayer";
import { fetchAllData, postData } from "./API";

const COHORT_NAME = "2410-FTB-ET-WEB-FT";
const API = `https://fsa-puppy-bowl.herokuapp.com/api/${COHORT_NAME}/players`;

function App() {
  const [players, setPlayers] = useState([]);
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [searchPlayer, setSearchPlayer] = useState("");
  const [apiCall, setApiCall] = useState(true);
  const [formVisibility, setFormVisibility] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const playersData = await fetchAllData();
      if (playersData.success) {
        setPlayers(playersData.data.players);
      } else {
        console.log(playersData.error);
      }
    }
    fetchData();
  }, [apiCall]);
  const formHandler = async (e) => {
    e.preventDefault();
    const addData = await postData({
      name: name,
      breed: breed,
      imageUrl: imageUrl,
    });
    setName("");
    setBreed("");
    setImageUrl("");
    setApiCall(!apiCall);
  };
  return (
    <>
      {formVisibility ? (
        <>
          <form onSubmit={formHandler}>
            <label>Name: </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              minLength={3}
              required
            />
            <label> Breed: </label>
            <input
              type="text"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              minLength={3}
              required
            />
            <label> Image Url: </label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <button className="submitButton">Submit</button>
          </form>
          <br />
          <input
            type="text"
            onChange={(e) => setSearchPlayer(e.target.value.toLowerCase())}
            placeholder="Search"
          />
          <h1>List of Players</h1>
          <p>Click on the specific player to view their details</p>
        </>
      ) : (
        ""
      )}
      <Routes>
        <Route
          path="/"
          element={
            <AllUsers
              players={players}
              setFormVisibility={setFormVisibility}
              searchPlayer={searchPlayer}
            />
          }
        />
        <Route
          path="/players/:id"
          element={
            <SinglePlayer
              players={players}
              setApiCall={setApiCall}
              apiCall={apiCall}
              setFormVisibility={setFormVisibility}
              setSearchPlayer={setSearchPlayer}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
