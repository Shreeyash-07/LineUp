const express = require('express');
const schedule = require('node-schedule');
var QRCode = require('qrcode');
const queueModel = require('../models/queue');

exports.setTime = async(req,res,next) =>{
    var time = req.body.time;

    var totalSlots = 8;
    var aslots = [];
    var slotss = []
    var [hrs,min] = time.split(':');
    const finalDate = new Date(2022,06,02,hrs,min,00);

    var toSetMin = min;
    
    min = parseInt(min)+15;
    if(min === 60 || min > 60){
        hrs=parseInt(hrs)+1;
        min = min - 60;
    }
    var user = [ 
        {name:'Sanket',phone:'34234324'},
        {name:'Shree'}
    ]
    
    const uri =  await generateQR(user);
    console.log(uri)
    for(var i=0;i<totalSlots;i++){
        var nexthr=parseInt(hrs)+1;
        var st = hrs+":"+min+"-"+nexthr+":"+min;
        aslots.push({time:hrs+":"+min+"-"+nexthr+":"+min,isFull:false});
        slotss.push({time:hrs+":"+min+"-"+nexthr+":"+min,QRCode:uri});
        hrs=nexthr; 
    }

    const job =  schedule.scheduleJob(finalDate,function(){
        queueModel.create({
            date : new Date().toLocaleDateString(),
            availableSlots:aslots,
            slots:slotss,
        },(err,result)=>{
            if(err) console.log(err);
            console.log('New day has been started');
        })
        // generateQR(totalSlots,slots,parseInt(toSetMin)+1);
    });
    res.status(200);//json({message:aslots,test:parseInt(toSetMin)+1})
}
exports.getTime =  async(req,res,next) =>{
    console.log(new Date().toLocaleDateString());
    const slots =  await queueModel.find({date:new Date().toLocaleDateString()})
    let slts = slots[0].availableSlots;
    return res.json(slots[0]); 
}

// function generateQR(slotsNumber,slots,min){
//     var ind = 0;
//     const job = schedule.scheduleJob(min+' * * * *',function(){
//         if(ind === slotsNumber){
//             job.cancel();
//         }
//         console.log(min+' * * * *')
//         console.log(new Date().toLocaleTimeString());
//         console.log(slots[0]);
//         var user = [
//             {name:'Shree',phone:'7738984928'},
//         ]
//         QRCode.toDataURL(user,function(err,url){
//             queueModel.updateOne({date:new Date().toLocaleDateString()},
//             {$push:{slots:[{time:slots[ind],QRCode:url}]}},()=>{
//                 console.log('inserted');
//             });
//         })
//         ind++;
//     })
// }

const generateQR = async(user) =>{
    try{
        return await QRCode.toDataURL(user)
    }catch(err){
        return err;
    }
}




