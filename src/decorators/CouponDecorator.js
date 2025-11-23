const PromotionStrategy = require('../strategies/PromotionStrategy');

class CouponDecorator extends PromotionStrategy {
    constructor(strategy, percentOff) {
        super();
        this.wrappedStrategy = strategy; // A estratégia que está sendo "decorada"
        this.percentOff = percentOff;    // Ex: 10 para 10%
    }

    calculateDiscount(cart) {
        // 1. Pega o desconto da regra original (ex: BOGO)
        const baseDiscount = this.wrappedStrategy.calculateDiscount(cart);
        
        // 2. Calcula o valor restante a pagar
        const totalCart = cart.getTotal();
        const valueAfterBaseDiscount = totalCart - baseDiscount;

        // 3. Aplica o cupom sobre o que sobrou
        const couponDiscount = valueAfterBaseDiscount * (this.percentOff / 100);

        // Retorna desconto total acumulado
        return baseDiscount + couponDiscount;
    }
}
module.exports = CouponDecorator;