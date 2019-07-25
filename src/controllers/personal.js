const Personal = require('../models/Personal');

module.exports = {
    async getPersonal(req, res){
        try{
            let personal = await Personal.find({});
            res.send({
                personal: personal
            });
        }catch(err){
            console.log(err);
            res.status(404).send({
                error: err
            });
        }
    },
    async addNewPersonal(req, res){
        try{
            let personal = await Personal.findOne({name: req.body.name});
            if(personal){
                res.send({
                    error: "Сотрудник уже добавлен"
                });
            }else{
                newPersonal = new Personal({
                    name: req.body.name,
                    phone: req.body.phone
                });
                await newPersonal.save();
                res.send({
                    message: "Сотрудник добавлен"
                });
            }
        }catch(err){
            console.log(err);
            res.status(400).send({
                error: err
            });
        }
    },
    async deletePersonal(req, res){
        try{
            let personal = await Personal.deleteOne({_id: req.body.id});
            console.log(personal);
            if(personal.deletedCount > 0){
                res.send({
                    message: "Сотрудник удален"
                });
            }else{
                res.send({
                    error: "Сотрудник не удален"
                });
            }
        }catch(err){
            console.log(err);
            res.status(400).send({
                error: err
            });
        }
    }
}