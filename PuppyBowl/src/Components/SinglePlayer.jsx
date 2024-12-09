import { useNavigate, useParams } from "react-router-dom";
import { deleteData } from "../API";

const COHORT_NAME = "2410-FTB-ET-WEB-FT";
const API = `https://fsa-puppy-bowl.herokuapp.com/api/${COHORT_NAME}/players`;

const singlePlayer = ({
  players,
  setApiCall,
  apiCall,
  setFormVisibility,
  setSearchPlayer,
}) => {
  let { id } = useParams();
  const navigate = useNavigate();
  const deleteHandler = async () => {
    const removePlayer = await deleteData(id);
    setApiCall(!apiCall);
    navigate("/");
    setFormVisibility(true);
    setSearchPlayer("");
  };
  return (
    <>
      {players
        .filter((player) => player.id === parseInt(id))
        .map((singlePlayer) => {
          return (
            <div key={singlePlayer.id}>
              <h1>{singlePlayer.name}</h1>
              <p style={{ fontSize: "25px", fontFamily: "sans-serif" }}>
                {singlePlayer.breed}
              </p>
              <img
                style={{
                  width: "300px",
                  height: "450px",
                  borderRadius: "10px",
                }}
                src={singlePlayer.imageUrl}
              />
              <br />
              <button
                className="backButton"
                onClick={() => {
                  navigate("/");
                  setFormVisibility(true);
                  setSearchPlayer("");
                }}
              >
                Back
              </button>
              <button className="deleteButton" onClick={deleteHandler}>
                Delete
              </button>
            </div>
          );
        })}
    </>
  );
};

export default singlePlayer;
