import { useNavigate } from "react-router-dom";
const AllUsers = ({ players, setFormVisibility, searchPlayer }) => {
  const navigate = useNavigate();
  return (
    <div className="container">
      {players.filter((player) =>
        player.name.toLowerCase().includes(searchPlayer)
      ).length > 0 ? (
        players
          .filter((player) => player.name.toLowerCase().includes(searchPlayer))
          .map((player) => {
            return (
              <div
                className="playerName"
                onClick={() => {
                  navigate(`/players/${player.id}`);
                  setFormVisibility(false);
                }}
                key={player.id}
                style={{ cursor: "pointer" }}
              >
                {player.name}
              </div>
            );
          })
      ) : (
        <div className="error">no match found</div>
      )}
    </div>
  );
};

export default AllUsers;
