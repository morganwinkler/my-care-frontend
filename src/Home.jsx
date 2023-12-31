/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export function Home(props) {
  return (
    <div>
      <div>
        <button>+ New Visit</button>
      </div>
      <h2>My Visits</h2>
      {props.visits && props.visits.length > 0 ? (
        props.visits.map((visit) => (
          <div key={visit.id}>
            <p>Reason for admission: {visit.reason}</p>
            <p>Hospital: {visit.hospital}</p>
            <p>Admission Date: {visit.start_date}</p>
            <button>
              <Link to={`visits/${visit.id}`}>More Info</Link>
            </button>
          </div>
        ))
      ) : (
        <p>You do not have any visits yet</p>
      )}
    </div>
  );
}
