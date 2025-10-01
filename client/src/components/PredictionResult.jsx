
const PredictionResult = ({ prediction }) => {
  if (!prediction) return null;

  return (
    <>
      <div className="card">
        <div className="card-header bg-info text-white">
          <h3>Prediction Results</h3>
        </div>
        <div className="card-body">
          <table className="table">
            <tbody>
              <tr>
                <th>Location:</th>
                <td>
                  {prediction.latitude}, {prediction.longitude}
                </td>
              </tr>
              <tr>
                <th>Date:</th>
                <td>{prediction.date}</td>
              </tr>
              <tr>
                <th>Predicted Magnitude:</th>
                <td>
                  <span
                    className={`badge ${getMagnitudeClass(
                      prediction.prediction.magnitude
                    )}`}
                  >
                    {prediction.prediction.magnitude}
                  </span>
                </td>
              </tr>
              <tr>
                <th>Predicted Depth:</th>
                <td>{prediction.prediction.depth} km</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

// Helper function to determine color class based on magnitude
function getMagnitudeClass(magnitude) {
  if (magnitude < 4) return "bg-success";
  if (magnitude < 6) return "bg-warning";
  return "bg-danger";
}

export default PredictionResult;
