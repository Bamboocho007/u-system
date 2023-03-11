import "./App.scss";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { Route, Router, Routes } from "@solidjs/router";
import Common from "./common/Common";
import Temperatures from "./temperatures/Temperatures";
import { Cpu } from "./cpu/Cpu";

function App() {
  return (
    <div class="app-root container">
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" component={Common} />
            <Route path="/cpu" component={Cpu} />
            <Route path="/temperatures" component={Temperatures} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
