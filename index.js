const express = require('express');
const bodyParser = require('body-parser'); 
const bfhlRoutes = require('./routes/bfhl');
const cors = require('cors');
app.use(cors());

const app = express(); 
app.use(bodyParser.json()); 

app.use('/bfhl', bfhlRoutes);

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
