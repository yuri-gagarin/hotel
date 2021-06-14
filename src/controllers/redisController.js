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
 * @typedef {Object} RemoveClientResponse
 * @property {number} numOfClientHashesRemoved - number of client hashes removed
 * @property {number} numOfClientSocketIdsRemoved - number of client socket ids removed
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
  const CONVERSATION_DETAILS_HASH_MAP_KEY = `CONVERSATION_HASH`;
  const visibleAdminsSetKey = `VISIBLE_ADMINS_SET`;

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

    return new Promise((resolve, reject) => {
      const stringifiedData = JSON.stringify(clientData);
      redisInstance.SADD(clientsSetKey, socketId,  (err) => {
        if (err) return reject(err);
        redisInstance.HMSET(clientsHashMapKey, [ socketId, stringifiedData ], (err, res) => {
          if (err) return reject(err);
          return resolve(res);
        })
      });
    });
  };

  /**
   * 
   * @param {string} socketId - Socket Id string
   * @returns {Promise< RemoveClientResponse>}
   */
  const removeClientCredentials = (socketId) => {
  
    return new Promise((resolve, reject) => {
      redisInstance.SREM(clientsSetKey, socketId, (err, numSocketRem) => {
        if (err) return reject(err);
        redisInstance.HDEL(clientsHashMapKey, socketId, (err, numHashRem) => {
          if (err) return reject(err);
          return resolve({ numOfClientSocketIdsRemoved: numSocketRem, numOfClientHashesRemoved: numHashRem });
        });
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
    return new Promise((resolve, reject) => {
      redisInstance.SADD(visibleAdminsSetKey, socketId, (err, num) => {
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
    return new Promise((resolve, reject) => {
      redisInstance.SREM(visibleAdminsSetKey, socketId, (err, num) => {
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
    return new Promise((resolve, reject) => {
      redisInstance.SCARD(visibleAdminsSetKey, (err, num) => {
        if (err) return reject(err);
        if (num === 0) {
          return resolve({ numberOfVisibleAdmins: 0, visibleAdminSocketIds: [] });
        } else {
          redisInstance.SMEMBERS(visibleAdminsSetKey, (err, socketIds) => {
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
   * @description Sets new conversation data if needed
   * @param {NewMessage} messageData 
   * @returns {Promise}
   */
  const setConversationData = (conversationData) => {
    const { conversationId, receiverSocketId, conversationName = "Anonymous", archived, createdAt } = conversationData;
    const hashkey = `${CONVERSATION_DETAILS_HASH_MAP_KEY}_${conversationId}`;

    return new Promise((resolve, reject) => {
      redisInstance.EXISTS(hashkey, (err, res) => {
        if (err) return reject(err);
        if (res === 0) {
          // create a new conversation info hash //
          const hashData = [ "conversationId", conversationId, "receiverSocketId", receiverSocketId, "conversationName", conversationName, "archived", archived, "createdAt", createdAt ];
          redisInstance.HMSET(hashkey, ...hashData, (err, res) => {
            if(err) return reject(err);
            return resolve(res);
          })
        } else {
          return resolve("OK");
        }
      });
    });
  };

  /**
   * @param {NewMessage} messageData - message data coming from client socketIO connection
   * @returns {Promise<string>}
   */
  const setNewMessage = (messageData) => {
    const { messageContent, conversationId } = messageData;

    if (!messageContent) {
      return Promise.reject(new Error("Invalid data"));
    }


    return new Promise((resolve, reject) => {
      try {
        const stringifiedMsgData = JSON.stringify(messageData);

        redisInstance.RPUSH(conversationId, stringifiedMsgData, (err, num) => {
          if (err) reject(err);
          resolve(num);
        });
      } catch (error) {
        console.error(error)
        reject(error);
      }
    });
  };

  /**
   * 
   * @param {string} conversationId - conversationId string for Redis client LIST key
   * @returns {Promise<number>}
   */
  const removeConversationData = (conversationId) => {
    return new Promise((resolve, reject) => {
      redisInstance.DEL(conversationId, (err, number) => {
        if (err) return reject(err);
        return resolve(number);
      });
    });
  };

  /**
   * @param {string} keyBeginning - the beginning strikg of 'key' to match 
   * @returns {Promise<Array<string>>}
   */
  const getKeys = (keyBeginning) => {
    const keyPattern = keyBeginning.toUpperCase() + "_*";
    return new Promise((resolve, reject) => {
      redisInstance.KEYS(keyPattern, (err, vals) => {
        if (err) return reject(err);
        return resolve(vals);
      });
       
    });
  };

  /**
   * 
   * @param {Array<string>} keys Array of Redis HASHMAP keys to access
   * @returns {Array<Promise<Object>>}
   */
  const getConversationHashes = (keys) => {
    if (Array.isArray(keys) && keys.length > 0) {
      const dataPromises = [];
      for (const key of keys) {
        dataPromises.push(new Promise((resolve, reject) => {
          redisInstance.HGETALL(key,(error, data) => {
            if (error) return reject(error);
            return resolve(data);
          })
        }))
      }
      return Promise.all(dataPromises);
    } else {
      return Promise.resolve([]);
    }
  };

  const getConversationMessages = (conversationId) => {
    return new Promise((resolve, reject) => {
      redisInstance.LRANGE(conversationId, 0, -1, (err, data) => {
        if (err) return reject(err);
        return resolve({ conversationId, messages: data });
      });
    });
  };

  return { 
    setClientCredentials, removeClientCredentials, setAdminCredentials, 
    setConversationData, setNewMessage, 
    setNewVisibleAdmin, removeVisibleAdmin, getVisibleAdmins, 
    getConnectedClients, removeConversationData, getKeys, getConversationHashes, getConversationMessages
  };

})();

export default RedisController;