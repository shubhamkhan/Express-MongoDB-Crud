//  MongoDB Atlas connention
const mongoose = require('mongoose');

const connectdb = async () => {
    try {
        await mongoose.connect('mongodb+srv://'+process.env.DB_ADMIN+':'+process.env.DB_PASSWORD+'@cluster01.nuro7.mongodb.net/'+process.env.DB_NAME+'?retryWrites=true&w=majority',{
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        )
        console.log('MongoDB connected...!!!');
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = connectdb;