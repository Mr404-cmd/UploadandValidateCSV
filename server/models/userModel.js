const dbConn = require("../config/db")
const User = function(user) {
    this.userName = user.userName;
    this.email = user.email;
    this.age = user.age;
    this.salary = user.salary;
    this.mobile = user.mobile;
    this.address = user.address;
    this.profession = user.profession;
    this.adhar = user.adhar;
    this.pan = user.pan;
    this.gender = user.gender;
}
module.exports = User
