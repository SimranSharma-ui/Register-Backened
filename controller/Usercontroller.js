const model = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await model.find({}, 'username'); 
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

//register

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
   console.log(req.body);
  try {
    const userExist = await model.findOne({ email });

    if (userExist) {
      return res.status(400).send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const newUser = new model({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).send(newUser);
    
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error registering user");
  }
};

// login

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await model.findOne({ email: email });

  if (!user) {
    return res.status(404).send("Invalid username or password!");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(404).send("Invalid Password!");

  //Generate jwt token

  const token = jwt.sign({ userId: user._id }, process.env.Secrete_key, {
    expiresIn: "1h",
  });

  console.log(token);

  return res.status(200).send({ token: token });
};
