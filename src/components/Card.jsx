import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Card = ({ uid, name, type, imageUrl }) => {
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
        <div className="card shadow-sm" style={{ width: "220px", minWidth: "220px" }}>
            <img
                src={imageUrl}
                className="card-img-top"
                alt={name}
                style={{ height: "140px", objectFit: "cover" }}
                onError={(e) => {
                    e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
                }}
            />
            <div className="card-body p-2">
                <h6 className="card-title mb-2">{name}</h6>
                <div className="d-flex justify-content-between align-items-center">
                    <Link
                        to={`/detail/${type}/${uid}`}
                        className="btn btn-outline-primary btn-sm"
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
