var expres = require ('express'); 
var app = express(); 
var volleyball = require('volleyball');
var cors = require('cors'); 
var port = process.env.PORT || 3000;
var client = yelp.client(aipKey);
// var yelp = require('yelp-fusion');
// var yelpKey = "mJWIQAP0TRAqaq4HZpSwAXClm_nVV5xwTLlL3-B7JMNFb7AxvfoujRHVMHpn-hDpRQZae_aXwz4HBfcWcH4XoDLxWNpYNWF4JKC4p9brCL-BehswQ3uyICCc70hfW3Yx";

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
 
//country grab

if(req.body.queryResult.action == "input.get_country"){
    var country = req.body.queryResult.parameters.country; 
    var url = "https://restcountries.eu/rest/v2/name/"

    var chat = "";
    var chat2 = "";
    request(url,function(error,response, body){
        var body = JSON.parse(body);
        var data = {}; 
        if(body.length> 1){
            for(var i = 0; i< body.length; i++){
                if(body[i].name.toLowerCase() == country.toLowerCase()){
                            data= body[i];
                 }  
            }
        } else{
            data = body[0];

        }

        //JSON.parse(body)[0].name;
        var name = data.name;
        //JSON.parse(body)[0].capital;
        var cap = data.capital;
        //Json.parse(body)[0].capital;
        var population = data.population; 
        //We formated string for the population
        var populationStr = population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        var subregion = data.subregion;
            // will use this error message as the default rather than
            // diologue sweet default message
        if(error){
            res.json({"fulfillmentText": "We are sorry. We are having trouble retrieving the information requested for "+ name + ". "+ " Please try again."})

        }

        chat = "The Capital of "+ name + "is "+ cap + "." + " "+" Subregion:"+ subregion +" Would you like more information about " + name +"?" 

        res.json({"fullfillmentText": chat});

        chat2 =  name+"'s"+ "Population:" + populationStr + "." + "Enter a city in " + name + "and I can get some further information like the weather."

        res.json({"fullfillmentText": chat2});
        
    })

}



});




   