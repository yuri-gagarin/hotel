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
 * @typedef {Object} VisibleAdminData 
 * @property {number} numberOfVisibleAdmins - Number of admins visible
 * @property {Array<string>} visibleAdminSocketIds -Visible admin socket ids
/**
 * @typedef {Object} AdminMessengerStatus
 * @property {boolean} online - Messenger online status
 * @property {string} socketId - Admin user socket id
 * @property {number} numberAdded - Number added to online array
 * @property {number} numberRemoved - Number removed from online array
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
   * 
   * @param {string} socketId - admin socket id to add to visible list
   * @returns {Promise<AdminMessengerStatus>} 
   */
  const setNewVisibleAdmin = (socketId) => {
    const listKey = "VISIBLE_ADMINS";
    return new Promise((resolve, reject) => {
      redisInstance.LPUSH(listKey, socketId, (err, num) => {
        if (err) reject(err);
        console.log(num, socketId)
        resolve({ numberAdded: num, socketId: socketId });
      });
    });
  };
  /**
   * 
   * @param {string} socketId - admin socket id to remove from the visible list
   * @returns {Promise<AdminMessengerStatus>} 
   */
  const removeVisibleAdmin = (socketId) => {
    const listKey = "VISIBLE_ADMINS";
    return new Promise((resolve, reject) => {
      redisInstance.LREM(listKey, 0, socketId, (err, num) => {
        if (err) reject(err);
        resolve({ numberRemoved: num, socketId: socketId });
      });
    });
  };
  /**
   * 
   * @returns {Promise<VisibleAdminData>}
   */
  const getVisibleAdmins = () => {
    const listKey = "VISIBLE_ADMINS";
    return new Promise((resolve, reject) => {
      redisInstance.LLEN(listKey, (err, num) => {
        if (err) reject(err);
        if (num === 0) {
          resolve({ numberOfVisibleAdmins: 0, visibleAdminSocketIds: [] });
        } else {
          redisInstance.LRANGE(listKey, 0, -1, (err, socketIds) => {
            if (err) reject(err);
            resolve({ numberOfVisibleAdmins: num, visibleAdminSocketIds: socketIds });
          })
        }
      });
    });
  };
  /**
   * @param {NewMessage} messageData - message data coming from client socketIO connection
   * @returns {Promise<string>}
   */
  const setNewMessage = (messageData) => {
    let conversationKey;
    const { senderSocketId, messageContent } = messageData;

    if (!senderSocketId || !messageContent) {
      return Promise.reject(new Error("Invalid data"));
    }

    conversationKey = `CONVERSATION_${senderSocketId}`;

    return new Promise((resolve, reject) => {
      try {
        const stringifiedMsgData = JSON.stringify(messageData);

        redisInstance.LPUSH(conversationKey, stringifiedMsgData, (err, num) => {
          if (err) reject(err);
          resolve(num);
        });
      } catch (error) {
        console.error(error)
        reject(error);
      }
    });
  }

  return { setClientCredentials, removeClientCredentials, setAdminCredentials, setNewMessage, setNewVisibleAdmin, removeVisibleAdmin, getVisibleAdmins };

})();

export default RedisController;