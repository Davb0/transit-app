import React, { useState, useEffect } from "react";
import { getTransitData } from "../services/transitAPI";

const TransitList = () => {
  const [transitData, setTransitData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch transit data when the component mounts
    const fetchData = async () => {
      const data = await getTransitData();
      setTransitData(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Transit Arrivals</h2>
      <ul>
        {transitData.map((item, index) => (
          <li key={index}>
            <strong>Route:</strong> {item.route} <br />
            <strong>Arrival Time:</strong> {item.arrival_time} <br />
            <strong>Stop:</strong> {item.stop_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransitList;
