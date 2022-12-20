import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import BgVideo from "./static/bg-video.mp4"
import MainPageVideo from "./components/MainPageVideo";


function App() {
  return (
    <div>
      {/* Header */}
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
