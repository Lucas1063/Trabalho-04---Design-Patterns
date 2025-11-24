const PromotionStrategy = require('../strategies/PromotionStrategy');

class CouponDecorator extends PromotionStrategy {
    constructor(strategy, percentOff) {
        super();
        this.wrappedStrategy = strategy; 
        this.percentOff = percentOff; 
    }

    calculateDiscount(cart) {
        //Pega o desconto da regra original (ex: BOGO)
        const baseDiscount = this.wrappedStrategy.calculateDiscount(cart);
        
        //Calcula o valor restante a pagar
        const totalCart = cart.getTotal();
        const valueAfterBaseDiscount = totalCart - baseDiscount;

        //Aplica o cupom sobre o que sobrou
        const couponDiscount = valueAfterBaseDiscount * (this.percentOff / 100);

        //Retorna desconto total acumulado
        return baseDiscount + couponDiscount;
    }
}
module.exports = CouponDecorator;