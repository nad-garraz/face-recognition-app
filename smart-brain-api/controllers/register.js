const handleRegister = (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json('Incorrect form submission');
  }
  const saltRounds = 10;
  const myPlaintextPassword = password;
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
      db.transaction((trx) => {
        trx
          .insert({
            hash: hash,
            email: email,
          })
          .into('login')
          .returning('email')
          .then((loginEmail) => {
            return trx('users')
              .returning('*')
              .insert({
                email: loginEmail[0].email,
                name: name,
                joined: new Date(),
              })
              .then((user) => {
                res.json(user[0]);
              })
              .catch((err) => {
                res.status(400).json('Unable to register: 1');
              });
          })
          .then(trx.commit)
          .catch((err) => {
            trx.rooback;
            res.status(400).json('Unable to register: 2');
          });
      });
    });
  });
};

module.exports = {
  handleRegister: handleRegister,
};
