var express    = require('express'),
    app        = express(),
    bodyParser = require('body-parser'),
    mongoose   = require('mongoose');

//app config//
mongoose.connect('mongodb://pradhumna:data6629#@ds145911.mlab.com:45911/postit777');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : true}));  

//mongoose config//
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model('Blog', blogSchema);

//RESTful routes//

app.get('/', function (req, res){
    res.redirect('/blogs');
});

app.get('/blogs', function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log('Something went wrong : ((((');
        } else{
            res.render('index', {blogs : blogs});
            console.log('Index works');
        }
    });
});
app.listen(process.env.PORT, process.env.IP);