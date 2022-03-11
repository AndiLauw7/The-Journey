const { user,profiles } = require('../../models')
const joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


exports.register = async (req, res) => {
    const schema = joi.object({
        email: joi.string().min(5).required(),
        password: joi.string().min(8).required(),
        fullname: joi.string().min(3).required(),
        phone:joi.string().min(3).required(),

    });
    const {error} = schema.validate(req.body)
    if(error)
    return res.status(400).send({
        error: {
            message: error.details[0].message,
        }
    })
    try {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(req.body.password, salt)
      const newUser = await user.create({

        fullname : req.body.fullname,
        email: req.body.email,
        phone:req.body.phone,
        password: hashedPassword,
     
      })
      // console.log(newUser.id);
      const newprofile = await profiles.create({

          iduser:newUser.id,
          fullname:newUser.fullname,
          email:newUser.email,
          phone:newUser.phone,
          addres:newUser.addres,
          image:newUser.image



      })
      const token = jwt.sign({id:newUser.id}, process.env.TOKEN_KEY)
      res.status(200).send({
          status: 'success',
          data:{
            name: newUser.name,
            token
          }
      })
      
    } catch (e) {
      console.log(e);
      res.send({
        status: "failed",
        message: "thats wrong",
      });
    }
  };

  exports.Login = async (req, res) => {
    const schema = joi.object({
    email: joi.string().email().min(5).required(),
    password: joi.string().min(8).required()
})
const {error} = schema.validate(req.body)
    if(error)
    return res.status(400).send({
        error: {
            message: error.details[0].message
        }
    })
try{
    const userLogin = await user.findOne({
        where:{
            email: req.body.email,
        },
        attributes:{
            exclude: ['status', 'createdAt', 'updatedAt']
        }
    })
    const isValid = await bcrypt.compare(req.body.password, userLogin.password)
    if(!isValid){
        return res.status(400).send({
            status : 'failed',
            message: 'email and password not match'
        })
    }
    const token = jwt.sign({id:userLogin.id}, process.env.TOKEN_KEY)
    res.status(200).send({
        status: 'success',
        data:{
            user:{
            fullname: userLogin.fullname,
            email: userLogin.email,
            role: userLogin.role,
            phone: userLogin.phone,
            token
            }
        }
    })
}catch (e) {
    console.log(e);
    res.send({
      status: "failed",
      message: "errorr",
    });
}

}

exports.checkAuth = async (req, res) => {
  try {
    const id = req.user.id;

    const dataUser = await user.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    if (!dataUser) {
      return res.status(404).send({
        status: "failed",
      });
    }

    res.send({
      status: "success...",
      data: {
        user: {
          id: dataUser.id,
          fullname: dataUser.fullname,
          email: dataUser.email,
          phone: dataUser.phone,
          image:dataUser.image,
          role: dataUser.role,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status({
      status: "failed",
      message: "Server Error",
    });
  }
};