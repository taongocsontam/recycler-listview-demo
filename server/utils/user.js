const users = [];
/**
 * Join use Chat.
 */
function userJoin(id, username, room) {
  const newUser = { id, username, room };
  users.push(newUser);
  return newUser;
}

/**
 * Get current user.
 */
function getCurrentUser(id) {
  return users.find((user) => user.id == id);
}

/**
 * User leave Chat.
 */
function userLeaveChat(id) {
  const index = users.findIndex((user) => user.id == id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

/**
 * Get room user.
 */
function getRoomUser(room) {
  return users.find((user) => user.room == room);
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeaveChat,
  getRoomUser,
};
