import Portfolio from "./Components/Portfolio";
import Experience from "./Components/Experience";
import About  from "./Components/About";
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import SocialLinks from "./Components/SocialLinks";
import Contacts from './Components/Contacts'
function App() {
  return (
    <div>
      <NavBar />
      <Home />
      <SocialLinks />
      <About/>
      <Portfolio/>
      <Experience/>
      <Contacts/>
    </div>
  );
}

export default App;
