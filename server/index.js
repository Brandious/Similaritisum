const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

const {router} = require('./router');

const app = express();

app.use(fileUpload({
    createParentPath: true
}))

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, `../data/`)));


app.use('/', router);



app.listen(port, () => {
    console.log('App is listening on port: ' + port);
})

