module.exports = {
    cart: (req, res) => {
        return res.render('cart');
    },
    detail: (req, res) => {
        return res.render('detail');
    },
    add: (req, res) => {
        return res.render('add');
    },
    edit: (req, res) => {
        return res.render('edit');
    }
}