import redis from "redis";

/**
 * @typedef {Object} RedisOpts 
 * @property {string} host - Redis host name
 * @property {string} port- Redis host PORT
 * @property {string} password - Redis host password
 */
/**
 * @typedef {Object} ClientData
 * @property {string} userId - Client user id
 * @property {string} socketId - Client user id
 */
/**
 * @typedef {Object} NewMessage
 * @property {string} _id - Message id
 * @property {string} conversationId - Message conversation id
 * @property {string} senderSocketId - Message sender socket id
 * @property {string} sender - Message sender type
 * @property {string} messageContent - Message content
 * @property {string} sentAt - Message sent at date ISO string
 */
/**
 * @typedef {Object} MessageData
 * @property {string} conversationId - Client convesation id
 * @property {string} userId - Client user id
 * @property {NewMessage} newMessage - Client newMessage object
 */


/**
 * Sets up a new Redis instance controller 
 * @param { ...RedisOpts } redisOpts - Connection options
 */
const RedisController = ((redisOpts) => {
  let redisInstance;
  (() => {
    redisInstance = redis.createClient({ ...redisOpts});
  })();

  /**
   * 
   * @param {ClientData} clientData - Client data from socket connection
   * @returns {Promise<string>}
   */
  const setClientCredentials = (clientData) => {
    const { userId, name, socketId } = clientData;
    const userKey = `CLIENT_${socketId}`;

    return new Promise((resolve, reject) => {
      redisInstance.HMSET(userKey, [ "userId", userId, "userName", name ], (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  };

  /**
   * 
   * @param {ClientData} clientData - Client data from socket connection
   * @returns {Promise<boolean>}
   */
  const removeClientCredentials = (clientData) => {
    const { socketId } = clientData;
    const userKey = `CLIENT_${socketId}`;
    return new Promise((resolve, reject) => {
      redisInstance.DEL(userKey, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  };

  /**
   * 
   * @param {ClientData} clientData - Client data from socket connection
   * @returns {Promise<string>}
   */
   const setAdminCredentials = (clientData) => {
    const { userId, socketId } = clientData;
    const userKey = `ADMIN_${socketId}:`;

    return new Promise((resolve, reject) => {
      redisInstance.HMSET(userKey, userId, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  };

  /**
   * @param {NewMessage} messageData - message data coming from client socketIO connection
   * @returns {Promise<string>}
   */
  const setNewMessage = (messageData) => {
    let conversationKey;
    const { conversationId, senderSocketId, messageContent } = messageData;

    if (!senderSocketId || !messageContent) {
      return Promise.reject(new Error("Invalid data"));
    }

    if (!conversationId) {
      conversationKey = `CONVERSATION_${senderSocketId}`;
    }

    return new Promise((resolve, reject) => {
      try {
        const stringifiedMsgData = JSON.stringify(messageData);

        redisInstance.LPUSH(conversationKey, stringifiedMsgData, (err, num) => {
          if (err) reject(err);
          console.log(113)
          console.log(num)
          resolve(num);
        });
      } catch (error) {
        console.error(error)
        reject(error);
      }
    });
  }

  return { setClientCredentials, removeClientCredentials, setAdminCredentials, setNewMessage  }

})();

export default RedisController;