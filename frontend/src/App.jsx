import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import AskModel from "./pages/AskModel";
import TrainData from "./pages/TrainData";
import KnowledgeBase from "./pages/KnowledgeBase";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/ask" replace />} />
        <Route path="/ask" element={<AskModel />} />
        <Route path="/train" element={<TrainData />} />
        <Route path="/knowledge" element={<KnowledgeBase />} />
        <Route path="*" element={<Navigate to="/ask" replace />} />
      </Route>
    </Routes>
  );
}
