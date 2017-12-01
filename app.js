const express = require('express')
const multer  = require('multer')
const morgan = require('morgan')
const crypto = require('crypto')
const path = require('path')


const storage = multer.diskStorage({
  destination: './Images/',
  filename: function (req, file, callback) {
    console.log('filename function')
    crypto.pseudoRandomBytes(16, function(err, raw) {
      if (err) return callback(err)
    
      callback(null, raw.toString('hex') + path.extname(file.originalname))
    })
  }
})

const upload = multer({storage: storage})

const KnotraService  = require('./knotraService')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : true}))
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'Images')));
app.all("/api/*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    return next();
});

app.post('/api/addUser', function (req, res) {
  let knotraServiceObj = new KnotraService(req, res)
  knotraServiceObj.addUser()
})

app.get('/api/getUserById', function (req, res) {
  let knotraServiceObj = new KnotraService(req, res)
  knotraServiceObj.getUserById()
})

app.get('/api/getUserByEmail', function (req, res) {
  let knotraServiceObj = new KnotraService(req, res)
  knotraServiceObj.getUserByEmail()
})

app.get('/api/getEmailUser', function (req, res) {
  let knotraServiceObj = new KnotraService(req, res)
  knotraServiceObj.getEmailUser()
})

app.get('/api/getIdUser', function (req, res) {
  let knotraServiceObj = new KnotraService(req, res)
  knotraServiceObj.getIdUser()
})

app.delete('/api/deleteUser', function (req, res) {
  let knotraServiceObj = new KnotraService(req, res)
  knotraServiceObj.deleteUser()
})

app.delete('/api/deleteProfile', function (req, res) {
  let knotraServiceObj = new KnotraService(req, res)
  knotraServiceObj.deleteProfile()
})

app.post('/api/addProfile', function (req, res) {
  let knotraServiceObj = new KnotraService(req, res)
  knotraServiceObj.addProfile()
})

app.get('/api/getProfile', function (req, res) {
  let knotraServiceObj = new KnotraService(req, res)
  knotraServiceObj.getProfile()
})

app.get('/api/getProfileById', function (req, res) {
  let knotraServiceObj = new KnotraService(req, res)
  knotraServiceObj.getProfileById()
})

app.get('/api/getAllUsers', function (req, res) {
  let knotraServiceObj = new KnotraService(req, res)
  knotraServiceObj.getAllUsers()
})

app.get('/api/getSearchFromProfile', function (req, res) {
  let knotraServiceObj = new KnotraService(req, res)
  knotraServiceObj.getSearchFromProfile()
})

app.get('/api/getVerification', function (req, res) {
  let knotraServiceObj = new KnotraService(req, res)
  knotraServiceObj.getVerification()
})

app.put('/api/setVerification', function (req, res) {
  let knotraServiceObj = new KnotraService(req, res)
  knotraServiceObj.setVerification()
})

app.put('/api/resetRandom', function (req, res) {
  let knotraServiceObj = new KnotraService(req, res)
  knotraServiceObj.resetRandom()
})

app.get('/api/getPassword', function (req, res) {
  let knotraServiceObj = new KnotraService(req, res)
  knotraServiceObj.getPassword()
})

app.post('/api/savePicture', upload.single('avatar'), function (req, res, next) {
  /*console.log('1userid: ' + req.body.userid)
  console.log('name: ' + req.body.avatar)
  
  if (!req.file) {
    console.log("No file received");
    return res.send({
      success: false
    });

  } else {
    console.log('file received');
      console.log('uploaded');
      const host = req.hostname
      const filePath = req.protocol + "://" + host + '/' + req.file.path
      console.log('host: ' + host + ',file: ' + filePath + ',dirname: ' + __dirname)
      console.log('2userid: ' + req.body.userid)
      
    return res.sendFile(__dirname + '\\' + req.file.path)
    
  }*/
  let knotraServiceObj = new KnotraService(req, res)
  knotraServiceObj.savePicture()
})

app.post('/api/removePicture', function (req, res) {
  let knotraServiceObj = new KnotraService(req, res)
  knotraServiceObj.removePicture()
})

app.get('/api/getAvatar', function (req, res) {
  
  // console.log('File: ' + __dirname + '\\' + 'Images\\61ccf7f2a01c76db7a16c28ad0db1fd5.png')
  // return res.sendFile(__dirname + '\\' + 'Images\\61ccf7f2a01c76db7a16c28ad0db1fd5.png')
  let knotraServiceObj = new KnotraService(req, res)
  knotraServiceObj.getAvatar()
})

app.listen(3000, function () {
  console.log('Knotra Web app service listening on port 3000!')
})