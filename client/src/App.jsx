import { useState } from "react";
import "./App.css";
import Map from "./components/Map";
import PredictionForm from "./components/PredictionForm";
import PredictionResult from "./components/PredictionResult";


const App = () => {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to get prediction");
      }

      const data = await response.json();
      setPrediction(data);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>Earthquake Prediction System</h1>
        </header>
        <main>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <PredictionForm onSubmit={handleSubmit} loading={loading} />
                {error && <div className="alert alert-danger">{error}</div>}
                {prediction && <PredictionResult prediction={prediction} />}
              </div>
              <div className="col-md-6">
                <Map prediction={prediction} />
              </div>
            </div>
          </div>
        </main>
        <footer>
          <p>Earthquake Prediction Model - 2025</p>
        </footer>
      </div>
    </>
  );
};

export default App;
