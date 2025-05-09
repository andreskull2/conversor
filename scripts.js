async function getExchangeRates() {
    try {
        // Substitua YOUR_ACCESS_KEY pela sua chave de acesso
        const response = await fetch(`https://v6.exchangerate-api.com/v6/20d0a2a98f4ddf43d315a9a9/latest/USD
`);
        const data = await response.json();

        if (data.result !== 'success') {
            throw new Error('Erro ao obter as cotações');
        }

        console.log("Dados da API:", data);

        // Exemplo de como acessar as cotações
        const USD = 1; // O dólar sempre será 1
        const EUR = data.conversion_rates.EUR;
        const GBP = data.conversion_rates.GBP;
        const BRL = data.conversion_rates.BRL;

        description.textContent = `US$ 1 = ${formatCurrencyBRL(BRL)}`;
        
        const updatedAt = document.getElementById("updatedAt");
        const now = new Date();
        updatedAt.textContent = `Última atualização: ${now.toLocaleDateString("pt-BR")} às ${now.toLocaleTimeString("pt-BR")}`;

        return { USD, EUR, GBP, BRL };

    } catch (error) {
        console.log("Erro ao buscar as cotações:", error);
        alert("Não foi possível obter as cotações. Tente novamente mais tarde.");
        return {};
    }
}

// Obtendo os elementos do formulário
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const currency = document.getElementById("currency");
const footer = document.querySelector("main footer");
const description = document.getElementById("description");
const result = document.getElementById("result");

// Manipulando o input amount para receber somente números
amount.addEventListener("input", () => {
    const hasCharactersRegex = /\D+/g;
    amount.value = amount.value.replace(hasCharactersRegex, "");
});

// Capturando o evento de submit (enviar) do formulário
form.onsubmit = async (event) => {
    event.preventDefault();

    // Obtendo as cotações mais recentes
    const { USD, EUR, GBP, BRL } = await getExchangeRates();

    // Verifique se o retorno da API contém valores válidos
    if (USD && EUR && GBP && BRL) {
        switch (currency.value) {
            case "USD":
                convertCurrency(amount.value, USD, "US$");
                break;
            case "EUR":
                convertCurrency(amount.value, EUR, "€");
                break;
            case "GBP":
                convertCurrency(amount.value, GBP, "£");
                break;
        }
    } else {
        console.error("Erro: Cotações inválidas.");
        alert("Erro ao buscar as cotações. Tente novamente mais tarde.");
    }
};

// Função para converter a moeda.
function convertCurrency(amount, price, symbol) {
    try {
        // Exibindo a cotação da moeda selecionada
        description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`;

        // Calcula o total
        let total = amount * price;

        // Verifica se o resultado não é um número
        if (isNaN(total)) {
            return alert("Por favor, digite o valor corretamente para converter.");
        }

        // Formatar o valor total
        total = formatCurrencyBRL(total).replace("R$", "");

        // Exibe o resultado total
        result.textContent = `${total} Reais`;

        // Aplica a classe que exibe o footer para mostrar o resultado
        footer.classList.add("show-result");

    } catch (error) {
        // Remove a classe do footer removendo ele da tela
        footer.classList.remove("show-result");

        console.log(error);
        alert("Não foi possível converter. Tente novamente mais tarde.");
    }
}

// Formata a moeda em Real Brasileiro.
function formatCurrencyBRL(value) {
    // Converte para número para utilizar o toLocaleString para formatar no padrão BRL (R$ 00,00)
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}
