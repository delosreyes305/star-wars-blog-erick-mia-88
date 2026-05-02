import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

import avatarCharacter from "../assets/img/avatar-profile.png";
import avatarPlanet from "../assets/img/avatar-planet.png";
import avatarVehicle from "../assets/img/avatar-vehicles.png";

const PLACEHOLDERS = {
    characters: avatarCharacter,
    planets: avatarPlanet,
    vehicles: avatarVehicle
};

export const Card = ({ uid, name, type }) => {
    const { store, dispatch } = useGlobalReducer();

    const isFavorite = store.favorites.some(
        (f) => f.uid === uid && f.type === type
    );

    const handleFavorite = () => {
        if (isFavorite) {
            dispatch({ type: "remove_favorite", payload: { uid, type, name } });
        } else {
            dispatch({ type: "add_favorite", payload: { uid, type, name } });
        }
    };

    return (
        <div
            className="card shadow"
            style={{
                width: "220px",
                minWidth: "220px",
                backgroundColor: "#16213e",
                border: "1px solid #f8c100",
                color: "white"
            }}
        >
            <img
                src={PLACEHOLDERS[type]}
                className="card-img-top"
                alt={name}
                style={{ height: "140px", objectFit: "cover" }}
            />
            <div className="card-body p-2">
                <h6 className="card-title mb-2 text-warning">{name}</h6>
                <div className="d-flex justify-content-between align-items-center">
                    <Link
                        to={`/detail/${type}/${uid}`}
                        className="btn btn-outline-warning btn-sm"
                    >
                        Learn more!
                    </Link>
                    <button
                        className={`btn btn-sm ${isFavorite ? "btn-warning" : "btn-outline-warning"}`}
                        onClick={handleFavorite}
                    >
                        {isFavorite ? "★" : "☆"}
                    </button>
                </div>
            </div>
        </div>
    );
};
