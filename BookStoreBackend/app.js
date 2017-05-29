let express = require("express")
let app = express()
let port = 3001
let facade = require("./Facade")
let bodyParser = require('body-parser');
let passport = require("passport")
let passportJWT = require('passport-jwt')
let JWT = require('jsonwebtoken')
let Secret = require('./secret/secret')
let ExtractJwt = passportJWT.ExtractJwt;
let jwtOptions = {}

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = Secret
app.use(expressJWT({secret: secret}).unless({path : ['/login','/books', '/user']}))


app.listen(port, function () {
    console.log("Server Started at Port " + port)
})

app.use(function (req, res, next) {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get("/api/books", function (req, res) {
    facade.getBooks(function (books) {
        res.send(JSON.stringify(books))
    })

    app.post("/api/login", function (req, res) {
        if (req.body.userName && req.body.password) {
            var userName = req.body.userName;
            var password = req.body.password;
        }
        else {
            res.json({message: ""})
            return
        }
        facade.login(userName, password, function (data) {
            if (data.succes === false) res.status(401).json({message: "No authentication"})
            else {
                var payload = {userName: data.user.username}
                var token = JWT.sign(payload, jwtOptions.secretOrKey);
                res.json({message: "ok", token: token})
            }
        })
    })

    app.get(".secret/secret", function (req, res) {
        res.json("success");
    });

    app.post("/api/books", function (req, res) {
        var book = req.body.book
        facade.addBook(book, function (book) {
            res.send(JSON.stringify(book))
        })
    })

    app.put("/api/books", function (req, res) {
        var book = req.body.book
        facade.updateBook(book, function (updatedBook) {
            console.log(updatedBook)
            res.send(JSON.stringify(updatedBook))
        })
    })

    app.delete("/api/books/:id",  function (req, res) {
        var bookid = parseInt(req.params.id)
        facade.deleteBook(bookid, function (response) {
            res.send(JSON.stringify(response))
        })
    })
})
