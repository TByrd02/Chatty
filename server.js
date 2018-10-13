var expres = require ('express'); 
var app = express(); 
var volleyball = require('volleyball');
var cors = require('cors'); 
var port = process.env.PORT || 3000;
var client = yelp.client(aipKey);


// lets system now that JSON is to be used
app.use(express.json());
// parses incoming request with urlencoded payload
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(volleyball);

app.get('/', function(req, res){

res.json({message: "heyyyy"});

});

app.post('/', function(req, res){
 
// get country



});




   