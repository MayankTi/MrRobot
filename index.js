var express = require('express'),
    products = require('./data/product.json').products,
    ResObj = require('./resObj.js'),
    bodyParser = require('body-parser');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json());

app.use(function(req, res, next) {
  if(req.body && req.body.result && req.body.result.action){
    req.action = req.body.result.action;
    req.product = req.body.result.parameters.Product;
    next();
  }
  else{
    res.json(new ResObj('Sorry, I am not trained to handle such requests. Try me with something else', 'Sorry, I am not trained to handle such requests. Try me with something else', {}, [], ''));
  }
});

app.get('/', function(req, res) {
   res.json('PPJarvis bot - by me');
})

app.post('/', function(req, res) {
  var displayText;
  if(req.action && actions[req.action]){
    if (req.product) {
      displayText = actions[req.action](req.product);
      res.json(new ResObj(displayText, displayText, {}, [], ''));  
    } else if (req.parameters){
      displayText = actions[req.action](req);
      res.json(new ResObj(displayText, displayText, {}, [], ''));  
    }
    
  }
  else{
    displayText = 'Something doesnt feel right. Please contact my creator @ vthukral@paypal.com';
    res.json(new ResObj(displayText, displayText, {}, [], ''));
  }
  
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

var actions = {
  "info": function(productName){
    var details = null;
    products.forEach(function(prod){
      if(productName === prod.name){
         details = prod.details;
      }
    });
    if(details){
      return details
    }
    else{
      return 'Sorry, I am not trained for this product.';
    }
  },
  "availability": function(productName){
    var countriesList = null;
    products.forEach(function(prod){
      if(productName === prod.name){
         countriesList = prod.countries_supported;
      }
    });
    if(countriesList){
      return productName + ' is available in ' + countriesList;
    }
    else{
      return 'Sorry, I don\'t have any country info about ' + req.product;
    }
  },
  "comparision": function(req){
    var details = '';
    if (req.parameters.product1 && req.parameters.product2) {
      products.forEach(function(prod){
        if (req.parameters.product1 == prod.name || req.parameters.product2 == prod.name) {
          details = details + prod.details + "-----------\n\n";
        }
      });
    }
    if (details) {
      return details;
    } else {
      return 'Apologies, my comparision engine is down for not so obvious reasons';
    }
  }
}