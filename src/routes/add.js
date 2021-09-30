const {Router} = require('express') 
const {validationResult} = require('express-validator')
const Course = require('../models/course.js')
const auth = require('../middleware/auth.js')
const {courseValidators} = require('../utils/validators.js')
const router = Router()

router.get('/',auth,(req,res)=>{
    res.render('add',{
        title:'Добавить курсы',
        isAdd:true
    })
})

router.post('/',auth,courseValidators,async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).render('add',{
            title:'Добавить курс',
            isAdd:true,
            error:errors.array()[0].msg,
            data:{
                title:req.body.title,
                price:req.body.price,
                img:req.body.img
            }
        })
    }
    const course = Course({
        title:req.body.title,
        price:req.body.price,
        img:req.body.img,
        userId:req.user
    })
    try{
        await course.save()
        res.redirect('/courses')
    }catch(err){
        console.log(err)
    }
})



module.exports = router
