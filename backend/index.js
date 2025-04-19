const express = require('express')
const router = express.Router();
const cors = require('cors');
const app = express()
const userManagementRoutes = require('./usermanagement/routes'); 

app.use(cors())
app.use(express.json()); 

app.use('/', userManagementRoutes);

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});