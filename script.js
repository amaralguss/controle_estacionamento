const VagaModel = {
    vagas: [],
  
    adicionar(vaga) {
      this.vagas.push(vaga);
    },
  
    remover(index) {
      this.vagas.splice(index, 1);
    },
  
    listar() {
      return this.vagas;
    }
  };
  
 
  const VagaView = {
    renderizarLista(containerId) {
      const container = document.getElementById(containerId);
      container.innerHTML = "";
  
      const vagas = VagaModel.listar();
  
      if (vagas.length === 0) {
        container.innerHTML = "<p>Nenhuma vaga cadastrada.</p>";
        return;
      }
  
      vagas.forEach((vaga, index) => {
        const card = document.createElement("div");
        card.className = "vaga-card";
        card.innerHTML = `
          <p><strong>Placa:</strong> ${vaga.placa}</p>
          <p><strong>Proprietário:</strong> ${vaga.proprietario}</p>
          <p><strong>Apartamento:</strong> ${vaga.apartamento} - Bloco ${vaga.bloco}</p>
          <p><strong>Veículo:</strong> ${vaga.modelo} - ${vaga.cor}</p>
          <p><strong>Nº da Vaga:</strong> ${vaga.vaga}</p>
          <button onclick="VagaController.removerVaga(${index})">Remover</button>
        `;
        container.appendChild(card);
      });
    }
  };
  
  
  const VagaController = {
    salvarVaga(event) {
      event.preventDefault();
  
      const form = event.target;
      const vaga = {
        placa: form.placa.value,
        proprietario: form.proprietario.value,
        apartamento: form.apartamento.value,
        bloco: form.bloco.value,
        modelo: form.modelo.value,
        cor: form.cor.value,
        vaga: form.vaga.value
      };
  
      console.log("Vaga salva:", vaga);
      alert("Cadastro realizado com sucesso!");
  
      VagaModel.adicionar(vaga);
      form.reset();
    },
  
    removerVaga(index) {
      if (confirm("Deseja remover esta vaga?")) {
        VagaModel.remover(index);
        VagaView.renderizarLista("listaVagas");
      }
    },
  
    iniciarCadastro() {
      const form = document.getElementById("reservaForm");
      if (form) {
        form.addEventListener("submit", this.salvarVaga);
      }
    },
  
    iniciarListagem() {
      VagaModel.vagas = [
        {
          placa: "ABC-1234",
          proprietario: "João da Silva",
          apartamento: "101",
          bloco: "A",
          modelo: "HB20",
          cor: "Preto",
          vaga: "1"
        },
        {
          placa: "XYZ-9876",
          proprietario: "Maria Souza",
          apartamento: "203",
          bloco: "B",
          modelo: "Onix",
          cor: "Branco",
          vaga: "2"
        }
      ];
      VagaView.renderizarLista("listaVagas");
    }
  };
  
  document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("reservaForm")) {
      VagaController.iniciarCadastro();
    } else if (document.getElementById("listaVagas")) {
      VagaController.iniciarListagem();
    }
  });
  