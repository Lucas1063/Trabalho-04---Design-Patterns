const BogoStrategy = require('../strategies/BogoStrategy');
// Você pode criar uma "NullStrategy" se quiser retornar desconto 0 por padrão

class PromotionFactory {
    static create(type) {
        switch (type.toUpperCase()) {
            case 'BOGO':
                return new BogoStrategy();
            case 'NONE':
                // Retorna uma estratégia anônima que dá 0 desconto
                return { calculateDiscount: () => 0 }; 
            default:
                throw new Error(`Tipo de promoção desconhecido: ${type}`);
        }
    }
}
module.exports = PromotionFactory;