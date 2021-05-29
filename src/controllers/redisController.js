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
 * @property {string} name - Client name
 * @property {string} email - Client email
 * @property {string} socketId - Client user id
 */
/**
 * @typedef {Object} VisibleAdminData 
 * @property {number} numberOfVisibleAdmins - Number of admins visible
 * @property {Array<string>} visibleAdminSocketIds -Visible admin socket ids
 */
/**
 * @typedef {Object} ConnectedClientData 
 * @property {number} numberOfConnectedClients = nnumber of connected clients
 * @property {Array<string>} visibleClientSocketIds -Visible client socket ids
 * @property {Array<string>} clientsDataArr -Visible clients data
 */
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
  const clientsSetKey = `CONNECTED_CLIENTS_SET`;
  const clientsHashMapKey = `CLIENT_DATA_HASH`;

  (() => {
    redisInstance = redis.createClient({ ...redisOpts});
  })();

  /**
   * 
   * @param {ClientData} clientData - Client data from socket connection
   * @returns {Promise<string>}
   */
  const setClientCredentials = (clientData) => {
    const { socketId } = clientData;
    const userKey = `CONNECTED_CLIENTS_SET`;
    const hashMapKey = `CLIENT_DATA_HASH`;

    return new Promise((resolve, reject) => {
      const stringifiedData = JSON.stringify(clientData);
      redisInstance.SADD(userKey, socketId,  (err, res) => {
        if (err) return reject(err);
        redisInstance.HMSET(hashMapKey, [ socketId, stringifiedData ], (err, res) => {
          if (err) return reject(err);
          return resolve(res);
        })
      });
    });
  };

  /**
   * 
   * @param {string} socketId - Socket Id string
   * @returns {Promise<boolean>}
   */
  const removeClientCredentials = (socketId) => {
  
    return new Promise((resolve, reject) => {
      redisInstance.SREM(clientsSetKey, socketId, (err, res) => {
        if (err) return reject(err);
        redisInstance.HDEL(clientsHashMapKey, socketId, (err, res) => {
          if (err) return reject(err);
          return resolve(true);
        })
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
        if (err) return reject(err);
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
        if (err) return reject(err);
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
        if (err) return reject(err);
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
        if (err) return reject(err);
        if (num === 0) {
          return resolve({ numberOfVisibleAdmins: 0, visibleAdminSocketIds: [] });
        } else {
          redisInstance.LRANGE(listKey, 0, -1, (err, socketIds) => {
            if (err) return reject(err);
            return resolve({ numberOfVisibleAdmins: num, visibleAdminSocketIds: socketIds });
          })
        }
      });
    });
  };
  /**
   * Gets all visible connected guest clients
   * @returns {Promise<ConnectedClientData>}
   */
  const getConnectedClients = () => {
    return new Promise((resolve, reject) => {
      redisInstance.SCARD(clientsSetKey, (err, num) => {
        if (err) return reject(err);
        if (num === 0) {
          return resolve({ numberOfConnectedClients: 0, visibleClientSocketIds: [], clientsDataArr: [] });
        } else {
          redisInstance.SMEMBERS(clientsSetKey, (err, socketIds) => {
            if (err) return reject(err);
            redisInstance.HVALS(clientsHashMapKey, (err, data) => {
              if (err) return reject(err);
              return resolve({ numberOfConnectedClients: num, visibleClientSocketIds: socketIds, clientsDataArr: data });
            });
          });
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

  return { setClientCredentials, removeClientCredentials, setAdminCredentials, setNewMessage, setNewVisibleAdmin, removeVisibleAdmin, getVisibleAdmins, getConnectedClients };

})();

export default RedisController;