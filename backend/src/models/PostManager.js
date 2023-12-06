const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "posts" });
  }

  insert(posts) {
    return this.database.query(
      `insert into ${this.table} (title, description, img, date, userid) values (?, ?, ?, ?, ?)`,
      [posts.title, posts.description, posts.img, posts.date, posts.userid]
    );
  }

  update(posts) {
    return this.database.query(
      `update ${this.table} set   title = ?, description= ?  where id = ?`,
      [posts.title, posts.description, posts.id]
    );
  }

  findPost(id) {
    return this.database.query(
      `SELECT p.*, u.firstname from user  as u
      JOIN posts as p ON p.userid = u.id
      WHERE p.id = ?;
    `,
      [id]
    );
  }

  deletePost(userId, postId) {
    return this.database.query(
      `DELETE FROM posts WHERE userid = ? AND id = ?`,
      [userId, postId]
    );
  }
}
module.exports = UserManager;
