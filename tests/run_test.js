const assert = require('assert');
const Cart = require('../src/domain/Cart');
const Product = require('../src/domain/Product');
const PromotionFactory = require('../src/factory/PromotionFactory');
const CouponDecorator = require('../src/decorators/CouponDecorator');
const Logger = require('../src/infra/Logger');
const BogoStrategy = require('../src/strategies/BogoStrategy');

console.log("Iniciando testes...\n");

// 1. Teste do Singleton
console.log("Teste 1: Singleton (Logger)...");
const log1 = new Logger();
const log2 = new Logger();
assert.strictEqual(log1, log2, "As instâncias de Logger devem ser idênticas");
console.log("✅ Passou.");

// 2. Teste do Factory e Strategy (BOGO)
console.log("Teste 2: Factory gera BOGO corretamente...");
const strategy = PromotionFactory.create('BOGO');
assert.ok(strategy instanceof BogoStrategy, "Factory deve retornar instância de BogoStrategy");

const cart = new Cart();
cart.addItem(new Product("Meia", 20.00));
cart.addItem(new Product("Meia", 20.00)); // 2 Meias = 1 Grátis (Desc 20)
const discount = strategy.calculateDiscount(cart);
assert.strictEqual(discount, 20.00, "Desconto BOGO deve ser o preço de 1 item");
console.log("✅ Passou.");

// 3. Teste do Decorator
console.log("Teste 3: Decorator soma descontos...");
// Cenário: Item 100 reais. BOGO não aplica (só 1 item). Cupom 10%.
const cart2 = new Cart();
cart2.addItem(new Product("Tênis", 100.00));

let strat = PromotionFactory.create('BOGO'); // 0 desconto
strat = new CouponDecorator(strat, 10); // +10% de 100 = 10

const totalDiscount = strat.calculateDiscount(cart2);
assert.strictEqual(totalDiscount, 10.00, "Deve aplicar apenas os 10% do cupom");
console.log("✅ Passou.");

console.log("\nTodos os testes passaram! 🚀");