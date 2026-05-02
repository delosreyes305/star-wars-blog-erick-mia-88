import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Card } from "../components/Card.jsx";

export const Home = () => {
    const { store, dispatch } = useGlobalReducer();

    useEffect(() => {
        const fetchAll = async () => {
            try {
                // ── Characters ──
                const resChar = await fetch("https://www.swapi.tech/api/people?page=1&limit=10");
                const dataChar = await resChar.json();
                // SWAPI returns name inside properties for some endpoints
                // results array has: { uid, name, url }
                dispatch({ type: "set_characters", payload: dataChar.results });
            } catch (e) { console.error("Characters error:", e); }

            try {
                // ── Planets ──
                const resPlan = await fetch("https://www.swapi.tech/api/planets?page=1&limit=10");
                const dataPlan = await resPlan.json();
                dispatch({ type: "set_planets", payload: dataPlan.results });
            } catch (e) { console.error("Planets error:", e); }

            try {
                // ── Vehicles ──
                const resVeh = await fetch("https://www.swapi.tech/api/vehicles?page=1&limit=10");
                const dataVeh = await resVeh.json();
                dispatch({ type: "set_vehicles", payload: dataVeh.results });
            } catch (e) { console.error("Vehicles error:", e); }
        };

        fetchAll();
    }, []);

    const renderSection = (title, items, type) => (
        <div className="mb-5">
            <h2 className="text-warning mb-3 border-bottom border-warning pb-2">
                {title}
            </h2>
            <div className="d-flex gap-3 pb-3" style={{ overflowX: "auto" }}>
                {items.length === 0 ? (
                    <p className="text-muted fst-italic">Loading {title.toLowerCase()}...</p>
                ) : (
                    items.map((item) => (
                        <Card
                            key={item.uid}
                            uid={item.uid}
                            name={item.name}
                            type={type}
                        />
                    ))
                )}
            </div>
        </div>
    );

    return (
        <div
            className="px-4 py-5"
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
