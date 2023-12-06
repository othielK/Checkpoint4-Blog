const models = require("../models");

const browse = (req, res) => {
  models.posts
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const selectPost = (req, res) => {
  models.posts
    .findPost(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const { title, description, date, userid } = req.body;
  // eslint-disable-next-line prettier/prettier
  const { files } = req;
  const img = files.img[0].filename;

  const post = {
    title,
    description,
    img,
    date,
    userid,
  };

  console.info("post :: ", post);
  // TODO validations (length, format...)

  models.posts
    .insert(post)
    .then(([result]) => {
      console.info(result);
      res.status(200).json({ message: "post crée avec succès" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        error: err.errno,
      });
    });
};

const delPost = (req, res) => {
  const { userId, postId } = req.params;
  models.posts
    .deletePost(userId, postId)
    .then(() => {
      res.status(200).json({ message: "Post supprimée " });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        error: err.errno,
      });
    });
};

const checkUpload = (req, res) => {
  res.status(200).send("fichier téléchargé");
};

const edit = (req, res) => {
  // const id = req.params;
  const post = req.body;

  // TODO validations (length, format...)

  post.id = parseInt(req.params.id, 10);

  models.posts
    .update(post)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  selectPost,
  add,
  delPost,
  checkUpload,
  edit,
};
