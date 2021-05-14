const express=require('express');
const router=express.Router();
const {db} = require('../db/db')

router.all('/*',(req,res,next)=>{
    req.app.locals.layout = 'Tenant';
    next();
});



router.get('/dashboard',async(req,res)=>{
    const fq = 'SELECT * FROM TENANT WHERE uid = ?';
    db.query(fq,req.user.uid,(err,tenant)=>{
        if(err)throw err;
        res.render('Tenant/dashboard',{user:tenant[0]});
    });        
});
router.get('/house',async(req,res)=>{
    const fq = 'SELECT * FROM HOUSE WHERE Type = ?';
    db.query(fq,'Appartment',(err,result)=>{
        var item = [];
        for(i=0;i<result.length;i++)item.push(result[i])
        const fq = 'SELECT * FROM HOUSE WHERE Type = ?';
        db.query(fq,'Bunglow',(err,b)=>{
            var item1 = [];
            for(i=0;i<b.length;i++)item1.push(b[i]);
            const fq = 'SELECT * FROM HOUSE WHERE Type = ?';     
            db.query(fq,'Pg',(err,pg)=>{
            var item2 = [];
            for(i=0;i<pg.length;i++)item2.push(pg[i]);
            res.render('Tenant/House',{item:item,item1:item1,item2:item2});
        })
        })
    })
    
}); 

router.post('/house/:hid',async(req,res)=>{
    const fq = 'SELECT * FROM HOUSE WHERE hid = ?'
    db.query(fq,req.params.hid,(err,home)=>{
        if(err)throw err;
        const fuq = 'SELECT * FROM TENANT WHERE uid = ?';
        db.query(fuq,req.user.uid,(err,tenant)=>{
            const bookingDetails ={
                uid:tenant[0].uid,
                hid:home[0].hid,
                Type:home[0].Type,
                Address:home[0].Address,
                rent:home[0].rent,
                file:home[0].file    
            } 
            const iq = 'INSERT INTO HouseBooking SET ?';
            db.query(iq,bookingDetails,(err,result)=>{
                if(err)throw err;
                req.flash('success','Scheduled meeting successfully ,wait tell Owner responds');
                res.redirect('/Tenant/house');
            })
        })
    })
    
});
    
    


router.get('/houseReview/:id',async(req,res)=>{
    const fq = 'SELECT UserName ,Text FROM Review WHERE hid = ?'
            db.query(fq,req.params.id,(err,reviews)=>{
                res.render('Tenant/review',{reviews:reviews,hid:req.params.id});
        })

});


router.post('/HouseReview/:id',async(req,res)=>{
    const sq = 'SELECT Name FROM TENANT WHERE uid = ?';
    db.query(sq,req.user.uid,(err,user)=>{
        if(err)throw err;
        const iq = 'INSERT INTO Review SET ? '
        const review = {
            UserName:user[0].Name,
            Text:req.body.text,
            hid:req.params.id,
        } 
        db.query(iq,review,(err,result)=>{
            const fq = 'SELECT UserName ,Text FROM Review WHERE hid = ?'
            db.query(fq,req.params.id,(err,reviews)=>{
                res.render('Tenant/review',{reviews:reviews});
            })
        })   
      
    })
   
})



router.get('/houseBookings',async(req,res)=>{
   const fq = 'SELECT Type, Address, rent, file FROM HouseBooking WHERE uid = ? ';
   db.query(fq,req.user.uid,(err,bookings)=>{
       if(err)throw err;
       var booking = [];
       for(i=0;i<bookings.length;i++)booking.push(bookings[i]);
       res.render('Tenant/bookingHistory',{booking:booking});
   })
    
});





module.exports = router;