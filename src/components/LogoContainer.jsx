import logo1 from "../Images/logo1.png";
import logo2 from "../Images/logo2.png";
import logo3 from "../Images/logo3.png";
import logo4 from "../Images/logo4.png";
import logo5 from "../Images/logo5.png";
import logo6 from "../Images/logo6.png";
import logo7 from "../Images/logo7.png";
import "../styles/logo.css";

export const LogoContainer = () => {
  return (
    <div className="relative w-full">
      <div className="image">
        <div>
          <img className="w-32 py-4" src={logo1} alt="logo" />
        </div>
        <div>
          <img className="w-32 py-4" src={logo2} alt="logo" />
        </div>
        <div>
          <img className="w-32 py-4" src={logo3} alt="logo" />
        </div>
        <div>
          <img className="w-32 py-4" src={logo4} alt="logo" />
        </div>
        <div>
          <img className="w-32 py-4" src={logo5} alt="logo" />
        </div>
        <div>
          <img className="w-32 py-4" src={logo6} alt="logo" />
        </div>
        <div>
          <img className="w-32 py-4" src={logo7} alt="logo" />
        </div>
        <div>
          <img className="w-32 py-4" src={logo1} alt="logo" />
        </div>
        <div>
          <img className="w-32 py-4" src={logo2} alt="logo" />
        </div>
        <div>
          <img className="w-32 py-4" src={logo3} alt="logo" />
        </div>
      </div>
    </div>
  );
};
