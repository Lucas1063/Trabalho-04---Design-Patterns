

class Cart {
    constructor() {
        this.items = [];
    }

    addItem(product) {
        this.items.push(product);
    }

    getTotal() {
        return this.items.reduce((sum, item) => sum + item.price, 0);
    }
}
module.exports = Cart;