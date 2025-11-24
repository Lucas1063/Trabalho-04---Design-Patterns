const BogoStrategy = require('../strategies/BogoStrategy');

class PromotionFactory {
    static create(type) {
        switch (type.toUpperCase()) {
            case 'BOGO':
                return new BogoStrategy();
            case 'NONE':    
                return { calculateDiscount: () => 0 }; 
            default:
                throw new Error(`Tipo de promoção desconhecido: ${type}`);
        }
    }
}
module.exports = PromotionFactory;