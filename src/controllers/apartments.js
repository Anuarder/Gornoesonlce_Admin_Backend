const Apartments = require('../models/Apartments');
module.exports = {
    async getApartments(req, res){
        try{
            let apartments = await Apartments.find({});
            res.send({
                apartments: apartments
            });
        }catch(err){
            console.log(err);
            res.status(404).send({
                error: "Ошибка при получении квартир"
            });
        }
    },
    async getApartmentByNumber(req, res){
        try{
            let apartment = await Apartments.findOne({number: req.body.number});
            res.send({
                apartment: apartment
            });
        }catch(err){
            console.log(err);
            res.status(404).send({
                error: err
            });
        }
    },
    async soldApartment(req, res){
        try{
            let apartment = await Apartments.updateOne({_id: req.body._id}, {isSold: !req.body.isSold});
            if(apartment.nModified > 0){
                res.send({
                    message: "Квартира обновленна"
                });
            }else{
                throw "Квартира не обновленна"
            }
        }catch(err){
            console.log(err);
            res.status(400).send({
                error: err
            });
        }
    }
}