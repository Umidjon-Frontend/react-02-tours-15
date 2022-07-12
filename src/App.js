import React, { useState, useEffect } from "react";
import Loading from "./Components/Loading";
import "./App.css";
import Tours from "./Components/Tours";

const url = "https://course-api.com/react-tours-project";

function App() {
    const [loading, setLoading] = useState(true);
    const [tours, setTours] = useState([]);

    const fetchTourData = async () => {
        setLoading(true);
        try {
            const response = await fetch(url);
            const data = await response.json();
            setLoading(false);
            setTours(data);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    useEffect(() => {
        fetchTourData();
    }, []);

    const deleteTour = (id) => {
        const newFilterTour = tours.filter((tour) => tour.id !== id);
        setTours(newFilterTour);
    };

    if (loading) {
        return (
            <main>
                <Loading />
            </main>
        );
    }

    if (tours.length === 0) {
        return (
            <main>
                <div className="title">
                    <h2>no tours left</h2>
                    <button className="btn" onClick={() => fetchTourData()}>
                        refresh
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main>
            <Tours tours={tours} deleteTour={deleteTour} />
        </main>
    );
}

export default App;
