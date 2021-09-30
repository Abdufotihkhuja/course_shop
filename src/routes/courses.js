const {Router} = require('express')
const {validationResult} = require('express-validator')
const Course = require('../models/course.js')
const auth = require('../middleware/auth.js')
const {courseValidators} = require('../utils/validators.js')
const router = Router()

function isOwner(course,req){
    return course.userId.toString() === req.user._id.toString()
}


router.get('/',async (req,res)=>{
    try{
        const courses = await Course.find().populate('userId','email name').select('price title img')
    res.render('courses',{
        title:'Курсы',
        isCourses:true,
        userId:req.user ? req.user._id.toString():null,
        courses
    })
    } catch(err){
        console.log(err);
    }
})

router.get('/:id/edit',auth,async (req,res)=>{
    if(!req.query.allow){
        return res.redirect('/')
    }
    
    try{
        const course = await Course.findById(req.params.id).lean()

        if(!isOwner(course,req)){
            return res.redirect('/courses')
        }

        res.render('course-edit',{
            title:`Редактировать ${course.title}`,
            course
        })
    }catch(e){
        console.log(e);
    }
    
})
router.post('/edit',auth,courseValidators,async (req,res)=>{
    const {id} = req.body
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).redirect(`/courses/${id}/edit?allow=true`)
    }
    try{
        delete req.body.id
        const course = await Course.findById(id)
        if(!isOwner(course,req)){
            return res.redirect('/courses')
        }
        Object.assign(course,req.body)
        await course.save()
        res.redirect('/courses')
    }catch(er){
        console.log(er);
    }
    
})

router.post('/remove',auth,async (req,res)=>{
    try{
        await Course.deleteOne({
            _id:req.body.id,
            userId:req.user._id
        })
        res.redirect('/courses')
    }catch(err){
        console.log(err)
    }

})

router.get('/:id',async (req,res)=>{
    try{
        const course = await Course.findById(req.params.id).lean()
    res.render('course',{
        layout:'empty',
        title: `Курс {{course.title}}`,
        course
    })
    }catch(e){
        console.log(e);
    }
})

module.exports = router
