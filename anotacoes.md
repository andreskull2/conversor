# Projeto conversor de moedas

## Boas-vindas
Nesta etapa, vamos adicionar JavaScript a um projeto HTML e CSS. Vamos desenvolver o JavaScript juntos, focando em aplicar o que foi aprendido anteriormente. Vamos unir tudo e colocar em prática. Na próxima aula, vou mostrar o projeto e começaremos a desenvolvê-lo juntos.

## Download do HTML e CSS
Nesta aula, foi compartilhado um link para um repositório contendo um projeto base em HTML e CSS. O instrutor explicou como fazer o download do projeto, renomear pastas e executar o projeto no VSCode. O projeto consiste em um formulário para conversão de moedas, com um footer oculto que será exibido dinamicamente com JavaScript. Foi sugerido o uso da extensão Live Server para facilitar o desenvolvimento. O próximo passo será implementar as funcionalidades em JavaScript.

## Conhecendo o projeto
Nesta etapa, vamos implementar JavaScript em um projeto de conversão de moeda. O HTML e o CSS estão disponíveis para download. Vamos adicionar funcionalidades como a conversão de moedas, seleção de moedas e validação do campo de entrada. Recomendo adicionar essa aplicação do campo de entrada. Recomendo adicionar essa aplicação ao seu portfólio. Vamos garantir que apenas números inteiros sejam aceitos no campo de valor. Nas próximas aulas, veremos como fazer todas essas funcionalidades com JavaScript. Vamos começar a desenvolver o JavaScript para essa aplicação.

## Criando o arquivo de script
Neste vídeo, é mostrado como criar um arquivo JavaScript, conectá-lo ao HTML e a importância de colocar o script no final do body para otimizar o carregamento da página.

## Obtendo o valor digitado
Neste trecho da aula, foi abordado como recuperar o valor digitado em um input HTML utilizando JavaScript. Foi mostrado o código HTML do input, explicado como acessar o elemento pelo id e como capturar o valor inserido pelo usuário. Foi utilizado o método AddEventListener para observar as interações do usuário no input e exibir o conteúdo digitado no console.

## Validando o input
Neste trecho, é abordado o processo de garantir que um input aceite apenas números, utilizando expressões regulares para remover caracteres de texto. A expressão regular é utilizada com o tétodo replace para substituir os caracteres indesejados por nada, permitindo assim que o input contenha apenas números. Essa técnica é demonstrada com um exemplo prático, mostrando como o conteúdo do input é atualizado sem os caracteres de texto, garantindo que apenas números sejam aceitos.

## Obtendo a moeda selecionada
Nesta aula, aprendemos a obter a moeda selecionada pelo usuário através de um input no formulário. Utilizamos o evento de submit do formulário para capturar essa informação e desativar o comportamento padrão de recarregar a página. Ao selecionar uma moeda e clicar em "converter em reais", conseguimos visualizar no console o valor da moeda selecionada, identificado por um código de três letras.

## Identificando a moeda
Neste trecho da aula, foi abordado o processo de conversão de moedas em uma aplicação JavaScript. Foi criada uma função chamada convertCurrency que recebe três parâmetros: o valor total, o valor da moeda e o símbolo da moeda. Foi explicado o uso de constantes para definir os valores das moedas, facilitando a atualização futura. Foi utilizado um switch case para identificar a moeda selecionada e realizar a conversão correta. 

## Exibindo o footer
Neste trecho da aula, foi abordado como exibir dinamicamente o footer do projeto. Foi explicado como adicionar e remover classes no elemento footer para exibi-lo ou ocultá-lo. Além disso, foi mencionado o uso do bloco try-catch para tratamento de erros e a importância de organizar o código de forma clara. O instrutor demonstrou como selecionar elementos do documento e como manipular classes CSS para controlar a exibição do footer.  

## Exibindo a cotação da moeda
Neste trecho da aula, aprendemos a utilizar JavaScript para tornar as informações de uma página web dinâmicas. Foi mostrado como selecionar elementos do HTML usando IDs, manipular o conteúdo desses elementos e exibir valores de moedas de forma dinâmica. Foi explicado o uso da interpolação de strings para combinar variáveis com texto.

## Criar função para formatar moeda
Neste trecho da aula, aprendemos a criar uma função em JavaScript para formatar valores monetários no padrão brasileiro (BRL). Utilizamos o método toLocaleString para realizar a formatação, garantindo que o valor seja exibido corretamente. Ao converter o valor para número, conseguimos acessar as opções disponíveis para formatação. Com essa função criada, podemos reaproveitá-la em diferentes partes do código, facilitando a manutenção e organização do nosso projeto.

## Exibindo o total
Nesta aula, aprendemos a calcular o total dinamicamente em um código JavaScript. Foi criada uma variável para armazenar o total, que é calculado multiplicando o Amount pelo Price. O resultado é exibido na página usando o método GetElementByID. O próximo passo será formatar o resultado.

## Formatando o total
Neste trecho da aula, foi demonstrado o uso de interpolação para adicionar texto, substituir caracteres e formatar corretamente a exibição dos valores. Além disso, foi mostrado como verificar se um valor é um número e como interromper a execução do código caso não seja. Também foi apresentado o uso de funções personalizadas para formatar valores de forma mais eficiente.