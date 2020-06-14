let express = require('express');
let app = express();

//Set Public Startic Folder
app.use(express.static(__dirname+ '/public'));

//Use view Engine
let expressHbs = require('express-handlebars');
let hbs = expressHbs.create({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');



//Define your routes here
app.use('/',require('./routes/indexRouter'));
app.use('/products',require('./routes/productRouter'));

app.get('/sync',(req,res)=>{
    let models = require('./models');
    models.sequelize.sync()
    .then(()=>{
        res.send('Database sync completed!')
    });
});

app.get('/:page',(req,res)=>{
    let banners = {
        blog: 'Our Blog',
        category: 'Shop Category',
        cart: 'Shopping Cart',
        checkout: 'Check Out',
        confirmation: 'Confirmation',
        contact: 'Contact Us',
        login: 'Login',
        register: 'Register',
        "single-blog": 'Blog Single',
        "single-product": 'Product Single',
        "tracking-order": 'Order Tracking',
        home: 'HCMUS-20B05'

    };
    let page = req.params.page;
    res.render(page,{banner: banners[page]});
});

//Set Server Port & Start Server
app.set('port',process.env.PORT || 5000);
app.listen(app.get('port'),() =>{
    console.log(`Server is running at port ${app.get('port')}`);
});
