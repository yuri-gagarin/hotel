import authRoutes from "./authRoutes";
import contactPostRoutes from "./contactPostRoutes";
import conversationRoutes from "./conversationRoutes";
import messageRoutes from "./messageRoutes";
import roomImageRoutes from "./roomImageRoutes";
import roomRoutes from "./roomRoutes";
import testRoutes from "./testRoutes";

export default function (router) {
  authRoutes(router);
  contactPostRoutes(router);
  conversationRoutes(router);
  messageRoutes(router);
  roomImageRoutes(router);
  roomRoutes(router);
  //testRoutes(router);
};