const express = require("express");
const app = express();
const cors = require("cors");
const pool = require('./db');
const port = 3001;
const userRouter = require('./routes/user.routes')

app.use(cors());
app.use(express.json());
app.use('/api', userRouter)

// app.get('/', (req, res) => {
//     res.send('Hello from Express!');
// });


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
