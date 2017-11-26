const express = require('express')
const KnotraService  = require('./knotraService')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))
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

app.listen(3000, function () {
  console.log('Knotra Web app service listening on port 3000!')
})