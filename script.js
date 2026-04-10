// 1. CONFIGURAÇÃO DO BANCO DE DADOS
const supabaseUrl = "https://krxckgfyvygewvocqgbc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtyeGNrZ2Z5dnlnZXd2b2NxZ2JjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzMzI1NzMsImV4cCI6MjA4OTkwODU3M30.fcJfHcvtkkYP0XL8nHGLGXjGiL-cqpDLDNAem1210Tg";

// Inicia a conexão
const banco = window.supabase.createClient(supabaseUrl, supabaseKey);

// 2. FUNÇÃO PARA BUSCAR E DESENHAR OS PRODUTOS
async function carregarCatalogo() {
  // Faz um SELECT * FROM produtos na nuvem
  let { data: produtos, error } = await banco.from("produtos").select("*");

  if (error) {
    console.error("Erro ao buscar dados:", error);
    return;
  }

  let vitrine = document.getElementById("vitrine");
  vitrine.innerHTML = ""; // Limpa a tela

  // Loop para desenhar cada produto na tela
  produtos.forEach((item) => {
    let div = document.createElement("div");
    div.className = "card-produto";
    div.innerHTML = `
        <img src="${item.imagem_url}" alt="${item.nome}">
        <div class="info">
            <h3>${item.nome}</h3>
            <h3>${item.categoria}</h3>
            <p>R$ ${parseFloat(item.preco).toFixed(2)}</p>
            <p>────────────</p>
        </div>
        `;
    vitrine.appendChild(div);
  });
}

// Roda a função assim que o site abrir
carregarCatalogo();
