module.exports = {
    getNextSequence: function(sequenceName){
        let CounterModel = require("../models/counters");

        let sequenceObj;
        CounterModel.update(
            {
                query:{_id: sequenceName },
                //自增1
                update: {$inc:{sequence_value:1}}
            })
            .then(()=>{
                CounterModel.find({_id:sequenceName}, (err, doc)=>{
                    if (err){return;}
                    console.log(doc.sequence_value);

                    sequenceObj = doc;
                })
            })
            .catch((err)=>{ console.log(err)} );

        return sequenceObj.sequence_value;
    }
}