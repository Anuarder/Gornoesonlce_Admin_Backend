const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = {
    async login(req, res){
        try{
            let user = await User.findOne({name: req.body.name});
            if(!user){
                throw "Неверное имя"
            }else{
                if(user.password !== req.body.password){
                    throw "Неправельный пароль"
                }else{
                    const token = jwt.sign(
                        {
                            name: user.name,
                            id: user._id,
                        },
                        config.secret,
                        {
                            expiresIn: "7d"
                        }
                    );
                    res.status(200).send({
                        user: {
                            id: user._id,
                            name: user.name
                        },
                        token: token
                    });
                }
            }
        }catch(err){
            console.log(err);
            res.send({
                error: err
            });
        }
    }
}