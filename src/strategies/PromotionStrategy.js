// Interface Abstrata (Simulada)
class PromotionStrategy {
    calculateDiscount(cart) {
        throw new Error("O método calculateDiscount deve ser implementado");
    }
}
module.exports = PromotionStrategy;