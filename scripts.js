
    async function getExchangeRates() {
        try {
            // Corrigido: sem quebra de linha na URL
            const response = await fetch("https://v6.exchangerate-api.com/v6/20d0a2a98f4ddf43d315a9a9/latest/USD");
            const data = await response.json();

            if (data.result !== 'success') {
                throw new Error('Erro ao obter as cotações da API');
            }

            // Captura apenas as cotações necessárias
            const rates = {
                USD: data.conversion_rates.BRL, // Quanto vale 1 USD em BRL
                EUR: data.conversion_rates.EUR / data.conversion_rates.BRL, // EUR em BRL
                GBP: data.conversion_rates.GBP / data.conversion_rates.BRL, // GBP em BRL
                BRL: 1 // Moeda base para exibição
            };

            // Atualiza o horário da última cotação
            const updatedAt = document.getElementById("updatedAt");
            const now = new Date();
            updatedAt.textContent = `Última atualização: ${now.toLocaleDateString("pt-BR")} às ${now.toLocaleTimeString("pt-BR")}`;

            return rates;

        } catch (error) {
            console.log("Erro ao buscar as cotações:", error);
            alert("Não foi possível obter as cotações. Tente novamente mais tarde.");
            return {};
        }
    }

    // Elementos
    const form = document.querySelector("form");
    const amountInput = document.getElementById("amount");
    const currency = document.getElementById("currency");
    const footer = document.querySelector("main footer");
    const description = document.getElementById("description");
    const result = document.getElementById("result");

    // Permite somente números
    amountInput.addEventListener("input", () => {
        amountInput.value = amountInput.value.replace(/\D+/g, "");
    });

    // Ao enviar o formulário
    form.onsubmit = async (event) => {
        event.preventDefault();

        const amountValue = parseFloat(amountInput.value);

        // Validação simples
        if (isNaN(amountValue) || amountValue <= 0) {
            return alert("Por favor, insira um valor válido para converter.");
        }

        // Obtem cotações
        const rates = await getExchangeRates();

        if (rates.USD && rates.EUR && rates.GBP) {
            const selected = currency.value;

            switch (selected) {
                case "USD":
                    convertCurrency(amountValue, rates.USD, "US$");
                    break;
                case "EUR":
                    convertCurrency(amountValue, rates.EUR, "€");
                    break;
                case "GBP":
                    convertCurrency(amountValue, rates.GBP, "£");
                    break;
                default:
                    alert("Moeda não suportada.");
            }
        } else {
            alert("Erro ao buscar as cotações. Tente novamente mais tarde.");
        }
    };

    // Converte a moeda
    function convertCurrency(amount, priceInBRL, symbol) {
        try {
            const total = amount * priceInBRL;

            if (isNaN(total)) {
                return alert("Erro no cálculo. Verifique o valor informado.");
            }

            // Atualiza a descrição e o resultado
            description.textContent = `${symbol} 1 = ${formatCurrencyBRL(priceInBRL)}`;
            result.textContent = `${formatCurrencyBRL(total).replace("R$", "")} Reais`;

            // Mostra o resultado
            footer.classList.add("show-result");

        } catch (error) {
            footer.classList.remove("show-result");
            console.log(error);
            alert("Não foi possível converter. Tente novamente mais tarde.");
        }
    }

    // Formata valor em BRL
    function formatCurrencyBRL(value) {
        return Number(value).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }

