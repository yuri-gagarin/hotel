import authRoutes from "./authRoutes";
import conversationRoutes from "./conversationRoutes";
import messageRoutes from "./messageRoutes";
import testRoutes from "./testRoutes";

export default function (router) {
  authRoutes(router);
  conversationRoutes(router);
  messageRoutes(router);
  testRoutes(router);
};