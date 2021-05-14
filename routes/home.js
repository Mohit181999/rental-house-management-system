const express=require('express');
const router=express.Router(); 
const {db} = require('../db/db');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; 


router.all('/*',(req,res,next)=>{
    req.app.locals.layout = 'home';
    next();
});

router.get('/',(req,res)=>{
    res.render('home/main')
    
})


router.get('/register',(req,res)=>{
res.render('home/register')
})
router.post('/register',async (req,res)=>{
    let error="";
    if(req.body.password!=req.body.confirmpassword){
        error="Password does not match";
        res.render('home/register',{error:error});

    }
   else{   
    const user = {email:req.body.email,password:req.body.password,role:req.body.role}
    let iq = 'INSERT INTO USER SET ?';
    db.query(iq,user,(err,result)=>{
        if(err)throw err;
        
    }) ; 
  
    if(req.body.role == 'Owner'){
        const iq = 'SELECT uid FROM USER WHERE email = ?';
        
        db.query(iq,req.body.email,(err,result)=>{
            if(err)throw err;
            const id = result[0].uid;
            const owner = {
                Name:req.body.Name,
                uid:id,
                email:req.body.email,           
                address:req.body.address
            }
            
            let ioq = 'INSERT INTO OWNER SET ?';
            db.query(ioq,owner,(err,result)=>{
            if(err)throw err;
            console.log(result);
            req.flash('success','Registered successfully');
            res.redirect('/Landlord'); 
        }) ;
        })   
    }
    else{
        const iq = 'SELECT uid FROM USER WHERE email = ?';
        db.query(iq,req.body.email,(err,result)=>{
            if(err)throw err;
            const id =result[0].uid;
            const tenant= {
                Name:req.body.Name,
                uid:id,
                email:req.body.email,         
                address:req.body.address,
            }
            let ioq = 'INSERT INTO TENANT SET ?';
            db.query(ioq,tenant,(err,result)=>{
            if(err)throw err;
            console.log(result);
            req.flash('success','Registered successfully');
            res.redirect('/Tenant'); 
            }) ;
        });       
       
   }
}
});

router.get('/Tenant',(req,res)=>{
res.render('home/Tenant')
});

passport.use(new LocalStrategy({usernameField: 'email'},(email, password, done)=> {
    const fq = 'SELECT * FROM USER WHERE email = ?';
    db.query(fq,email,(err,user)=>{
        if(err){
            return done(err);
        }
        if(!user){
            return done(null, false, {message: 'no user found'});
        }
        if(user[0].password != password){
            return done(null, false, {message:'password is incorrect'});
        }
        else{
            
            return done(null, user[0]);
        }

    });


}));
passport.serializeUser(function(user, done) {
    done(null, user.uid);
    
  });  
passport.deserializeUser(function(id, done) {
    const fq = 'SELECT * FROM USER WHERE uid = ?';
    db.query(fq,id,(err,user)=>{
        done(err,user[0]);
    })
});

router.post('/Tenant', (req, res, next)=>{   
    let fq ='SELECT * FROM TENANT WHERE email = ?';
    db.query(fq,req.body.email,(err,owner)=>{
        if(err)throw err;
        console.log(owner)
        if(owner.length == 0){
            req.flash('success','You are not registered as TENANT');
            res.redirect('/register'); 
        }
        else{
            passport.authenticate('local',{
                successRedirect: '/Tenant/dashboard',
                failureRedirect: '/Tenant',
                failureFlash: true
            })(req, res, next);
        }
    }); 
  
});


router.get('/Landlord',(req,res)=>{
    res.render('home/Landlord')
});
router.post('/Landlord',(req,res,next)=>{
    let fq ='SELECT * FROM OWNER WHERE email = ?';
    db.query(fq,req.body.email,(err,owner)=>{
        if(err)throw err;
        if(owner.length == 0){
            req.flash('success','You are not registered as OWNER');
            res.redirect('/register'); 
        }
        else{
            passport.authenticate('local',{
                successRedirect: '/Landlord/dashboard',
                failureRedirect: '/Landlord',
                failureFlash: true
            })(req, res, next);
        }
    });   
  
});

router.get('/logout', (req, res)=>{
    req.logOut();
    res.redirect('/');
});



module.exports = router;


