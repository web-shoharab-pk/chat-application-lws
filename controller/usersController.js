const bcrypt = require("bcrypt")

// get users page
function getUsers(req, res, next) {
    res.render("users");
  }
  
// add user
async function addUser(req, res, next) {

  let newUser;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  if(req.files && req.files.length > 0) {
    newUser = new User({
      ...req.body, 
      avatar: req.files[0].filename,
      password: hashedPassword,

    })
  } else {
    newUser = new User({
      ...req.body,
      password: hashedPassword,
    })
  }

  // save user  or show error
  try {
    const result = await newUser.save();
    res.status(200).json({
      message: "User was added successfully!"
    })
  } catch(err) {
    res.status(500).json({
      errors: {
        common: {
          msg: "unknown error occured!"
        }
      }
    })
  }

}

  module.exports = {
    getUsers, addUser
  };