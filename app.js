const express = require('express');
const path = require('path');
const pageRouter = require('./routes/pages');
const app = express();


// for body parser.

app.use(express.urlencoded({extended: false}));


// serve static files.

app.use(express.static(path.join(__dirname, 'public')));


// template engine.

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// routers.

app.use('/', pageRouter);


// errors : page not found 404

app.use((req, res, next) => {
    var err = new Error('Page not found');
    err.status = 404;
    next(err);
});


// handling errors

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message);
});


// setting up the server.

app.listen(5000, () => {
    console.log('Server is running on port 5000...');
});

module.export = app;