const { User } = require("../models/user");

const userget = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    console.error("Error finding users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const userpost = async (req, res) => {
  const name = req.query.name;
  const email = req.query.email;
  const phone = req.query.phone;
  const gender = req.query.gender;

  const data = { name, email, phone, gender };

  try {
    const newUser = await User.create(data);
    res.send(newUser);
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({ error: "Something Got Wrong Brother !!" });
  }
};

const userput = async (req, res) => {
  const id = req.query.id;
  const newdata = req.body;

  console.log(id);
  console.log(newdata);

  const userinfo = await User.findByIdAndUpdate(id, newdata, {
    new: true,
  });

  if (!userinfo) {
    return res.status(404).json({ error: "User not found" });
  }

  await userinfo.save();
  res.end();
};

const userpatch = async (req, res) => {
  const id = req.query.id;
  const newdata = req.body.newdata;

  const userinfo = await User.findById(id);
  if (!userinfo) {
    return res.status(404).json({ error: "User not found" });
  }

  userinfo.name = newdata;
  await userinfo.save();
  res.send("saiyam ");
};

const userdelete = async (req, res) => {
  try {
    const name = req.params.id;
    const result = await User.deleteOne({ name });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: `${name} is deleted from the database` });
    } else {
      res.status(404).json({ error: `${name} not found in the database` });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  userget,
  userpost,
  userdelete,
  userput,
  userpatch,
};
