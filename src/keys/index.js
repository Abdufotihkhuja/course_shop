if(process.env.NODE_ENV === 'production'){
    module.exports = require('./keys.prod.js')
}else{
    module.exports = require('./key.dev.js')
}
