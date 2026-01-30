import { Country } from "../components/Country";
import { Header } from "../components/Header";
import { UniversityLogos } from "../components/UniversityLogos";
import { ConnectForm } from "../components/ConnectForm";
import { Footer } from "../components/Footer";
import "../App.css";
import { FeatureLogos } from "../components/FeatureLogos";
import Particles from "react-tsparticles";


import { uniLogos } from "../universitylogos"
// import Slider from "./components/Slider";

export const Home = () => {
  const options = {
    particles: {
        "number": {
            "value": 50,
            "density": {
                "enable": true,
                "value_area": 500
            }
        },
      
        "color": {
            "value": "#b9cdf0"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#b9cdf0"
            },
            "polygon": {
                "nb_sides": 5
            },
        },
        "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
                "enable": false,
                "speed": 0.1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 3,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 6,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#b9cdf0",
            "opacity": 0.2,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 2,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        },
    }}
      
      return (
        
        <div className="App">
          <Particles params={options}/>
             <Header />
             <UniversityLogos />
              <Country />
            <UniversityLogos logos={30}/>
     
            <FeatureLogos />
            <ConnectForm />
            <Footer />
      </div>
      );
    
  }