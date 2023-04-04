const db = require("../../data/db-config");
/**
  tüm kullanıcıları içeren bir DİZİ ye çözümlenir, tüm kullanıcılar { user_id, username } içerir
 */
async function bul() {
  const allUsers = await db("users");
  const allUsersResponse = allUsers.map((item) => {
    return { user_id: item.user_id, username: item.username };
  });
  return allUsersResponse;
}

/**
  verilen filtreye sahip tüm kullanıcıları içeren bir DİZİ ye çözümlenir
 */
async function goreBul(filtre) {
  let filteredUsers = await db("users").where(filtre);
  return filteredUsers;
}

/**
  verilen user_id li kullanıcıya çözümlenir, kullanıcı { user_id, username } içerir
 */
async function idyeGoreBul(user_id) {
  let users = await db("users").where("user_id", user_id);
  return { user_id: user.user_id, username: user.username };
}

/**
  yeni eklenen kullanıcıya çözümlenir { user_id, username }
 */
async function ekle(user) {
  let insertedId = await db("users").insert(user);
  let insertedUser = await idyeGoreBul(insertedId);
  return insertedUser;
}
// Diğer modüllerde kullanılabilmesi için fonksiyonları "exports" nesnesine eklemeyi unutmayın.
module.exports = { bul, goreBul, idyeGoreBul, ekle };
