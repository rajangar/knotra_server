const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// const url = 'mongodb://rajangarg:knotra@clusterknotra-shard-00-00-nczgg.mongodb.net:27017,clusterknotra-shard-00-01-nczgg.mongodb.net:27017,clusterknotra-shard-00-02-nczgg.mongodb.net:27017/test?ssl=true&replicaSet=clusterknotra-shard-0&authSource=admin';
const url = 'mongodb://localhost:27017';
const ObjectID=require('mongodb').ObjectID;

class Profile {
    constructor(
    userid,
    email,
    name,
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
                    if (doc != null) {
                        login = 'success';
                        id = doc.profiletableid;
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
                        id: id
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
                    if (doc != null) {
                        login = 'success';
                        id = doc.profiletableid;
                        userid = doc.userid;
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
                        userid: userid
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

    addUserFromAddProfile(profile) {
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
                    "profiletableid": profile.profiletableid
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

    getProfileJson(profile) {
        let jsonprofile = '';
        return jsonprofile = "{" +
            "userid:" + profile.userid +
            ",email:" + profile.email +
            ",name:" + profile.name +
            ",adddetails:{phone:" + profile.phone +
            ",address:" + profile.address +
            ",city:" + profile.city +
            "},country:" + profile.country +
            ",skillarray:[{s_expert:" + profile.s_expert +
            ",s_ready_to_help:" + profile.s_ready_to_help +
            "}],s_to_learn:" + profile.s_to_learn +

            // ",phone:" + profile.phone +
            // ",address:" + profile.address +
            // ",city:" + profile.city +
            // ",country:" + profile.country +
            // ",s_expert:" + profile.s_expert +
            // ",s_ready_to_help:" + profile.s_ready_to_help +
            // ",s_to_learn:" + profile.s_to_learn +
            ",ratings:" + profile.ratings +
            ",credits:" + profile.credits +
            ",credits_to_provide:" + profile.credits_to_provide +
            ",helper_response_per:" + profile.helper_response_per +
            ",help_take_response_per:" + profile.help_take_response_per +
            ",help_taker_pages_id:" + profile.help_taker_pages_id +
            ",help_provider_pages_id:" + profile.help_provider_pages_id +
            ",reviews:" + profile.reviews +
            ",profile_summary:" + profile.profile_summary +
            ",profile_explanation:" + profile.profile_explanation +
        "}";
    }

    addProfile() {
        let self = this;

        let profile = new Profile();

        profile.userid = this.req.body.userid;
        profile.email = this.req.body.email;
        profile.name = this.req.body.name;
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

        //addUserFromAddProfile();

        console.log("addProfile:userid: " + profile.userid + ",email: " + profile.email + ",password: " + profile.password);
        try{
            MongoClient.connect(url, function(err, db) {
                assert.equal(null, err);

                //const jsonprofile = self.getProfileJson(profile);
                db.collection('profile').insertOne({
                "userid": profile.userid,
                "email": profile.email,
                "name": profile.name,
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
                        self.addUserFromAddProfile(profile);
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
            
                db.collection('profile').createIndex({"name":"text"});
                let cursor = db.collection('profile').find(
                    {$text: {$search: query1}}/*, {score: {$meta: "textscore"}}).sort({score:{$meta:"textScore"}}*/);
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
}

module.exports = KnotraService