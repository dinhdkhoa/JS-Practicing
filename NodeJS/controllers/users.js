import { v4 as uuidv4 } from "uuid";

let users = [
  {
    name: "Jine Doe",
    age: 20,
    id: uuidv4(),
  },
  {
    name: "John Doe",
    age: 24,
    id: uuidv4(),
  },
];

const userController = {
  addUser(req, res) {
    const newUser = req.body;
    users.push({ ...newUser, id: uuidv4() });
    res.send(`User ${newUser.name} Added`);
  },
  getUserWithID(req, res) {
    const { id } = req.params;
    const user = users.find((user) => user.id == id);
    res.send(user);
  },
  patchUser(req, res) {
    const { id } = req.params;
    const { name, age } = req.body;
    const user = users.find((user) => user.id == id);
    if (name) user.name = name;
    if (age) user.age = age;
    res.send(users);
  },
  deleteUser(req, res) {
    const { id } = req.params;
    users = users.filter((user) => user.id !== id);
    res.send(`User with ID: ${id} is removed`);
  },
  getAllUsers(req, res) {
    res.send(users);
  },
};

export default userController;
