import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Card } from "../components/Card.jsx";

export const Home = () => {
    const { store, dispatch } = useGlobalReducer();

    useEffect(() => {
        // ── Fetch Characters ──
        const fetchCharacters = async () => {
            try {
                const response = await fetch("https://www.swapi.tech/api/people?page=1&limit=10");
                const data = await response.json();
                dispatch({ type: "set_characters", payload: data.results });
            } catch (error) {
                console.error("Error fetching characters:", error);
            }
        };

        // ── Fetch Planets ──
        const fetchPlanets = async () => {
            try {
                const response = await fetch("https://www.swapi.tech/api/planets?page=1&limit=10");
                const data = await response.json();
                dispatch({ type: "set_planets", payload: data.results });
            } catch (error) {
                console.error("Error fetching planets:", error);
            }
        };

        // ── Fetch Vehicles ──
        const fetchVehicles = async () => {
            try {
                const response = await fetch("https://www.swapi.tech/api/vehicles?page=1&limit=10");
                const data = await response.json();
                dispatch({ type: "set_vehicles", payload: data.results });
            } catch (error) {
                console.error("Error fetching vehicles:", error);
            }
        };

        fetchCharacters();
        fetchPlanets();
        fetchVehicles();
    }, []);

    const getImageUrl = (type, uid) => {
        const typeMap = {
            characters: "characters",
            planets: "planets",
            vehicles: "vehicles"
        };
        return `https://starwars-visualguide.com/assets/img/${typeMap[type]}/${uid}.jpg`;
    };

    const renderSection = (title, items, type) => (
        <div className="mb-5">
            <h2 className="text-warning mb-3">{title}</h2>
            <div
                className="d-flex gap-3 pb-3"
                style={{ overflowX: "auto" }}
            >
                {items.length === 0 ? (
                    <p className="text-muted">Loading...</p>
                ) : (
                    items.map((item) => (
                        <Card
                            key={item.uid}
                            uid={item.uid}
                            name={item.name}
                            type={type}
                            imageUrl={getImageUrl(type, item.uid)}
                        />
                    ))
                )}
            </div>
        </div>
    );

    return (
        <div
            className="container-fluid px-4 py-5"
            style={{ backgroundColor: "#1a1a2e", minHeight: "100vh", color: "white" }}
        >
            <h1 className="text-center text-warning mb-5 display-4 fw-bold">
                Star Wars Blog
            </h1>

            {renderSection("Characters", store.characters, "characters")}
            {renderSection("Planets", store.planets, "planets")}
            {renderSection("Vehicles", store.vehicles, "vehicles")}
        </div>
    );
};
