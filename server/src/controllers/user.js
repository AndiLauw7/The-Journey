const user = require("../../models/user")

exports.getUsers = async (req, res) => {
  
  try {
    const users = await user.findAll({
            
            
      attributes : {
          exclude : ["createdAt", "updatedAt", "password"]
      }
  })
    res.send({
      status: "Succes",
      data: {
        users
      }
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "Failed",
      message: "Server Eror"
    })
  }
}



exports.getUser = async (req, res) => {
  try {

      const { id } = req.params
   const dataUser = await user.findOne({
          where : {
              id
          },
          
          
          attributes : {
              exclude : ["createdAt", "updatedAt", "password"]
          }
      })

      res.send({
          status: "success",
          message : `User by id : ${id} `,
          dataUser : {
              id : dataUser.id,
              fullname : dataUser.fullname,
              email : dataUser.email,
              // profile : dataUser.profile.image,
              
          }
      })
      
  } catch (error) {
      console.log(error)
      res.send({
          status: 'failed',
          message: 'Server Error'
      })
  
      
  }
}
  exports.deleteUser = async (req, res) => {
    try{
  
        const {id} = req.params
        await user.destroy({
            where:{
                id
            }
        })
        res.send({
            status: 'success',
            message: `Delete user id: ${id} finished`,
            data: {
              id:id
            }
        })
    }catch (error) {
            console.log(error)
            res.send({
                status: 'failed',
                message: 'Server Error'
            })
    }
  }