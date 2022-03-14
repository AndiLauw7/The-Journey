const { bookmark, user, journey } = require("../../models");

exports.getBookmarks = async (req, res) => {
  try {
    const bookmarks = await bookmark.findAll({
      attributes: {
        exclude: ["createAt", "updateAt"],
      },

      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createAt", "updateAt"],
          },
        },
        {
          model: journey,
          as: "journey",
          attributes: {
            exclude: ["createAt", "updateAt"],
          },
        },
      ],
    });
    res.send({
      status: "Succes",
      bookmarks,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Failed",
      message: "Server Eror",
    });
  }
};

exports.getBookmark = async (req, res) => {
  try {
    const { id } = req.params;
    let data = await bookmark.findAll({
      where: {
        iduser: id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "iduser", "idjourney"],
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: journey,
          as: "journey",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    });

    data = JSON.parse(JSON.stringify(data));
    data = data.map((item) => {
      return {
        ...item,
        image: process.env.FILE_PATH + item.image,
      };
    });
    res.send({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.deleteMybookmark = async (req, res) => {
  try {
    let data = await bookmark.destroy({
      where: {
        iduser: `${req.user.id}`,
      },
      // include: [
      //   {
      //     model: user,
      //     as: "user",
      //     attributes: {
      //       exclude: ["createdAt", "updatedAt"],
      //     },
      //   },
      //   {
      //     model: journey,
      //     as: "journey",
      //     attributes: {
      //       exclude: ["createdAt", "updatedAt"],
      //     },
      //   },
      // ],
      // attributes: {
      //   exclude: ["createdAt", "updatedAt"],
      // },
    });

    // data = JSON.parse(JSON.stringify(data));
    // data = data.map((item) => {
    //   return {
    //     ...item,
    //     image: process.env.PATH_FILE + item.image,
    //   };
    // });

    res.send({
      status: "success...",
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.addBookmark = async (req, res) => {
  try {
    const newBookmark = await bookmark.create({
      iduser: req.body.iduser,
      idjourney: req.body.idjourney,
    });
    res.send({
      status: "succes",
      message: "add bookmark succes",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};
