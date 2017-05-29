let MongoClient = require('mongodb').MongoClient
let assert = require('assert')
let url = 'mongodb://127.0.0.1/booksdatabase'
let autoIncrement = require("mongodb-autoincrement");
let bcrypt = require("bcrypt")
let mongoose = require("mongoose")
let Schema = mongoose.Schema


var UserSchema = new Schema({
    userName: { type: String, unique: true, required: true },
    password: { type: String, required: true }
})

UserSchema.pre("save", function (next) {
    var user = this
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) { return next(err) }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) { return next(err) }
                user.password = hash
                next()
            })
        })
    } else {
        return next()
    }
})

UserSchema.methods.comparePassword = function (passw, callback) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) { return callback(err) }
        callback(null, isMatch)
    })
}

function setURL(newURL){
    url = newURL
}

function getBooks(callback){
    MongoClient.connect(url, function(err,db){
        assert.equal(null,err)
        assert.ok(db != null)

        db.collection("books").find({}).toArray(function(err,data){
            assert.equal(null,err)
            var books = data
            callback(books)
            db.close()
        })
    })
}

function addBook(book, callback){
    console.log(book)
    MongoClient.connect(url, function(err,db){
        assert.equal(null,err)
        assert.ok(db != null)
        autoIncrement.getNextSequence(db, "books", function (err, autoIndex) {
                var collection = db.collection("books")
                book.id = autoIndex
                collection.insertOne({id: book.id, title: book.title, info: book.info, moreInfo: book.moreInfo}, function(err,data){
                    assert.equal(null,err)
                    var result = data.ops[0]
                    callback(result)
               })
            })

        })
    
}

function deleteBook(bookId, callback){
    MongoClient.connect(url, function(err,db){
        assert.equal(null,err)
        assert.ok(db != null)

        db.collection("books").deleteOne({id: bookId}, function(err,data){
            assert.equal(null,err)
            var response = data
            callback(response)
        })
    })
}

function updateBook(book,callback){
    MongoClient.connect(url,function(err,db){
        assert.equal(null,err)
        assert.ok(db != null)
        var options = {
            returnOriginal : false,
            upsert: true
        }

        db.collection("books").findOneAndReplace({id: book.id},
                    {$set: {"id": book.id, "title": book.title, "info": book.info, "moreInfo": book.moreInfo}},
                    options,
                            function(err,data){
                            assert.equal(null,err)
                            var updatedBook = data.value
                            callback(updatedBook)
                            })
    })
}



function createUser(username, password, callback){
    let hashedPW = bcrypt.hashSync(password,10)
    MongoClient.connect(url, function(err,db){
        assert.equal(null,err)
        assert.ok(db != null)

        db.collection("users").insertOne({username:username, password:hashedPW}, function(err,data){
            assert.equal(null,err)
            var result = data.ops[0]
            callback(result)
        })
    })
}

function findUser(username,callback){
    MongoClient.connect(url,function(err,db){
        assert.equal(null,err)
        assert.ok(db != null)

        db.collection("users").findOne({username:username}, function(err,data){
            assert.equal(null,err)
            user = data
            callback(user)
        })
    })
}

function login(username,password,callback){
    MongoClient.connect(url,function(err,db){
        assert.equal(null,err)
        assert.ok(db != null)

        db.collection("users").findOne({username:username}, function(err,data){
            if(data == null){
                callback({user:null, succes:false})
                return
            }
            user = data
            if(bcrypt.compareSync(password, user.password)){
                callback({user: user, succes:true})
            }
            else{
                console.log("Failed to authenticate user!")
                callback({user:null, succes:false})
            }
        })
    })
}

var facade = {
    getBooks: getBooks,
    addBook : addBook,
    deleteBook : deleteBook,
    updateBook : updateBook,
    setURL : setURL,
    createUser : createUser,
    login : login,
    findUser: findUser
}

module.exports = facade