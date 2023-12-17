require('./server/config/config');

const express = require('express')
var cors = require('cors');
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const path = require('path');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
// parse application/json
app.use(bodyParser.json())

// Configuracion global de rutas
app.use(require('./server/routes/index'));

let renderHTML = path.resolve(__dirname, '../public/index.html');

app.get('/', function (req, res) {
  res.sendFile(renderHTML);
})
 
 
/*mongoose.connect(process.env.URLDB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}, (err) => {
  if (err) throw err;
  console.log("Base de datos online");
});*/
mongoose.connect('mongodb://localhost/basededatos1', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})
 .then(db => console.log('DB is connected'))
 .catch(err => console.error(err));


app.listen(process.env.PORT, ()=> {
    console.log("Escuchando en puerto 2000");
})