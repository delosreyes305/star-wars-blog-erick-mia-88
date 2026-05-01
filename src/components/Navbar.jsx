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
            style={{ backgroundColor: "#0f0f1a", borderBottom: "1px solid #f8c100" }}
        >
            {/* Brand */}
            <Link className="navbar-brand fw-bold text-warning fs-4" to="/">
                <i class="fa-solid fa-jedi fa-2xl"></i>
            </Link>

            {/* Favorites dropdown */}
            <div className="ms-auto dropdown">
                <button
                    className="btn btn-warning dropdown-toggle fw-bold"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    Favorites
                    <span className="badge bg-dark ms-2">
                        {store.favorites.length}
                    </span>
                </button>
                <ul
                    className="dropdown-menu dropdown-menu-end"
                    style={{ backgroundColor: "#16213e", minWidth: "220px" }}
                >
                    {store.favorites.length === 0 ? (
                        <li className="dropdown-item text-muted">No favorites yet</li>
                    ) : (
                        store.favorites.map((fav) => (
                            <li
                                key={`${fav.type}-${fav.uid}`}
                                className="dropdown-item d-flex justify-content-between align-items-center"
                                style={{ color: "white" }}
                            >
                                <Link
                                    to={`/detail/${fav.type}/${fav.uid}`}
                                    className="text-warning text-decoration-none"
                                >
                                    {fav.name}
                                </Link>
                                <button
                                    className="btn btn-sm btn-outline-danger ms-2 py-0"
                                    onClick={() => handleRemove(fav.uid, fav.type)}
                                >
                                    🗑
                                </button>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </nav>
    );
};
