const conn = require('../db/conn')

const { ObjectId } = require('mongodb'); 
class Product {

    constructor(name, price, image, description) {
        this.name = name;
        this.price = price;
        this.image = image;
        this.description = description;
    }

    save() {

        console.log('Dados a serem inseridos:', {
            name: this.name,
            price: this.price,
            image: this.image,
            description: this.description
        });

        const product = conn.db().collection('products').insertOne({
            name: this.name,
            price: this.price,
            image: this.image,
            description: this.description
        })

        return product
    }

    static async getProducts() {
        const products = await conn.db().collection('products').find().toArray()
        return products;
    }

    static async getProductById(id) {
        const product = await conn.db().collection('products').findOne({ _id: new ObjectId(id) });

        return product
    }

    static async removeProductById(id) {
        await conn.db().collection('products').deleteOne({_id: new ObjectId(id)})
        return;
    }

    updateProduct(id) {
        conn.db().collection('products').updateOne({ _id: new ObjectId(id)}, { $set: this})
        return;
    }

}

module.exports = Product