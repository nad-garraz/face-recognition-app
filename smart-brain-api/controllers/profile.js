const handleProfileGet = (req, res, db) => {
  const { id } = req.params;
  db.select('*')
    .from('users')
    .where({ id: id })
    .then((user) => {
      if (user.length > 0) {
        res.json(user[0]);
      } else {
        res.status(400).json('user not found');
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  handleProfileGet: handleProfileGet,
};
