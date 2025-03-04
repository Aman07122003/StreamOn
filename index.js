import dotenv from 'dotenv';
import connectToDb from './db/dbConnect.js';
import app from './app.js'

dotenv.config({
    path: './.env'
})

connectToDb()

.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is listening on: ${process.env.PORT}`);
    })
})
.catch((error) => console.log("MONGODB connection failed "))