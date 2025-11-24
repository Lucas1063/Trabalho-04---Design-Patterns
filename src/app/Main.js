const readline = require('readline');
const Cart = require('../domain/Cart');
const Product = require('../domain/Product');
const PromotionFactory = require('../factory/PromotionFactory');
const CouponDecorator = require('../decorators/CouponDecorator');
const Logger = require('../infra/Logger');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function main() {
    const logger = new Logger();
    logger.log("Sistema Iniciado.");

    const cart = new Cart();
    // Populando carrinho para teste
    cart.addItem(new Product("Camiseta", 50.00));
    cart.addItem(new Product("Camiseta", 50.00));
    cart.addItem(new Product("Calça", 100.00));

    console.log("--- Carrinho de Compras ---");
    console.log(`Total Bruto: R$ ${cart.getTotal().toFixed(2)}`);
    console.log("Itens: 2x Camiseta (R$50), 1x Calça (R$100)\n");

    rl.question('Escolha a promoção (BOGO / NONE): ', (promoType) => {
        try {
            //Factory cria a estratégia
            let strategy = PromotionFactory.create(promoType);
            logger.log(`Estratégia definida: ${promoType}`);

            rl.question('Aplicar cupom de 10% extra? (S/N): ', (answer) => {
                //Decorator envolve a estratégia se necessário
                if (answer.toUpperCase() === 'S') {
                    strategy = new CouponDecorator(strategy, 10);
                    logger.log("Cupom aplicado.");
                }

                //Execução
                const discount = strategy.calculateDiscount(cart);
                const finalPrice = cart.getTotal() - discount;

                console.log("\n--- Resultado ---");
                console.log(`Desconto Total: R$ ${discount.toFixed(2)}`);
                console.log(`Valor Final: R$ ${finalPrice.toFixed(2)}`);

                printFooter();
                rl.close();
            });

        } catch (error) {
            console.error(`Erro: ${error.message}`);
            rl.close();
        }
    });
}

function printFooter() {
    console.log("\n" + "=".repeat(40));
    console.log("Desenvolvido por: Lucas Weigel");
    console.log("=".repeat(40));
}

main();