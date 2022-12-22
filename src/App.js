import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import BgVideo from "./static/bg-video.mp4"
import MainPageVideo from "./components/MainPageVideo";


function App() {
  return (
    <div className="h-screen overflow-y-auto">
      {/* Header */}
      <Header />
      <main className="">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
