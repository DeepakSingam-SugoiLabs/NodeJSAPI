exports.createUserValidator = (req,res,next) =>
{
         req.check('name','enter name').notEmpty().isLength({min:5})
         req.check('role','enter role').notEmpty().isLength({min:4})
         req.check('email','enter email').notEmpty().isEmail().isLength({min:8})
         req.check('password','enter pass').notEmpty().isLength({min:8})
         const errors = req.validationErrors()
         if(errors){
                    const firstError = errors.map((error)=>error.msg)
                    return res.status(400).json({error:firstError})
                   }
         next();
}

exports.verifyUserValidator = (req,res,next) =>
{
        req.check('email','write email').notEmpty().isEmail().isLength({min:8})
        req.check('password','write pass').notEmpty().isLength({min:8})
        const errors = req.validationErrors()
        if(errors){
                   const firstError = errors.map((error)=>error.msg)
                   return res.status(400).json({error:firstError})
                  }
        next();
}

exports.createEmployeeValidator = (req,res,next) =>
{
        req.check('name','enter name').notEmpty().isLength({min:5})
        req.check('salary','enter salary').notEmpty().isLength({min:2})
        req.check('age','enter age').notEmpty().isLength({min:2})
        req.check('email','enter email').notEmpty().isEmail().isLength({min:8})
        const errors = req.validationErrors()
        if(errors){
                    const firstError = errors.map((error)=>error.msg)
                    return res.status(400).json({error:firstError})
                  }
        next();
}