const express = require('express')
const path = require('path')
const csrf = require('csurf')
const flash = require('connect-flash')
const mongoose = require('mongoose')
const helmet = require('helmet')
const compression = require('compression')
const Handlebars = require('handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const exphbs = require('express-handlebars')
const session= require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
const app = express()
const homeRoutes = require('./routes/home.js')
const cardRoutes = require('./routes/card.js')
const addRoutes = require('./routes/add.js')
const coureseRoutes = require('./routes/courses.js')
const authRoutes = require('./routes/auth.js')
const profileRoutes = require('./routes/profile.js')
const ordersRoutes = require('./routes/order.js')
const varMiddleware = require('./middleware/variables.js')
const userMiddleware = require('./middleware/user.js')
const errorHandler = require('./middleware/error.js')
const fileMiddleware = require('./middleware/file.js')
const keys = require('./keys/index.js')

const hbs = exphbs.create({
    defaultLayout:'main',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    extname:'hbs',
    helpers:require('./utils/hbs-helpers.js')
})
const store = new MongoStore({
    collection:'session',
    uri:keys.MONGDB_URL
})
app.engine('hbs',hbs.engine)
app.set('view engine','hbs')
app.set('views','./src/views')


app.use(express.static(path.join(__dirname,'public')))
app.use('/src/images',express.static(path.join(__dirname,'images')))
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret:keys.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    store
}))
app.use(fileMiddleware.single('avatar'))
app.use(csrf())
app.use(flash())
app.use(helmet())
app.use(compression())
app.use(varMiddleware)
app.use(userMiddleware)
app.use('/',homeRoutes)
app.use('/add',addRoutes)
app.use('/courses',coureseRoutes)
app.use('/card',cardRoutes)
app.use('/orders',ordersRoutes)
app.use('/auth',authRoutes)
app.use('/profile',profileRoutes)

app.use(errorHandler)
const PORT = process.env.PORT || 3000

async function start(){
    try{
        await mongoose.connect(keys.MONGDB_URL,{
            useNewUrlParser:true
        })
        app.listen(PORT,()=>{
            console.log(`Server is running on ${PORT}`)
        })
    }catch(err){
        console.log(err)
    }
}
start()

