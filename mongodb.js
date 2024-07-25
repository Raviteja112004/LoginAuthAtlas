const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Connecting db to nodejs  default:mongodb://localhost:27017/"database name"
// mongoose.connect('mongodb://localhost:27017/LoginSignup', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
//     .then(() => {
//         console.log('Connected to MongoDB');
//     })
//     .catch((e) => {
//         console.log('Failed to connect to MongoDB', e);
//     });

// const LoginSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     }
// });

// Pre-save middleware to hash the password
 
// // Defining the collection using .model() method
// const User = mongoose.model('users', LoginSchema);

// // Exporting the collection
// module.exports = User;
mongoose.connect('mongodb+srv://ravitejamuvce:IGm70s5edUlSiON0@users.ex4rhva.mongodb.net/?retryWrites=true&w=majority&appName=Users');
const LoginSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    });
    LoginSchema.pre('save', async function(next) {
        if (!this.isModified('password')) {
            return next();
        }
   
        try {
             console.log('Hashing password...');
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(this.password, salt);
           console.log('Hashed password:', hashPassword);
            this.password = hashPassword;
            next(); // Call next to proceed
        } catch (error) {
            console.log('Error while hashing password:', error);
            next(error); // Pass the error to the next middleware or error handler
        }
    });
   
    const User = mongoose.model('Authentication',LoginSchema);

   module.exports= User
