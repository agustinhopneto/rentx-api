# Requisitos da Aplicação

## Cadastro de carros

### Requisitios Funcionais
- Deve ser possível cadastrar um novo carro;

### Regras de Negócio
- Não deve ser possível cadastrar com uma placa já existente;
- O carro deve ser cadastrado, por padrão, com disponibilidade;
- O usuário responsável deve ter permissões de administrador;

---

## Listagem de carros

### Requisitios Funcionais
- Deve ser possível listar todos os carros;
- Deve ser possível listar todos os carros pelo nome da categoria;
- Deve ser possível listar todos os carros pelo nome da marca;
- Deve ser possível listar todos os carros pelo nome do carro;

### Regras de Negócio
- O usuário não precisa estar logado no sistema;
- Clientes só podem visualizar os carros disponíveis;

---

## Cadastro de especificação no carro

### Requisitos Funcionais
- Deve ser possível cadastrar uma especificação para um carro;
- Deve ser possível listar todas as especificações;
- Deve ser possível listar todos os carros;

### Regras de Negócio
- Não deve ser possível cadastrar uma especificação para um carro não cadastrado;
- Não deve ser possível cadastrar a mesma especificação para o mesmo carro;
- O usuário responsável deve ter permissões de administrador;

---

## Cadastro de imagens do carro

### Requisitos Funcionais
- Deve ser possível cadastrar a imagem do carro;
- Deve ser possível listar todos os carros;

### Requisito não funcional
- Utilizar o Multer para upload dos arquivos;

### Regras de Negócio
- O usuário deve poder cadastrar mais de uma imagem para o mesmo carro;
- O usuário responsável deve ter permissões de administrador;

---

## Aluguel de carro

### Requisitos Funcionais
- Deve ser possível cadastrar um aluguel;

### Regras de Negócio
- O aluguel deve ter duração mínima de 24 horas;
- Não deve ser possível cadastar um novo aluguel caso já exista um aberto para o mesmo usuário;
- Não deve ser possível cadastar um novo aluguel caso já exista um aberto para o mesmo carro;
