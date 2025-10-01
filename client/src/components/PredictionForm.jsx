import { useState } from "react";

const PredictionForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    latitude: "",
    longitude: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <>
      <div className="card mb-4">
        <div className="card-header">
          <h3>Enter Location Coordinates</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="latitude">Latitude:</label>
              <input
                type="number"
                step="any"
                id="latitude"
                name="latitude"
                className="form-control"
                value={formData.latitude}
                onChange={handleChange}
                required
                min="-90"
                max="90"
                placeholder="Enter latitude (-90 to 90)"
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="longitude">Longitude:</label>
              <input
                type="number"
                step="any"
                id="longitude"
                name="longitude"
                className="form-control"
                value={formData.longitude}
                onChange={handleChange}
                required
                min="-180"
                max="180"
                placeholder="Enter longitude (-180 to 180)"
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="date">Date (optional):</label>
              <input
                type="date"
                id="date"
                name="date"
                className="form-control"
                value={formData.date}
                onChange={handleChange}
              />
              <br />
              <small className="form-text text-muted">
                If not specified, current date will be used
              </small>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Predicting..." : "Predict Earthquake"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PredictionForm;
