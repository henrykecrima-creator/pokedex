// Variável para guardar o número do Pokémon exibido atualmente
let pokemonAtualId = 1;

// Selecionando elementos do HTML
const inputBusca = document.getElementById('busca-input');
const btnBuscar = document.getElementById('btn-buscar');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');

const elementoNome = document.getElementById('nome-pokemon');
const elementoId = document.getElementById('id-pokemon');
const elementoTipo = document.getElementById('tipo-pokemon');
const elementoPeso = document.getElementById('peso-pokemon');
const elementoAltura = document.getElementById('altura-pokemon');
const elementoImagem = document.getElementById('imagem-pokemon');

// Função principal que busca qualquer Pokémon por ID ou por Nome
async function carregarPokemon(parametro) {
    elementoNome.innerText = "Buscando...";

    try {
        const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${parametro}`);
        
        if (!resposta.ok) {
            throw new Error('Pokémon não encontrado');
        }
        
        const dados = await resposta.json();

        // Atualiza a variável global com o ID retornado
        pokemonAtualId = dados.id;

        // Atualiza as informações exibidas na tela
        elementoNome.innerText = dados.name;
        elementoId.innerText = `Nº: ${dados.id}`;
        
        const tipos = dados.types.map(t => t.type.name).join(', ');
        elementoTipo.innerText = `Tipo: ${tipos}`;
        
        const pesoKg = dados.weight / 10;
        elementoPeso.innerText = `Peso: ${pesoKg} kg`;

        const alturaMetros = dados.height / 10;
        elementoAltura.innerText = `Altura: ${alturaMetros} m`;
        
        const imagemOficial = dados.sprites.other['official-artwork'].front_default;
        elementoImagem.src = imagemOficial || dados.sprites.front_default;
        
        // Limpa o campo de busca
        inputBusca.value = '';

    } catch (erro) {
        elementoNome.innerText = "Não encontrado!";
        elementoImagem.src = '';
        elementoId.innerText = 'Nº: ???';
        elementoTipo.innerText = 'Tipo: ???';
        elementoPeso.innerText = 'Peso: ???';
        elementoAltura.innerText = 'Altura: ???';
    }
}

// Evento para botão de voltar (◀ Anterior)
btnPrev.addEventListener('click', () => {
    if (pokemonAtualId > 1) {
        carregarPokemon(pokemonAtualId - 1);
    }
});

// Evento para botão de avançar (Próximo ▶)
btnNext.addEventListener('click', () => {
    carregarPokemon(pokemonAtualId + 1);
});

// Evento do botão Buscar
btnBuscar.addEventListener('click', () => {
    const valorInput = inputBusca.value.toLowerCase().trim();
    if (valorInput) {
        carregarPokemon(valorInput);
    }
});

// Evento para buscar ao apertar 'Enter' no teclado
inputBusca.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        const valorInput = inputBusca.value.toLowerCase().trim();
        if (valorInput) {
            carregarPokemon(valorInput);
        }
    }
});

// Carrega o Pokémon nº 1 (Bulbasaur) ao abrir o site pela primeira vez
carregarPokemon(pokemonAtualId);