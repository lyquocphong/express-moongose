var express = require('express');
var app = express();

// set up handlebars view engine
var handlebars = require('express3-handlebars')
    .create({ defaultLayout: 'main', extname: '.hbs' });
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.use(require('body-parser')());
var Validators = require('express-validators');

app.use(function (req, res, next) {
    res.locals.showTests = app.get('env') !== 'production' &&
        req.query.test === '1';
    next();
});

app.get('/headers', function (req, res) {
    res.set('Content-Type', 'text/plain');
    var s = '';
    for (var name in req.headers) s += name + ': ' + req.headers[name] + '\n';
    res.send(s);
});

app.get('/', function (req, res) {
    res.render('login');
});

app.get('/signup', function (req, res) {
    res.render('signup', {
        pageScript: '/js/signup.js'
    });
});

app.post('/api/signup',function(req,res){

    var obj = {
        email: req.body.email,
        password: req.body.email.password,
        confirm_password: req.body.confirm_password,
        name: req.body.username,
        address: req.body.address
    };

    obj = req.body;

    var rules = {
        email: "required|email",
        password: "required",
        confirm_password: "required|confirmed:password"
    };

    var messages = {
        email:{
            email: "Please enter a valid email address.",
            required: "Email is required"
        },
        password:{
            required: "Password is required"
        },
        name:{
            required: "Name is required"
        },
        confirm_password:{
            confirmed: "Password and confirm password does not match.",
            required: "Confirm password is required"
        },
    };

    Validators.validator(obj, rules, messages, function (err, validated) {

        if(validated.fails)
        {
            res.json({result:false,msg:validated.getErrors});
        }

        res.json({result:true});
    });

});

app.get('/login', function (req, res) {
    res.render('login');
});

app.get('/about', function (req, res) {
    var fortune = require('./lib/fortune.js');
    res.render('about', {
        fortune: fortune.getFortune(),
        pageTestScript: '/qa/tests-about.js'
    });
});
// 404 catch-all handler (middleware)
app.use(function (req, res, next) {
    res.status(404);
    res.render('404');
});
// 500 error handler (middleware)
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.');
});