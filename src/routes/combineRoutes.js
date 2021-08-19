import authRoutes from "./authRoutes";
import contactPostRoutes from "./contactPostRoutes";
import conversationRoutes from "./conversationRoutes";
import messageRoutes from "./messageRoutes";
// room models and images //
import roomImageRoutes from "./roomImageRoutes";
import roomRoutes from "./roomRoutes";
// service models and images //
import serviceImageRoutes from "./serviceImageRoutes";
import serviceRoutes from "./serviceRoutes";
// dining models and images //
import diningRoutes from "./diningRoutes";
import diningImageRoutes from "./diningImageRoutes";
import menuImageRoutes from "./menuImageRoutes";
// news posts routes //
import newsPostsRoutes from "./newsPostsRoutes";
import newsPostImageRouter from "./newsPostImageRouters";
// mailer //
import mailRoutes from "./mailRoutes";
// test routes
import testRoutes from "./testRoutes";

export default function (router) {
  authRoutes(router);
  contactPostRoutes(router);
  conversationRoutes(router);
  diningRoutes(router);
  diningImageRoutes(router);
  mailRoutes(router);
  menuImageRoutes(router);
  messageRoutes(router);
  newsPostsRoutes(router);
  newsPostImageRouter(router);
  roomImageRoutes(router);
  roomRoutes(router);
  serviceImageRoutes(router);
  serviceRoutes(router);
  testRoutes(router);
}