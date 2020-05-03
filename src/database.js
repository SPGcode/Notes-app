const mongoose = require('mongoose');

mongoose.connect("here your database", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify:false,
    useUnifiedTopology: true 
})
 .then(db => console.log('db is connected'))
 .catch(err => console.log(err));