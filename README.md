Sistema de Promoções de Varejo - Design Patterns
Este projeto implementa um motor de cálculo de promoções para um sistema de varejo fictício. O objetivo principal é demonstrar a aplicação prática de Padrões de Projeto (Design Patterns) para resolver problemas de flexibilidade e manutenção em regras de negócio complexas.

Desenvolvido por: Lucas Weigel
O Problema
Em sistemas de varejo, as regras de descontos mudam constantemente (ex: "Leve 3 Pague 2", "Compre 1 Leve o 2º Grátis", "Desconto progressivo"). Implementar isso com cadeias infinitas de if/else torna o código difícil de manter e testar.

A solução proposta utiliza orientação a objetos e padrões GoF para permitir a troca dinâmica de estratégias de desconto e a composição de benefícios (ex: Promoção da loja + Cupom de desconto).

Padrões de Projeto Utilizados
Para atender aos requisitos, foram implementados os seguintes padrões:

1. Strategy (Comportamental)
Onde: src/strategies/

Justificativa: Permite encapsular diferentes algoritmos de promoção (ex: BogoStrategy para "Buy One Get One") em classes separadas. Isso permite que o sistema troque a regra de cálculo em tempo de execução sem alterar a classe do Carrinho ou do Produto.

2. Decorator (Estrutural)
Onde: src/decorators/

Justificativa: Utilizado para adicionar responsabilidades (descontos extras) a uma promoção existente de forma dinâmica. O CouponDecorator envolve uma estratégia base e aplica um desconto percentual adicional sobre o resultado, permitindo "empilhar" promoções.

3. Factory Method (Criação)
Onde: src/factory/

Justificativa: Centraliza a lógica de instanciação das estratégias. O cliente (Menu/CLI) não precisa saber qual classe concreta instanciar (New BogoStrategy()); ele apenas solicita ao PromotionFactory com base em uma string de configuração.

4. Singleton (Criação/Infraestrutura)
Onde: src/infra/Logger.js

Justificativa: Garante que exista apenas uma instância da classe de Log em toda a aplicação, centralizando a saída de informações e economizando recursos.

Diagrama de Classes (Mermaid)
Snippet de código

classDiagram
    class PromotionStrategy {
        <<interface>>
        +calculateDiscount(cart)
    }
    class BogoStrategy {
        +calculateDiscount(cart)
    }
    class CouponDecorator {
        -wrappedStrategy: PromotionStrategy
        +calculateDiscount(cart)
    }
    class PromotionFactory {
        +create(type) PromotionStrategy
    }
    class Logger {
        -instance
        +log(msg)
    }
    
    PromotionStrategy <|-- BogoStrategy
    PromotionStrategy <|-- CouponDecorator
    CouponDecorator o-- PromotionStrategy : decora
    PromotionFactory ..> PromotionStrategy : cria
Estrutura do Projeto
O projeto segue uma arquitetura modular para separar domínio, regras de negócio e infraestrutura:
varejo-js/
│
├── src/
│   ├── domain/         # Entidades (Product, Cart)
│   ├── strategies/     # Regras de Promoção (Strategy)
│   ├── decorators/     # Modificadores de desconto (Decorator)
│   ├── factory/        # Criador de estratégias (Factory Method)
│   ├── infra/          # Serviços transversais (Singleton Logger)
│   └── app/            # Ponto de entrada (Menu CLI)
│
├── tests/              # Testes automatizados

Como Rodar o Projeto
Pré-requisitos
Node.js instalado (versão 12 ou superior).

Executando o Sistema (CLI)
Navegue até a pasta raiz do projeto.

Execute o comando:

Bash

node src/app/main.js
Siga as instruções no menu interativo para escolher a promoção e aplicar cupons.

Executando os Testes
Os testes foram criados utilizando o módulo nativo assert do Node.js, garantindo que não há dependências externas pesadas.

Bash

node tests/run_tests.js
Cenários cobertos: Unicidade do Singleton, Criação via Factory, Cálculo do BOGO e Composição de Decorators.

Decisões de Design e Limitações
Linguagem: Foi escolhido JavaScript (Node.js) pela sua flexibilidade com protótipos, facilitando a implementação do padrão Decorator e Strategy sem a verbosidade excessiva de linguagens estritamente tipadas.

Persistência: Para fins acadêmicos, os dados (produtos) são mantidos em memória durante a execução.

Limitações:

A estratégia MixMatch (Combinação) foi planejada na arquitetura, mas a implementação atual foca na lógica do BogoStrategy para demonstração.

O sistema de Logs imprime no console, mas está preparado para escrever em arquivos se necessário.
