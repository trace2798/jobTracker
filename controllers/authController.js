const register = async (req, res) => {
  res.send('User Sign UP successfully')
};

const login = async (req, res) => {
  res.send('User logged IN successfully')  
};
const updateUser = async (req, res) => {
  res.send('User updated successfully')
};

export { register, login, updateUser };
