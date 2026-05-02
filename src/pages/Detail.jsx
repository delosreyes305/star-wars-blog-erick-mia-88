import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const Detail = () => {
    const { type, uid } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const response = await fetch(`https://www.swapi.tech/api/${type}/${uid}`);
                const data = await response.json();
                setItem(data.result);
            } catch (error) {
                console.error("Error fetching detail:", error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchDetail();
        
    }, [type, uid]);

    const getImageUrl = () => {
        return `https://starwars-visualguide.com/assets/img/${type}/${uid}.jpg`;
    };

    if (loading) {
        return (
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: "100vh", backgroundColor: "#1a1a2e" }}
            >
                <h4 className="text-warning">Loading...</h4>
            </div>
        );
    }

    if (!item) {
        return (
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: "100vh", backgroundColor: "#1a1a2e" }}
            >
                <h4 className="text-danger">Not found.</h4>
            </div>
        );
    }

    const properties = item.properties || {};
    const name = properties.name || item.description || "Unknown";

    return (
        <div
            style={{ backgroundColor: "#1a1a2e", minHeight: "100vh", color: "white" }}
        >
            <div className="container py-5">

                {/* Back button */}
                <button
                    className="btn btn-outline-warning mb-4"
                    onClick={() => navigate(-1)}
                >
                    ← Back
                </button>

                <div className="row g-5 align-items-center">

                    {/* Image */}
                    <div className="col-md-4 text-center">
                        <img
                            src={getImageUrl()}
                            alt={name}
                            className="img-fluid rounded shadow"
                            style={{ maxHeight: "400px", objectFit: "cover" }}
                            onError={(e) => {
                                e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
                            }}
                        />
                    </div>

                    {/* Info */}
                    <div className="col-md-8">
                        <h1 className="text-warning fw-bold mb-4">{name}</h1>
                        <div className="row g-3">
                            {Object.entries(properties)
                                .filter(([key]) => !["url", "created", "edited"].includes(key))
                                .map(([key, value]) => (
                                    <div className="col-md-6" key={key}>
                                        <div className="p-3 rounded" style={{ backgroundColor: "#16213e" }}>
                                            <small className="text-warning text-uppercase fw-bold">{key.replace(/_/g, " ")}</small>
                                            <p className="mb-0 mt-1">{value || "n/a"}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
