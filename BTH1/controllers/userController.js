
  import { users} from '../model/user.js';
  export const getAllUsers = (req, res) => {
  res.status(200).json(users);
  }
  // lấy theo id
  export const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id); 
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }  }
  // lấy theo tên
  export const getUserByName = (req, res) => {
    const name = req.params.name.toLowerCase(); 
    const user = users.find(u => u.name.toLowerCase() === name); 
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }  }
  // lấy theo email
  export const getUserByEmail = (req, res) => {
    const email = req.params.email.toLowerCase(); 
    const user = users.find(u => u.email.toLowerCase() === email); 
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }  }