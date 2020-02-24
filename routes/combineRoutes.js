import authRoutes from "./authRoutes";
import conversationRoutes from "./conversationRoutes";
import messageRoutes from "./messageRoutes";
import roomImageRoutes from "./roomImageRoutes";
import testRoutes from "./testRoutes";

export default function (router) {
  authRoutes(router);
  conversationRoutes(router);
  messageRoutes(router);
  roomImageRoutes(router);
  //testRoutes(router);
};