const bcrypt = require('bcrypt');

const generateHashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
}

const isSamePassword = async (userPassword, hashedPassword) => {
    const isPasswordValid = await bcrypt.compare(userPassword, hashedPassword);
    return isPasswordValid;
}

module.exports = {
    generateHashPassword,
    isSamePassword
}