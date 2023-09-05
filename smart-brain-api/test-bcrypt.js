const bcrypt = require("bcrypt");
const saltRounds = 10;
const myPlaintextPassword = "s0//P4$$w0rD";
const someOtherPlaintextPassword = "not_bacon";

const database = [];

bcrypt.genSalt(saltRounds, function (err, salt) {
  bcrypt.hash(someOtherPlaintextPassword, salt, function (err, hash) {
    // console.log(hash);
    // console.log(err);
    const pair = {
      password: someOtherPlaintextPassword,
      hash: hash,
    };
    database.push(pair);
    console.log(database);

    bcrypt.compare(someOtherPlaintextPassword, hash, function (err, result) {
      console.log(result);
    });
  });
});
