var express    = require('express'),
    app        = express(),
    bodyParser = require('body-parser'),
    mongoose   = require('mongoose');

//app config//
mongoose.connect('mongodb://pradhumna:data6629@ds145911.mlab.com:45911/postit777');
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

//Index Route
app.get('/blogs', function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log('Something went wrong : ((((');
        } else{
            res.render('index', {blogs : blogs});
        }
    });
});

//New Route//
app.get('/blogs/new', function(req, res){
    res.render('new');
});

//Create Route//
app.post('/blogs', function(req, res){
    //create blog//
    Blog.create(req.body.blog , function(err, newBlog){
        if(err){
            res.render('new');
        }else {
            //then redirect to index//
            res.redirect('/blogs');
        }
    });
});

//Show Route//
app.get('/blogs/:id', function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect('/blogs');
        }else{
            res.render('show', {blog: foundBlog})
        }
    });
});
app.listen(process.env.PORT, process.env.IP);