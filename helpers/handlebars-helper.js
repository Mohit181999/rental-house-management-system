const moment = require('moment');

module.exports={

    isEmptytop:function (item,options){
        let top=0;
    item.forEach(item=>{
        const d=moment(item.date).format('DD/MM/YYYY');
        const td=moment(Date.now()).format('DD/MM/YYYY');
        if(item.category=="top" && item.status=="not received" && d==td){
            top++;
        }        
    })
    return (top >0) ? options.fn(this) : options.inverse(this);
    
    },
    isEmptyless:function (item,options){
         let less=0;
    
    item.forEach(item=>{
        const d=moment(item.date).format('DD/MM/YYYY');
        const td=moment(Date.now()).format('DD/MM/YYYY');
        if(item.category=="less" && item.status=="not received" && d==td){
            less++;
        }
        
    })
    
    return (less >0) ? options.fn(this) : options.inverse(this);
    },
    isEmptypre:function (item,options){
        
    let pre=0;
    item.forEach(item=>{
        const d=moment(item.date).format('DD/MM/YYYY');
        const td=moment(Date.now()).format('DD/MM/YYYY');
        if(item.category=="pre" && item.status=="not received" && d==td){
            pre++;
        }
         
    })
    return (pre >0) ? options.fn(this) : options.inverse(this);
    },
    ifreceived:function(status,options){
        return (status == "not received") ? options.fn(this) : options.inverse(this);
    },
    iftop:function ( category,options){
        return (category == "top") ? options.fn(this) : options.inverse(this);
    },
    ifless:function ( category,options){
        return (category == "less") ? options.fn(this) : options.inverse(this);
    },
    ifpre:function ( category,options){
        return (category == "pre") ? options.fn(this) : options.inverse(this);
    },
    formatDate: function(date, format){
        return moment(date).format(format);
    },
    
    today: function(date,options){
        const d=moment(date).format('DD/MM/YYYY');
        const td=moment(Date.now()).format('DD/MM/YYYY');
        return (d == td  ) ? options.fn(this) : options.inverse(this);
    },
    ifsub:function ( category,options){
        return (category == "Top Priority") ? options.fn(this) : options.inverse(this);
    },
    
    expiryDate:function(date){
         
        const d=date.getDate();
        const m=date.getMonth()+3;
        const y=date.getFullYear();
        const ed=new Date(
            y,m,d
        )
        return moment(ed).format('DD/MM/YYYY'); 
    }

}