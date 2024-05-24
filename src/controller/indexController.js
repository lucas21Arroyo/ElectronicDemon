const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsData.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const controller = {
	index: (req, res) => {
		return res.render('index', {
			products
		})
	}
};

module.exports = controller;