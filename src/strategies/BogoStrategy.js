const PromotionStrategy = require('./PromotionStrategy');

class BogoStrategy extends PromotionStrategy {
    calculateDiscount(cart) {
        let discount = 0;
        const itemsByName = {};

        // Agrupa produtos por nome
        cart.items.forEach(item => {
            if (!itemsByName[item.name]) itemsByName[item.name] = [];
            itemsByName[item.name].push(item.price);
        });

       
        for (const name in itemsByName) {
            const prices = itemsByName[name];
            const freeItemsCount = Math.floor(prices.length / 2);
        
            discount += freeItemsCount * prices[0];
        }
        
        return discount;
    }
}
module.exports = BogoStrategy;