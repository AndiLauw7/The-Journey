const { journey, user } = require("../../models");

exports.getProducts = async (req, res) => {
  try {
    let data = await journey.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    data = JSON.parse(JSON.stringify(data));

    data = data.map((item) => {
      return {
        ...item,
        image: process.env.FILE_PATH + item.image,
      };
    });

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

exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let data = await journey.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    data = JSON.parse(JSON.stringify(data));
    data = {
      ...data,
      image: process.env.FILE_PATH + data.image,
    };
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

exports.addProduct = async (req, res) => {
  try {
    let data = req.body;
    let journeys = await journey.create({
      ...data,
      image: req.file.filename,
      iduser: `${req.user.id}`,
      include: {
        model: user,
        as: "user",
        attributes: {
          exclude: ["createdAt", "updatedAt", "password"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    journeys = JSON.parse(JSON.stringify(journeys));
    journeys = {
      ...journeys,
      image: process.env.FILE_PATH + journeys.image,
    };
    res.send({
      status: "Success",
      data: {
        journeys,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      status: "failed",
      message: "thats wrong",
    });
  }
};
