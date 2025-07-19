const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  PROFILE: "/profile",
  CHATS: "/chats",
  CHAT: (id: string) => `/chats/${id}`,
};

export default ROUTES;
