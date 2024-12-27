import React from "react"; // Importing the necessary modules from React library
import { Link } from "react-router-dom"; // Importing the Link component from react-router-dom library
import "./LandingPage.css"; // Importing the CSS styles for the Landing_Page component

// Defining the Function component Landing_Page
const Landing_Page = () => {
  return (
    <section className="hero-section"> {/* Creating a section with class name 'hero-section' */}
      <div>
        <div data-aos="fade-up" className="flex-hero"> {/* Creating a div with data-aos attribute and class name 'flex-hero' */}
            
            <h1>
              Your Health<br/>

              <span className="text-gradient">
                
                Our Responsibility
              </span>
            </h1>
              <div class="blob-cont"> {/* Creating a div with class name 'blob-cont' */}
                  <div class="blue blob"></div> {/* Creating a blue blob inside the 'blob-cont' div */}
              </div>
              <div class="blob-cont"> {/* Creating another div with class name 'blob-cont' */}
                  <div class="blue1 blob"></div> {/* Creating a different blue blob inside the second 'blob-cont' div */}
              </div>
            <h4>
              Welcome to StayHealthy, where your well-being is our top priority. We are dedicated to providing you with the best healthcare services, ensuring that you receive the care and attention you deserve. Join us on a journey to better health and a brighter future.
            </h4>
            <a href="#services"> {/* Creating a hyperlink to jump to the 'services' section */}
              <button class="button">Get Started</button> {/* Creating a button with class name 'button' */}
            </a>
        </div>
      </div>
    </section>
  );
};

export default Landing_Page; // Exporting the Landing_Page component to be used in other parts of the application