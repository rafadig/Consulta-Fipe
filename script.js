// Função para carregar as marcas de veículos
async function carregarMarcas() {
    try {
      const tipoVeiculo = document.getElementById('tipoVeiculo').value;
      const marcaSelect = document.getElementById('marca');
      const modeloSelect = document.getElementById('modelo');
      const anoSelect = document.getElementById('ano');
  
      // Limpa as opções existentes
      marcaSelect.innerHTML = '<option value="">Selecione a Marca</option>';
      modeloSelect.innerHTML = '<option value="">Selecione o Modelo</option>';
      anoSelect.innerHTML = '<option value="">Selecione o Ano</option>';
  
      // Faz a requisição para obter as marcas
      const response = await fetch(`https://parallelum.com.br/fipe/api/v1/${tipoVeiculo}/marcas`);
      const marcas = await response.json();
  
      // Preenche as opções de marca
      marcas.forEach(marca => {
        const option = document.createElement('option');
        option.value = marca.codigo;
        option.text = marca.nome;
        marcaSelect.appendChild(option);
      });
  
      // Carrega modelos ao alterar o tipo de veículo
      carregarModelos();
    } catch (error) {
      console.error('Erro ao carregar marcas:', error);
    }
  }
  
  // Função para carregar os modelos de veículos
  async function carregarModelos() {
    try {
      const tipoVeiculo = document.getElementById('tipoVeiculo').value;
      const marcaCodigo = document.getElementById('marca').value;
      const modeloSelect = document.getElementById('modelo');
      const anoSelect = document.getElementById('ano');
  
      // Limpa as opções existentes
      modeloSelect.innerHTML = '<option value="">Selecione o Modelo</option>';
      anoSelect.innerHTML = '<option value="">Selecione o Ano</option>';
  
      // Certifique-se de que marcaCodigo não está vazio antes de fazer a requisição
      if (!marcaCodigo) {
        return;
      }
  
      // Faz a requisição para obter os modelos da marca selecionada
      const response = await fetch(`https://parallelum.com.br/fipe/api/v1/${tipoVeiculo}/marcas/${marcaCodigo}/modelos`);
      const modelos = await response.json();
  
      // Preenche as opções de modelo
      if (modelos.modelos && modelos.modelos.length > 0) {
        modelos.modelos.forEach(modelo => {
          const option = document.createElement('option');
          option.value = modelo.codigo;
          option.text = modelo.nome;
          modeloSelect.appendChild(option);
        });
      } else {
        console.error('Nenhum modelo encontrado para a marca selecionada.');
      }
  
      // Atualiza as opções de ano
      carregarAnos();
    } catch (error) {
      console.error('Erro ao carregar modelos:', error);
    }
  }
  
  // Função para carregar os anos dos veículos
  async function carregarAnos() {
    try {
      const tipoVeiculo = document.getElementById('tipoVeiculo').value;
      const marcaCodigo = document.getElementById('marca').value;
      const modeloCodigo = document.getElementById('modelo').value;
      const anoSelect = document.getElementById('ano');
  
      // Limpa as opções existentes
      anoSelect.innerHTML = '<option value="">Selecione o Ano</option>';
  
      // Certifique-se de que modeloCodigo não está vazio antes de fazer a requisição
      if (!modeloCodigo) {
        return;
      }
  
      // Faz a requisição para obter os anos do modelo selecionado
      const response = await fetch(`https://parallelum.com.br/fipe/api/v1/${tipoVeiculo}/marcas/${marcaCodigo}/modelos/${modeloCodigo}/anos`);
      const anos = await response.json();
  
      // Preenche as opções de ano
      if (anos && anos.length > 0) {
        anos.forEach(ano => {
          const option = document.createElement('option');
          option.value = ano.codigo;
          option.text = ano.nome;
          anoSelect.appendChild(option);
        });
      } else {
        console.error('Nenhum ano encontrado para o modelo selecionado.');
      }
    } catch (error) {
      console.error('Erro ao carregar anos:', error);
    }
  }
  
  // Função para consultar a Tabela FIPE
  async function consultarFIPE() {
    try {
      const tipoVeiculo = document.getElementById('tipoVeiculo').value;
      const marcaCodigo = document.getElementById('marca').value;
      const modeloCodigo = document.getElementById('modelo').value;
      const anoCodigo = document.getElementById('ano').value;
  
      if (!marcaCodigo || !modeloCodigo || !anoCodigo) {
        alert('Por favor, selecione Marca, Modelo e Ano.');
        return;
      }
  
      // Faz a requisição para obter o valor da FIPE
      const response = await fetch(`https://parallelum.com.br/fipe/api/v1/${tipoVeiculo}/marcas/${marcaCodigo}/modelos/${modeloCodigo}/anos/${anoCodigo}`);
      const resultado = await response.json();
  
      // Exibe o resultado na página
      const resultadoDiv = document.getElementById('resultado');
      resultadoDiv.innerHTML = `<p><strong>Marca:</strong> ${resultado.Marca}</p>
                                <p><strong>Modelo:</strong> ${resultado.Modelo}</p>
                                <p><strong>Ano:</strong> ${resultado.AnoModelo}</p>
                                <p><strong>Combustível:</strong> ${resultado.Combustivel}</p>
                                <p><strong>Valor:</strong> ${resultado.Valor}</p>`;
    } catch (error) {
      console.error('Erro ao consultar FIPE:', error);
    }
  }
  
  // Carrega as marcas ao carregar a página
  document.addEventListener('DOMContentLoaded', carregarMarcas);
  