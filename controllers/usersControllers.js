const usersModel = require("../models/usersModel");

class UsersControllers {
    async getUsersByName(req, res) {
        try {
            let params = {
                userName: req.body.userName
            }
            let result = await usersModel.findOne({ userName: params.userName });
            return res.done(result);
        } catch (error) {
            return res.error(error);
        }
    }
}

module.exports = UsersControllers;