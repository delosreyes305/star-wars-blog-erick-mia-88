import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Navbar = () => {
    const { store, dispatch } = useGlobalReducer();

    const handleRemove = (uid, type) => {
        dispatch({ type: "remove_favorite", payload: { uid, type } });
    };

    return (
        <nav
            className="navbar navbar-expand-lg px-4 py-3"
            style={{ backgroundColor: "#0f0f1a", borderBottom: "2px solid #f8c100" }}
        >
            <Link className="navbar-brand fw-bold text-warning fs-4" to="/">
                <i className="fa-solid fa-jedi fa-2xl"></i>
            </Link>

            <div className="ms-auto dropdown">
                <button
                    className="btn btn-warning fw-bold dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    Favorites
                    <span className="badge bg-dark ms-2">
                        {store.favorites.length}
                    </span>
                </button>
                <ul
                    className="dropdown-menu dropdown-menu-end p-2"
                    style={{ backgroundColor: "#16213e", minWidth: "230px", border: "1px solid #f8c100" }}
                >
                    {store.favorites.length === 0 ? (
                        <li className="px-2 text-muted fst-italic small">No favorites yet</li>
                    ) : (
                        store.favorites.map((fav) => (
                            <li
                                key={`${fav.type}-${fav.uid}`}
                                className="d-flex justify-content-between align-items-center px-2 py-1 rounded mb-1"
                                style={{ backgroundColor: "#0f0f1a" }}
                            >
                                <Link
                                    to={`/detail/${fav.type}/${fav.uid}`}
                                    className="text-warning text-decoration-none small"
                                >
                                    {fav.name}
                                </Link>
                                <button
                                    className="btn btn-sm btn-outline-danger py-0 px-1 ms-2"
                                    onClick={() => handleRemove(fav.uid, fav.type)}
                                >
                                    <i className="fa-regular fa-trash-can" style={{color: "rgb(212, 0, 0)"}}></i>
                                </button>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </nav>
    );
};
