const nodemailer = require('nodemailer');
const Requests = require('../models/Requests');

module.exports = {
    async sendRequest(req, res){
        try {
            let transporter = nodemailer.createTransport({
                pool: true,
                host: "smtp.yandex.ru",
                port: 465,
                secure: true,
                auth: {
                    user: "sales@gornoesolnce.kz",
                    pass: ""
                },
                tls: {
                    rejectUnauthorized: false
                }
            });
            let message = {
                from: "sales@gornoesolnce.kz", 
                to: "sales@gornoesolnce.kz",
                subject: 'Заявка на звонок',
                text: `Имя: ${req.body.name}, Телефон: ${req.body.phone}`,
                html: `<p>Имя: ${req.body.name}</p> Телефон: <a href="tel:${req.body.phone}">${req.body.phone}</a>`
            };
            
            await transporter.sendMail(message);
            
            // Запись в бд
            let date = new Date();
            let filterDate = {
                day: date.getDate() < 10 ? `0${date.getDate()}` : date.getDate(),
                mounth: (date.getUTCMonth() + 1) < 10 ? `0${date.getUTCMonth() + 1}` : date.getUTCMonth() + 1,
                year: date.getUTCFullYear()
            }
            let newRequest = new Requests({
                name: req.body.name,
                phone: req.body.phone,
                date: `${filterDate.day}.${filterDate.mounth}.${filterDate.year}`,
                status: false,
                personal: ''
            });
            await newRequest.save();
            res.send({
                message: "Message has been sent"
            });
        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    },
    async getRequests(req, res){
        try{
            let requests = await Requests.find({});
            requests.reverse();
            res.send({
                requests: requests
            })
        }catch(err){
            console.log(err);
            res.status(400).send(err);
        }
    },
    async getLastRequests(req, res){
        try{
            let requests = await Requests.find({});
            requests.reverse();
            if(requests.length < 3){
                res.send({
                    requests: requests
                });
            }else{
                let filterRequests = [
                    requests[0],
                    requests[1],
                    requests[2],
                ];
                res.send({
                    requests: filterRequests
                });
            }
            
            
        }catch(err){
            console.log(err);
            res.status(404).send(err);
        }
    },
    async deleteRequests(req, res){
        try{
            let request = await Requests.deleteOne({_id: req.body.id});
            if(request.deletedCount == 1){
                res.send({
                    message: "Заявка удаленна"
                });
            }else{
                throw "Ошибка, заявка не удаленна"
            }
        }catch(err){
            console.log(err);
            res.status(400).send({
                error: err
            });
        }
    },
    async updateRequest(req, res){
        try{
            let request = await Requests.updateOne(
                {_id: req.body.id}, 
                {personal: req.body.personal, status: req.body.status}
            );
            if(request.nModified > 0){
                res.send({
                    message: "Заявка обновленна"
                });
            }else{
                throw "Заявка не обновленна"
            }
        }catch(err){
            console.log(err);
            res.status(400).send({
                error: err
            });
        }
    }
}
