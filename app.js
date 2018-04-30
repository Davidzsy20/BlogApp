var express = require("express"),
bodyParser  = require('body-parser'),
mongoose    = require("mongoose"),
methodOverride= require("method-override")


app = express()
mongoose.connect("mongodb://localhost/restful_blog_app")
app.set("view engine","ejs")
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
//title 

app.listen(8080, function () {
    console.log("serversdfafdaf");
})

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
})

var Blog = mongoose.model("Blog", blogSchema);

app.get('/', function(req, res) {
    res.redirect("/blogs")
})
app.get("/blogs",function(req, res) {
Blog.find({}, function(err, blogs){
    if(err) {
        console.error("ERROR");
    } else {
  res.render("index", {blogs: blogs})
    }

})

})
app.get("/blogs/new", function(req, res) {
    res.render("new");
})

app.post("/blogs", function(req, res) {
  //creat blog
  //then, redirect,
  Blog.create(req.body.blog, function(err, newBlog) {
  if(err) {
      res.render("new");

  } else {
      res.redirect('/blogs');
  }
  })
})

//Show Route

app.get("/blogs/:id", function(req, res) {
    console.log(req.param.id);
    Blog.findById(req.params.id, function(err, foundBlog) {
        if(err) {
            res.redirect("/blogs");
        }  else {
            console.log(foundBlog)
            res.render("show", {blog: foundBlog});
        }
    })
});

app.get("/blogs/:id/edit", function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog) {
        if(err) {
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog: foundBlog})
        }
    })
})
app.put("/blogs/:id", function(req, res) {
    console.log(req.params.id);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err,updatedBlog ){
        if(err) {
            res.redirect("/blogs");
        }  else{
            res.redirect("/blogs/" + req.params.id);
        }
    })
})

//DELETE ROUTE
app.delete("/blogs/:id", function(req, res) {
    //distory blog
    Blog.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            res.redirect("/blogs");
        } else{
            res.redirect("/blogs");
        }
    })
})


//RESTFUL ROUTES