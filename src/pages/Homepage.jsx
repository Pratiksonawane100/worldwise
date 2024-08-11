import Nav from "../components/Nav";
import "../App.css"; // Import CSS file for Homepage styling
import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div>
      <div className="homepage">
        <div className="content">
          <Nav />
          <h1>Welcome to Traveling Content</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            consectetur justo at diam ultricies, vel eleifend lectus
            sollicitudin. Sed ac posuere felis. Phasellus mattis velit sit amet
            dolor porttitor, id vehicula orci hendrerit.
          </p>
          <p>
            Integer sed lacus non leo aliquam egestas. Morbi eu leo in nisl
            scelerisque laoreet a et neque. Fusce maximus, magna vel ultricies
            viverra, odio nisi lacinia ex, ac sollicitudin lectus nunc a purus.
          </p>
          <Link to="/login">
            <button>Start Tracking Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
