import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChatModule } from "../modules/private";
import ROUTES from "@/constants/routes";
import { Login } from "@/modules/public/auth";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.CHATS} element={<ChatModule />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.CHAT(":id")} element={<ChatModule />} />
      </Routes>
    </BrowserRouter>
  );
};
