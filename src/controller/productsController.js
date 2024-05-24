const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsData.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const controller = {
  
  cart : (req, res) => {
    return res.render('cart');
  },
  
   details : (req, res) => {
    const product = products.find(product => product.id === +req.params.id)
     return res.render('details', {
      product
     });
    },
    add : (req, res) => {
     return res.render('productAdd');
    },
    edit : (req, res) => {
     return res.render('productEdit');
    }

};

module.exports = controller;
