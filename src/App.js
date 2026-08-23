import Portfolio from "./Components/Portfolio";
import Experience from "./Components/Experience";
import About from "./Components/About";
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import SocialLinks from "./Components/SocialLinks";
import Contacts from "./Components/Contacts";
import Footer from "./Components/Footer";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <NavBar />
      <Home />
      <SocialLinks />
      <About />
      <Portfolio />
      <Experience />
      <Contacts />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
