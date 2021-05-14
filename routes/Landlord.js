const express=require('express');
const router=express.Router();
const {db} = require('../db/db');
const { isEmpty, uploadDir } = require('../helpers/upload-helper');

router.all('/*',(req,res,next)=>{
    req.app.locals.layout = 'Landlord';
    next();
});
router.get('/dashboard',async(req,res)=>{
    const fq = 'SELECT * FROM OWNER WHERE uid = ? ';
    db.query(fq,req.user.uid,(err,owner)=>{
        if(err)throw err;
        res.render('Landlord/dashboard',{owner:owner[0]});
    });
    
})
router.get('/booking',async(req,res)=>{
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
            res.render('Landlord/Booking',{item:item,item1:item1,item2:item2});
        })
        })
    });         
       
    
});
router.get('/house/:hid',async(req,res)=>{
    const fhq = 'SELECT Name,email,T.Address FROM Tenant AS T , HouseBooking AS HB WHERE HB.uid = T.uid AND HB.hid = ?'
    db.query(fhq,req.params.hid,(err,home)=>{
        if(err)throw err;
        var customer = [];
        for(i=0;i<home.length;i++)customer.push(home[i]);
        res.render('Landlord/Tenet',{tenets:customer});        
        });
        
});   

router.get('/addHouse',(req,res)=>{
    res.render('Landlord/house');
})
router.post('/addHouse',async (req,res)=>{
    let filename = 'apartment-cheap-rent-flat-for-lease.jpg';
    if (!isEmpty(req.files)) {        
        let file = req.files.file;
        filename = Date.now() + '-' + file.name;
    
        file.mv('./public/uploads/'+filename, (err)=>{
            if(err) throw err;
        });
    }
    const fq = 'SELECT uid FROM OWNER WHERE uid = ?';
    db.query(fq,req.user.uid,(err,owner)=>{
        if(err)throw err;
        const newHouse = {
            uid:owner[0].uid,
            Type:req.body.Type,
            Address:req.body.Address,
            Description:req.body.Description,
            rent:req.body.rent, 
            file: filename 
        }
        const iq = 'INSERT INTO HOUSE SET ?';
        db.query(iq,newHouse,(err,house)=>{
            if(err)throw err;
            res.render('Landlord/House');
        })
    })
   

    
})
router.post('/housedel/:hid',async(req,res)=>{
    const fhq = 'DELETE FROM house WHERE hid =?'
    db.query(fhq,req.params.hid,(err,home)=>{

        if(err)throw err;
        req.flash('success','House has been removed');
        res.redirect('/Landlord/house');        
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
            res.render('Landlord/ownerHouses',{item:item,item1:item1,item2:item2});
        })
        })
        
        
    }) 
    
})

router.get('/HouseReview/:hid',async(req,res)=>{
    const fq = 'SELECT UserName ,Text FROM Review WHERE hid = ?'
            db.query(fq,req.params.hid,(err,reviews)=>{
                res.render('Landlord/review',{reviews:reviews,hid:req.params.id});
        })

});

router.get('/customer',(req,res)=>{
    res.render('Landlord/customers');
})


module.exports = router;