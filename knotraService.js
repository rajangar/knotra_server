const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://rajangarg:knotra@clusterknotra-shard-00-00-nczgg.mongodb.net:27017,clusterknotra-shard-00-01-nczgg.mongodb.net:27017,clusterknotra-shard-00-02-nczgg.mongodb.net:27017/test?ssl=true&replicaSet=clusterknotra-shard-0&authSource=admin';
//const url = 'mongodb://localhost:27017';
const ObjectID = require('mongodb').ObjectID;
const request = require('request');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rajan.garg.tiet@gmail.com',
      pass: 'janakmama2'
    }
});

class Profile {
    constructor(
    userid,
    email,
    firstName,
    lastName,
    phone,
    address,
    city,
    country,
    s_expert,
    s_ready_to_help,
    s_to_learn,
    ratings,
    credits,
    credits_to_provide,
    helper_response_per,
    help_take_response_per,
    help_taker_pages_id,
    help_provider_pages_id,
    reviews,
    profile_summary,
    profile_explanation,

    password,
    profiletableid) {

    }
}

class KnotraService{
    
    constructor(req, res){
        this.req = req
        this.res = res
    }

    insert(userid1, email1, password1, db, callback){
        db.collection('user').insertOne({
                userid : userid1,
                email: email1,
		        password : password1
            }, function(){
            callback()      
        })
    }

    addUser(){
        let self = this;
        let userid = this.req.body.userid;
        let email = this.req.body.email;
	    let password = this.req.body.password;
	    console.log("userid: " + userid + ",email: " + email + ",password: " + password);
        try{
            MongoClient.connect(url, function(err, db) {
                assert.equal(null, err);
                self.insert(userid, email, password, db, function(){
                    db.close()
                    return self.res.status(200).json({
                        status: 'success'
                    })
                })
            });
        }
        catch(error){
            return self.res.status(500).json({
                status: 'error',
                error: error
            })
        }
    }

    getUserById(){
        let self = this;
        let userid1 = this.req.query.userid;

        let password1 = this.req.query.password;
        console.log("userid: " + userid1 + ",password: " + password1);
        try{
            MongoClient.connect(url, function(err, db) {
                assert.equal(null, err);
                //let userList = []
            
                //let cursor = db.collection('user').find({userid: userid1,password: password1});
                //let cursor = db.collection('user').find();
                /*let cursor = */db.collection('user').findOne({userid: userid1,password: password1}, function(err, doc) {

                    //cursor.each(function(err, doc) {
                    assert.equal(err, null);
                    db.close();
                    //console.log("doc: " + doc);
                    let login = '';
                    let id = '';
                    let email = '';
                    let verified = false;
                    if (doc != null) {
                        login = 'success';
                        id = doc.profiletableid;
                        email = doc.email;
                        verified = doc.verified;
                        //userList.push(doc)
                    } else {
                        login = 'fail';
                    }

                    //let login = ''
                    //   if(userList.length>0) {
                    //       login = 'success';
                    //   } else {
                    //       login = 'fail';
                    //   }
                    return self.res.status(200).json({
                        status: login,
                        id: id,
                        email: email,
                        verified: verified
		                //data : userList
                    })
            
                });
            });
        }
        catch(error){
            return self.res.status(500).json({
                status: 'error',
                error: error
            })
        }
    }

    getUserByEmail(){
        let self = this;
    
        let email1 = this.req.query.email;
        let password1 = this.req.query.password;
        console.log("email: " + email1 + ",password: " + password1);
        try{
            MongoClient.connect(url, function(err, db) {
                assert.equal(null, err);
                //let userList = []
            
                //let cursor = db.collection('user').find({userid: userid1,password: password1});
                //let cursor = db.collection('user').find();
                /*let cursor = */db.collection('user').findOne({email: email1,password: password1}, function(err, doc) {

                //cursor.each(function(err, doc) {
                    assert.equal(err, null);
                    db.close();
                    //console.log("doc: " + doc);
                    let login = '';
                    let id = '';
                    let userid = '';
                    let verified = false;
                    if (doc != null) {
                        login = 'success';
                        id = doc.profiletableid;
                        userid = doc.userid;
                        verified = doc.verified;
                        //userList.push(doc)
                    } else {
                        login = 'fail';
                    }

                    //let login = ''
                    //   if(userList.length>0) {
                    //       login = 'success';
                    //   } else {
                    //       login = 'fail';
                    //   }
                    return self.res.status(200).json({
                        status: login,
                        id: id,
                        userid: userid,
                        verified: verified
		                //data : userList
                    })
            
                //}
                });
            });
        }
        catch(error){
            return self.res.status(500).json({
                status: 'error',
                error: error
            })
        }
    }

    getEmailUser(){
        let self = this;
    
        let email1 = this.req.query.email;
        console.log("email: " + email1);
        try{
            MongoClient.connect(url, function(err, db) {
                assert.equal(null, err);
                //let userList = []
            
                //let cursor = db.collection('user').find({userid: userid1,password: password1});
                //let cursor = db.collection('user').find();
                /*let cursor = */db.collection('user').findOne({email: email1}, function(err, doc) {

                    assert.equal(err, null);
                    db.close();
                    let login = '';
                    let id = '';
                    let userid = '';
                    if (doc != null) {
                        login = 'success';
                        //userList.push(doc)
                    } else {
                        login = 'fail';
                    }
                    return self.res.status(200).json({
                        status: login,
                    })
                });
            });
        }
        catch(error){
            return self.res.status(500).json({
                status: 'error',
                error: error
            })
        }
    }

    getIdUser(){
        let self = this;
    
        let userid1 = this.req.query.userid;
        console.log("userid: " + userid1);
        try{
            MongoClient.connect(url, function(err, db) {
                assert.equal(null, err);
                db.collection('user').findOne({userid: userid1}, function(err, doc) {

                    assert.equal(err, null);
                    db.close();
                    let login = '';
                    if (doc != null) {
                        login = 'success';
                    } else {
                        login = 'fail';
                    }
                    return self.res.status(200).json({
                        status: login,
                    })
                });
            });
        }
        catch(error){
            return self.res.status(500).json({
                status: 'error',
                error: error
            })
        }
    }

    deleteUser(){
        let self = this;
        console.log("Delete ");
        try{
            MongoClient.connect(url, function(err, db) {
                assert.equal(null, err);
                db.collection('user').remove({});
                db.close();
                return self.res.status(200).json({
                    status: "success"
                })
            });
        }
        catch(error){
            return self.res.status(500).json({
                status: 'error',
                error: error
            })
        }
    }

    deleteProfile(){
        let self = this;
        console.log("Delete Profile");
        try{
            MongoClient.connect(url, function(err, db) {
                assert.equal(null, err);
                db.collection('profile').remove({});
                db.close();
                return self.res.status(200).json({
                    status: "success"
                })
            });
        }
        catch(error){
            return self.res.status(500).json({
                status: 'error',
                error: error
            })
        }
    }

    addUserFromAddProfile(profile, randomnumber) {
        let self = this;
        let userid = profile.userid;
        let email = profile.email;
        let password = profile.password;
        let profiletableid = profile.profiletableid;

	    console.log("addUser: userid: " + userid + ",email: " + email + ",password: " + password);
        try{
            MongoClient.connect(url, function(err, db) {
                assert.equal(null, err);
                db.collection('user').insertOne({
                    "userid": profile.userid,
                    "email": profile.email,
                    "password": profile.password,
                    "profiletableid": profile.profiletableid,
                    "randomnumber": randomnumber,
                    "verified": false
                }, function(err, doc) {
                // self.insert(userid, email, password, profiletableid, db, function(){
                    //db.close()
                    //return self.res.status(200).json({
                        //status: 'success'
                    //})
                })
            });
        }
        catch(error){
            return self.res.status(500).json({
                status: 'error',
                error: error
            })
        }
    }

    addProfile() {
        let self = this;

        let profile = new Profile();

        profile.userid = this.req.body.userid;
        profile.email = this.req.body.email;
        profile.firstName = this.req.body.firstName;
        profile.lastName = this.req.body.lastName;
        profile.phone = this.req.body.phone;
        profile.address = this.req.body.address;
        profile.city = this.req.body.city;
        profile.country = this.req.body.country;
        profile.s_expert = this.req.body.s_expert; //Skills Expert
        profile.s_ready_to_help = this.req.body.s_ready_to_help;
        profile.s_to_learn = this.req.body.s_to_learn;
        profile.ratings = this.req.body.ratings;
        profile.credits = this.req.body.credits;
        profile.credits_to_provide = this.req.body.credits_to_provide;
        profile.helper_response_per = this.req.body.helper_response_per;
        profile.help_take_response_per = this.req.body.help_take_response_per;
        profile.help_taker_pages_id = this.req.body.help_taker_pages_id;
        profile.help_provider_pages_id = this.req.body.help_provider_pages_id;
        profile.reviews = this.req.body.reviews;
        profile.profile_summary = this.req.body.profile_summary;
        profile.profile_explanation = this.req.body.profile_explanation;

        profile.password = this.req.body.password;

        var randomnumber = Math.floor(Math.random() * 899999 + 100000);

        //addUserFromAddProfile();

        console.log("addProfile:userid: " + profile.userid + ",email: " + profile.email + ",password: " + profile.password);

        console.log ('resp = ' + this.req.body.g_recaptcha_response);
        
         
        var url1 = 'https://www.google.com/recaptcha/api/siteverify?secret=6LeJcjoUAAAAAFBSIYNzcZleibkmG6HMligiKvMS&response=' + this.req.body.g_recaptcha_response;
        var options = {
          url: url1,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        };
        
        request(options, function(err, res1, body) {
          if (res1 && (res1.statusCode === 200 || res1.statusCode === 201)) {
              
            body = JSON.parse (body);
            console.log(body);
            console.log("success: " + body.success);
            if (body.success) {

        try{
            MongoClient.connect(url, function(err, db) {
                assert.equal(null, err);

                db.collection('profile').insertOne({
                "userid": profile.userid,
                "email": profile.email,
                "firstname": profile.firstName,
                "lastname": profile.lastName,
                "adddetails":{"phone": profile.phone,
                "address": profile.address,
                "city": profile.city},
                "country": profile.country,
                "skillarray":[{"s_expert": profile.s_expert,
                "s_ready_to_help": profile.s_ready_to_help}],
                "s_to_learn": profile.s_to_learn,
                "ratings": profile.ratings,
                "credits": profile.credits,
                "credits_to_provide": profile.credits_to_provide,
                "helper_response_per": profile.helper_response_per,
                "help_take_response_per": profile.help_take_response_per,
                "help_taker_pages_id": profile.help_taker_pages_id,
                "help_provider_pages_id": profile.help_provider_pages_id,
                "reviews": profile.reviews,
                "profile_summary": profile.profile_summary,
                "profile_explanation": profile.profile_explanation
            }, function(err, doc) {
                
                    assert.equal(null, err);
                    db.close()
                    if (doc) {
                        profile.profiletableid = doc.insertedId;
                        self.addUserFromAddProfile(profile, randomnumber);
                        var text1 = 'Please find below code to verify your email:\n\nUserId: ' + profile.userid + '\nCode: ' + randomnumber;
                        var mailOptions = {
                            from: 'knotra',
                            to: profile.email,
                            subject: 'Knotra Email Verification',
                            text: text1
                        };
                          
                        transporter.sendMail(mailOptions, function(error, info){
                            if (error) {
                              console.log(error);
                            } else {
                              console.log('Email sent: ' + info.response);
                            }
                        });
                    }
                    return self.res.status(200).json({
                        status: 'success'
                    })
                })
            });
        }
        catch(error){
            return self.res.status(500).json({
                status: 'error',
                error: error
            })
        }
    }
    else {
        return self.res.status(200).json({
            status: 'errorcaptcha'
        })
    }
}
    });
    }

    getProfile(){
        let self = this;
        //let userid1 = this.req.query.userid;

        //let password1 = this.req.query.password;
        //console.log("userid: " + userid1 + ",password: " + password1);
        try{
            MongoClient.connect(url, function(err, db) {
                assert.equal(null, err);
                let userList = []
        
                //let cursor = db.collection('user').find({userid: userid1,password: password1});
                let cursor = db.collection('profile').find();
                //let cursor = db.collection('user').findOne({userid: userid1,password: password1}, function(err, doc) {

                cursor.each(function(err, doc) {
                    assert.equal(err, null);
                    db.close();
                    console.log("doc: " + doc);
                    // let login = '';
                    // let id = '';
                    if (doc != null) {
                        // login = 'success';
                        // id = doc._id;
                        userList.push(doc)
                    } else {
                    //     login = 'fail';
                    // }

                    //let login = ''
                    //   if(userList.length>0) {
                    //       login = 'success';
                    //   } else {
                    //       login = 'fail';
                    //   }
                    return self.res.status(200).json({
                        // status: login,
                        // id: id
                        data : userList
                    })
        
                }
                });
            });
        }
        catch(error){
            return self.res.status(500).json({
                status: 'error',
                error: error
            })
        }
    }

    getAllUsers(){
        let self = this;
        //let userid1 = this.req.query.userid;

        //let password1 = this.req.query.password;
        //console.log("userid: " + userid1 + ",password: " + password1);
        try{
            MongoClient.connect(url, function(err, db) {
                assert.equal(null, err);
                let userList = []
        
                //let cursor = db.collection('user').find({userid: userid1,password: password1});
                let cursor = db.collection('user').find();
                //let cursor = db.collection('user').findOne({userid: userid1,password: password1}, function(err, doc) {

                cursor.each(function(err, doc) {
                    assert.equal(err, null);
                    db.close();
                    console.log("doc: " + doc);
                    // let login = '';
                    // let id = '';
                    if (doc != null) {
                        // login = 'success';
                        // id = doc._id;
                        userList.push(doc)
                    } else {
                    //     login = 'fail';
                    // }

                    //let login = ''
                    //   if(userList.length>0) {
                    //       login = 'success';
                    //   } else {
                    //       login = 'fail';
                    //   }
                    return self.res.status(200).json({
                        // status: login,
                        // id: id
                        data : userList
                    })
        
                }
                });
            });
        }
        catch(error){
            return self.res.status(500).json({
                status: 'error',
                error: error
            })
        }
    }

    getProfileById(){
        let self = this;
        let userid1 = this.req.query.userid;

        let id1 = this.req.query.id;
        console.log("userid: " + userid1 + ",id: " + id1);
        try{
            MongoClient.connect(url, function(err, db) {
                assert.equal(null, err);
                let userList = []
            
                //let cursor = db.collection('user').find({userid: userid1,password: password1});
                //let cursor = db.collection('user').find();
                /*let cursor = db.collection('profile').findOne({_id: ObjectID(id1),userid:userid1}, function(err, doc) {*/

                db.collection('profile').findOne({userid:userid1}, function(err, doc) {
                    //cursor.each(function(err, doc) {
                    assert.equal(err, null);
                    db.close();
                    //console.log("doc: " + doc);
                    let login = '';
                    //let id = '';
                    if (doc != null) {
                        login = 'success';
                        //id = doc.profiletableid;
                        if (doc._id == id1) {
                            userList.push(doc)
                        } else {
                            userList.push(doc.skillarray)
                        }
                    } else {
                        login = 'fail';
                    }

                    //let login = ''
                    //   if(userList.length>0) {
                    //       login = 'success';
                    //   } else {
                    //       login = 'fail';
                    //   }
                    return self.res.status(200).json({
                        status: login,
                        //id: id
		                data : userList
                    })
            
                });
            });
        }
        catch(error){
            return self.res.status(500).json({
                status: 'error',
                error: error
            })
        }
    }

    getSearchFromProfile(){
        let self = this;
        let query1 = this.req.query.query;
        let id1 = this.req.query.id;

        console.log("query: " + query1);
        try{
            MongoClient.connect(url, function(err, db) {
                assert.equal(null, err);
                let userList = []
            
                //db.collection('profile').dropIndexes();
                db.collection('profile').createIndex({"firstname":"text", "lastname":"text"});
                let cursor = db.collection('profile').find(
                    {$text: {$search: query1}}, {score: {$meta: "textScore"}}).sort({score:{$meta:"textScore"}});
                //let cursor = db.collection('user').find();
                /*let cursor = db.collection('profile').findOne({userid:userid1}, function(err, doc) {*/

                    let login = 'fail';
                    cursor.each(function(err, doc) {
                    assert.equal(err, null);
                    db.close();
                    console.log("doc: " + doc);
                    
                    //let id = '';
                    if (doc != null) {
                        login = 'success';
                        //id = doc.profiletableid;
                        if(doc._id == id1) {
                            userList.push(doc)
                        } else {
                            userList.push(doc.skillarray)
                        }
                    } else {
                    //    login = 'fail';
                    //}

                    //let login = ''
                    //   if(userList.length>0) {
                    //       login = 'success';
                    //   } else {
                    //       login = 'fail';
                    //   }
                    return self.res.status(200).json({
                        status: login,
                        //id: id
		                data : userList
                    })
                }
            
                });
            });
        }
        catch(error){
            return self.res.status(500).json({
                status: 'error',
                error: error
            })
        }
    }

    getVerification(){
        let self = this;
    
        let userid1 = this.req.query.userid;
        let email1 = this.req.query.email;
        let randomnumber1 = this.req.query.randomnumber;
        console.log("email: " + email1 + ",userid: " + userid1 + ",random: " + randomnumber1);
        try{
            MongoClient.connect(url, function(err, db) {
                assert.equal(null, err);
                db.collection('user').findOne({userid: userid1,email: email1,randomnumber: +randomnumber1}, function(err, doc) {

                //cursor.each(function(err, doc) {
                    assert.equal(err, null);
                    db.close();
                    //console.log("doc: " + doc);
                    let login = '';
                    if (doc != null) {
                        login = 'success';
                    } else {
                        login = 'fail';
                    }

                    return self.res.status(200).json({
                        status: login,
                    })
            
                });
            });
        }
        catch(error){
            return self.res.status(500).json({
                status: 'error',
                error: error
            })
        }
    }

    setVerification(){
        let self = this;
    
        let userid1 = this.req.query.userid;
        let email1 = this.req.query.email;
        let verified1 = (this.req.query.verified == 'true');

        console.log("email: " + email1 + ",userid: " + userid1 + ",verified: " + verified1);
        try{
            MongoClient.connect(url, function(err, db) {
                assert.equal(null, err);
                let result = db.collection('user').updateOne({userid: userid1,email: email1},{$set: {verified: verified1}});

                    assert.equal(err, null);
                    db.close();
                    //console.log("doc: " + doc);
                    let login = '';
                    login = 'success';

                    return self.res.status(200).json({
                        status: login,
                    })
            
                })
        }
        catch(error){
            return self.res.status(500).json({
                status: 'error',
                error: error
            })
        }
    }

    resetRandom(){
        let self = this;
    
        var randomnumber = Math.floor(Math.random() * 899999 + 100000);
        let userid1 = this.req.query.userid;
        let email1 = this.req.query.email;
        
        console.log("email: " + email1 + ",userid: " + userid1 + ",random: " + randomnumber);
        try{
            MongoClient.connect(url, function(err, db) {
                assert.equal(null, err);
                let result = db.collection('user').updateOne({userid: userid1,email: email1},{$set: {randomnumber: randomnumber}});
                
                var text1 = 'Please find below code to verify your email:\n\nUserId: ' + userid1 + '\nCode: ' + randomnumber;
                var mailOptions = {
                    from: 'knotra',
                    to: email1,
                    subject: 'Knotra Email Verification',
                    text: text1
                };
                  
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                });

                    assert.equal(err, null);
                    db.close();
                    //console.log("doc: " + doc);
                    let login = '';
                    login = 'success';

                    return self.res.status(200).json({
                        status: login,
                    })
            
                })
        }
        catch(error){
            return self.res.status(500).json({
                status: 'error',
                error: error
            })
        }
    }

    getPassword(){
        let self = this;
    
        let email1 = this.req.query.email;
        console.log("email: " + email1);
        try{
            MongoClient.connect(url, function(err, db) {
                assert.equal(null, err);
                db.collection('user').findOne({email: email1}, function(err, doc) {

                //cursor.each(function(err, doc) {
                    assert.equal(err, null);
                    db.close();
                    //console.log("doc: " + doc);
                    let login = '';
                    if (doc != null) {
                        login = 'success';
                        var text1 = 'Please find below password for your login:\n\nUserId: ' + doc.userid +
                        '\nPassword: ' + doc.password;
                        var mailOptions = {
                            from: 'knotra',
                            to: email1,
                            subject: 'Knotra Forgot Password',
                            text: text1
                        };
                          
                        transporter.sendMail(mailOptions, function(error, info){
                            if (error) {
                              console.log(error);
                              login = 'fail'
                            } else {
                              console.log('Email sent: ' + info.response);
                            }
                        });
                    } else {
                        login = 'fail';
                    }

                    return self.res.status(200).json({
                        status: login,
                    })
            
                });
            });
        }
        catch(error){
            return self.res.status(500).json({
                status: 'error',
                error: error
            })
        }
    }
}

module.exports = KnotraService