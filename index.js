class Endereco {
  constructor(logradouro, numero, cidade, uf) {
    this.logradouro = logradouro;
    this.numero = numero;
    this.cidade = cidade;
    this.uf = uf;
  }
}

class Pessoa {
  #nome;

  constructor(nome, endereco) {
    this.nome = nome;
    this.endereco = endereco;
  }

  get nome() {
    return this.#nome;
  }

  set nome(valor) {
    if (typeof valor !== 'string' || valor.trim().length < 3) {
      throw new Error('O nome deve ter pelo menos 3 caracteres.');
    }
    this.#nome = valor.trim();
  }
}

class PessoaFisica extends Pessoa {
  #cpf;
  #dataNascimento;

  constructor(nome, cpf, dataNascimento, endereco) {
    super(nome, endereco);
    this.cpf = cpf;
    this.dataNascimento = dataNascimento;
  }

  get cpf() {
    return this.#cpf;
  }

  set cpf(valor) {
    if (typeof valor !== 'string') {
      throw new Error('O CPF deve ter 11 dígitos.');
    }
    const cpf = valor.replace(/[.\-/\s]/g, '');
    if (!/^\d{11}$/.test(cpf)) {
      throw new Error('O CPF deve ter 11 dígitos.');
    }
    this.#cpf = cpf;
  }

  get dataNascimento() {
    return this.#dataNascimento;
  }

  set dataNascimento(valor) {
    if (typeof valor !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(valor)) {
      throw new Error('Informe uma data válida no formato AAAA-MM-DD.');
    }

    const [ano, mes, dia] = valor.split('-').map(Number);
    const data = new Date(`${valor}T00:00:00`);

    if (Number.isNaN(data.getTime()) || ano < 1 || data.getFullYear() !== ano
        || data.getMonth() + 1 !== mes || data.getDate() !== dia) {
      throw new Error('A data de nascimento é inválida.');
    }
    if (data > new Date()) {
      throw new Error('A data de nascimento não pode estar no futuro.');
    }
    this.#dataNascimento = valor;
  }
}

class PessoaJuridica extends Pessoa {
  #cnpj;
  #razaoSocial;

  constructor(nome, cnpj, razaoSocial, endereco) {
    super(nome, endereco);
    this.cnpj = cnpj;
    this.razaoSocial = razaoSocial;
  }

  get cnpj() {
    return this.#cnpj;
  }

  set cnpj(valor) {
    if (typeof valor !== 'string') {
      throw new Error('O CNPJ deve ter 14 dígitos.');
    }
    const cnpj = valor.replace(/[.\-/\s]/g, '');
    if (!/^\d{14}$/.test(cnpj)) {
      throw new Error('O CNPJ deve ter 14 dígitos.');
    }
    this.#cnpj = cnpj;
  }

  get razaoSocial() {
    return this.#razaoSocial;
  }

  set razaoSocial(valor) {
    if (typeof valor !== 'string' || valor.trim() === '') {
      throw new Error('A razão social é obrigatória.');
    }
    this.#razaoSocial = valor.trim();
  }
}

