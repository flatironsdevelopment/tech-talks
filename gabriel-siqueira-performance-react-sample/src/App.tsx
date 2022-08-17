import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import ComponentBad from "./samples/scroll/componentBad";
import ComponentGood1 from "./samples/scroll/componentGood1";
import ComponentGood2 from "./samples/scroll/componentGood2";
import VideoPlayerBad from "./samples/videoPlayer/videoPlayerBad";
import VideoPlayerGood from "./samples/videoPlayer/videoPlayerGood";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={"/bad"} />} />
        <Route path="/bad" element={<ComponentBad />} />
        <Route path="/good-1" element={<ComponentGood1 />} />
        <Route path="/good-2" element={<ComponentGood2 />} />
        <Route path="/video-player-bad" element={<VideoPlayerBad />} />
        <Route path="/video-player-good" element={<VideoPlayerGood />} />
      </Routes>
    </Router>
  );
}

export default App;
