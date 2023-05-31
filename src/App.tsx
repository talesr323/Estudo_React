import { Routes,Route } from "react-router-dom";
import { Repos } from "./pages/Repos";

export function App() {
  return(
    <Routes>
      <Route path="/" element={<Repos />} />
      <Route path="/repos/*" element={<Repos />} />
    </Routes>
  )
}