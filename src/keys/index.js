if(process.env.NODE_ENV === 'production'){
    module.exports = require('./keys.prod.js')
}else{
    module.exports = require('./key.dev.js')
}


// module.exports = {
//     MONGDB_URL:'mongodb+srv://Admin:Vu96ony5qCZxHgRm@cluster0.5s4d9.mongodb.net/shop',
//     SESSION_SECRET:'ajn23@3#@I$#@',
//     SEND_GRID_API_KEY:'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',
//     EMAIL_FROM:'formymac15@gmail.com',
//     BASE_LINK:'http://localhost:3000'
// }