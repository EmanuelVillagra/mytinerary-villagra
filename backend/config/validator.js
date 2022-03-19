const joi = require('joi')

const validator = (req, res, next) => {
    const schema = joi.object({ 
        name: joi.string().max(20).min(3).trim().pattern(new RegExp('[a-zA-Z]')).required().messages({
            'string.min':'name / the name should contain more than 3 characters',
            'string.max':"name / the name should'nt contain more than 20 characters"
        }),
        lastName: joi.string().max(20).min(3).trim().pattern(new RegExp('[a-zA-Z]')).required().messages({
            'string.min':'name / the lastName should contain more than 3 characters',
            'string.max':"name / the lastName should'nt contain more than 20 characters"
        }),

        email: joi.string().email({ minDomainSegments: 2 }).required().messages({
            'string.email':'Wrong email format'
        }),
        password: joi.string().pattern(new RegExp('[a-zA-Z0-9]')).required().trim().min(8).max(30).messages({
            'string.min':'The password should have uppercase, lowercase, and numbers between 8 and 30 characters',
            'string.pattern':"The password should be alphanumeric and contain a number"
        }), 
        
        from:joi.string(),
        country:joi.string()
    })

    const validation = schema.validate(req.body.userData, {abortEarly:false})
       
    if (validation.error) {
        
        return res.json({success: false, from:"validator", message:validation.error.details, test: validation})
        
    }
    
    next()
    
    
}

module.exports = validator