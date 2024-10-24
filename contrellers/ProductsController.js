const Product = require('../models/Product');

module.exports = class ProductController {
    static async showProducts(req, res) {
        const products = await Product.getProducts()
        
        res.render('products/all', {products});
    }

    static createProduct(req, res) {
        res.render('products/create')
    }

    static createProductPost(req, res) {
        console.log(req.body)
        const name = req.body.name
        const price = req.body.price
        const image = req.body.image
        const description = req.body.description
        
        const product = new Product(name, price, image, description)

        product.save()

        res.redirect('/products')
    }

    static async getProdutc(req, res) {
        const id = req.params.id
        const product = await Product.getProductById(id)
        console.log(product)
  
        res.render('products/product', { product })
    }
};