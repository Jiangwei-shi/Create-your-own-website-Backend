import * as usersDao from "../../users/users-dao.js";

const register = async (req, res) => {
  try {
    const username = req.body.username;
    const usernameExists = await usersDao.findUserByUsername(username);
    if (usernameExists) {
      return res.status(400).json({ message: "Username already registered" });
    }
    const newUser = await usersDao.createUser(req.body);
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await usersDao.findUserByCredentials(username, password);
  if (user) {
    req.session["currentUser"] = user;
    res.json(user);
  } else{
    res.sendStatus(403);
  }
};

const logout = async (req, res) => {
  req.session.destroy();
  res.sendStatus(200);
};

const deleteUser = async (req, res) => {
  const userIdToDelete = req.params.uid;
  const status = await usersDao.deleteUser(userIdToDelete);
  res.json(status);
};

const updateUser = async (req, res) => {
  const userId = req.params.uid;
  const updatedUserData = req.body;
  try {
    const updatedUser = await usersDao.updateUser(userId, updatedUserData, { new: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

const findUserById = async (req, res) => {
  const userId = req.params.uid;
  try {
    const user = await usersDao.findUserById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export default (app) => {
  app.post("/api/users/register", register);
  app.post("/api/users/login", login);
  app.post("/api/users/logout", logout);
  app.delete("/api/users/:uid", deleteUser);
  app.put("/api/users/:uid", updateUser);
  app.get("/api/users/:uid", findUserById);
};
