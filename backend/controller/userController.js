import User from '../models/userModel.js';

async function createUser(req, res) {
    const {username, email, password} = req.body;

    if(!username || !email || !password) {
        res.send('Please fill out all field');
    }

    //const exists = User.findOne({username});

    //if(exists) {
      //  res.status(409).send('Useername already exists');
        //throw new Error('Username alreazdy exists');
  //  }

    const newUser = User.create({
        username, email, password
    })

    //if(newUser) {
      //  res.status(500).send('Error while creating user')

  //  }

    //return res.send('User successfully created');
    return res.status(200)


}

export { createUser };
