import "./App.scss";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { Route, Router, Routes } from "@solidjs/router";
import Common from "./common/Common";
import Temperatures from "./temperatures/Temperatures";
import { Cpu } from "./cpu/Cpu";
import { Disks } from "./disks/Disks";
import Network from "./network/network";
import { Processes } from "./processes/Processes";

function App() {
  return (
    <div class="app-root">
      <Router>
        <Header />
        <main>
          <div class="container">
            <Routes>
              <Route path="/" component={Common} />
              <Route path="/cpu" component={Cpu} />
              <Route path="/temperatures" component={Temperatures} />
              <Route path="/disks" component={Disks} />
              <Route path="/network" component={Network} />
              <Route path="/processes" component={Processes} />
            </Routes>
          </div>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
