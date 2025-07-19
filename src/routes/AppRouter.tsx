import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChatModule } from "../modules/private";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChatModule />} />
      </Routes>
    </BrowserRouter>
  );
};
