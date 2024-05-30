const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsData.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const controller = {

  cart: (req, res) => {
    return res.render('cart',{
      products
    });
  },

  details: (req, res) => {
    const product = products.find(product => product.id === +req.params.id)
    return res.render('details', {
      product,
      products
    });
  },
  add: (req, res) => {
    return res.render('productAdd');
  },
  edit: (req, res) => {
    const product = products.find(product => product.id === +req.params.id)
    return res.render('productEdit', {
      ...product
    });
  },
  modify: (req, res) => {
    const { name, category, price, discount, hexColor, textColor, stock, description, rememberImg } = req.body
    
    const productUpdate = products.map((product) => {
      if (product.id == +req.params.id) {
        let imagesRemember = [];
        const newImages = req.files?.images?.map((img) => img.filename) || [];
        if (
          rememberImg === "true" && product.images.length + newImages.length <= 6
        ) {
          imagesRemember = [...product.images, ...newImages];
        }
        if (req.files?.image?.length) {
          const pathFileImgPrimary = path.join(__dirname,`../../public/img/${product.image}`);
          const existFile = fs.existsSync(pathFileImgPrimary);
          existFile && fs.unlinkSync(pathFileImgPrimary)
        }
        if (rememberImg !== "true" && newImages.length <= 6) {
          product.images.forEach((img) => {
            const pathFileImgPrimary = path.join(__dirname,`../../public/img/${img}`);
            const existFile = fs.existsSync(pathFileImgPrimary);
            existFile && fs.unlinkSync(pathFileImgPrimary);
          });
        }
        if (
          (rememberImg === "true" && product.images.length + newImages.length > 6) ||
          (rememberImg !== "true" && newImages.length > 6)
        ) {
          newImages.forEach((img) => {
            const pathFileImgPrimary = path.join (__dirname, `../../public/img/${img}`);
            const existFile = fs.existsSync(pathFileImgPrimary);
            existFile && fs.unlinkSync(pathFileImgPrimary)
          });
          imagesRemember = product.images
        }
        product.name = name?.trim();
        product.category = category;
        product.price = +price;
        product.discount = +discount;
        product.color = { text: textColor, hex: hexColor };
        product.stock = +stock;
        product.image = req.files?.image?.length
            ? req.files.image[0].filename
            : product.image;
        product.images = imagesRemember.length ? imagesRemember : newImages
        product.description = description?.trim();
      }
      return product
    })
    fs.writeFileSync(productsFilePath, JSON.stringify(productUpdate, null, 3), 'utf-8');

    return res.redirect('/');
  },
  destroy: (req,res) =>{
    const productModify = products.filter((product) =>{
      if (product.id === +req.params.id) {
        if (fs.existsSync(`./public/img/${product.image}`)) {
          fs.unlinkSync(`./public/img/${product.image}`);
        }
        product.images.forEach(image => {
          if (fs.existsSync(`./public/img/${image}`)) {
            fs.unlinkSync(`./public/img/${image}`);
          }
        })
        return false
      }
      return true
    });
    fs.writeFileSync(productsFilePath, JSON.stringify(productModify,null, 3), 'utf-8');

    return res.redirect('/')
  }

};

module.exports = controller;
