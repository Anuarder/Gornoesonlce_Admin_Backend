module.exports = {
    port: process.env.PORT || 3007,
    database_url: "mongodb://localhost/GornoeSolnce",
    secret: process.env.SECRET ||'superSecret',
}