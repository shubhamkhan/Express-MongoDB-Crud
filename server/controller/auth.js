//user model
const user_model = require('../model/user_model');
//Bcrypt
const bcrypt = require('bcrypt');

/**
 * @description Registration
 * @method POST
 */

exports.register = (req, res) => {

    if(!req.body) {
        res.status(500).send({message:'Data is empty !!!'});
    }

    const check = async() => {
        try {
            const exist = await user_model.exists({username : req.body.username});
            if(exist) {
                req.flash('error', 'User Already Exists !!!');
                res.redirect('/login');
            } else {
            const salt = 12;

            const hash = await bcrypt.hash(req.body.password, salt);

             const userdata = new user_model({
                name: req.body.name,
                username:req.body.username,
                password: hash
            });

            console.log(await userdata.save());
            req.flash('success', 'User Registered !!!');
            res.redirect('/login');
            }
        } catch(err) {
            console.log(err);
        }
    }
    check(); 
}

/**
 * @description Checking Logged in service
 * 
 */
exports.isLoggedin = (req,res,next) => {
    if(req.isAuthenticated()) {
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else {
        req.flash('message','Please Log In !!!');
        res.redirect("/login");
    }
}