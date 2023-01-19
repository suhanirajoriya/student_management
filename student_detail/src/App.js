import MainPage from "./component/MainPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div>
    <Router>
      <Routes>
    
        <Route element={<MainPage/>} path="/*"/>
      </Routes>
     </Router> 

      
    </div>
  );
}

export default App;
