# 📦 compraFácil

Plataforma de e-commerce fullstack com área administrativa e área de usuário, desenvolvida com foco em arquitetura organizada, autenticação segura e separação de responsabilidades.

---

## 🚀 Sobre o Projeto

O **compraFácil** é um sistema de e-commerce que permite o gerenciamento de produtos e categorias, controle de permissões entre administradores e usuários comuns, além de autenticação baseada em JWT.

O projeto foi desenvolvido com foco em boas práticas de backend, organização em camadas e integração completa entre frontend e API REST.

A aplicação possui interface responsiva, permitindo uso tanto em desktop quanto em dispositivos móveis.

---

## 🧠 Arquitetura

O backend foi estruturado seguindo separação de responsabilidades:

- Controllers
- Services
- Repositories
- Middlewares
- Models
- Rotas organizadas por domínio

O carrinho funciona como entidade intermediária entre usuários e produtos, permitindo futura expansão para implementação de pedidos.

---

## 🔐 Autenticação e Segurança

- Autenticação via JWT
- Middleware de proteção de rotas
- Controle de acesso por roles (admin e usuário)
- Administradores podem editar usuários e alterar permissões

---

## 🛠 Tecnologias Utilizadas

### Backend
- Node.js
- Express
- JWT
- Banco de dados relacional
- Arquitetura em camadas (Controller / Service / Repository)

### Frontend
- Vue.js
- Vite
- Estrutura modular de componentes
- Integração com API REST

---

## 📦 Funcionalidades Implementadas

✔ Cadastro de usuários  
✔ Login com autenticação JWT  
✔ Controle de roles (admin / usuário)  
✔ Cadastro e edição de produtos  
✔ Cadastro de categorias  
✔ Associação de produtos ao carrinho  
✔ Área administrativa com gerenciamento de usuários  
✔ Interface responsiva  
✔ Separação clara entre área administrativa e área de usuário  

---

## 🚧 Melhorias Futuras

- Implementação de sistema de busca e filtros
- Sistema completo de pedidos
- Aprimoramento da experiência do usuário (UX)
- Evolução do design visual da interface
- Otimização de consultas no banco de dados

---

## ▶ Como Executar o Projeto

### 🔹 Backend

```bash
cd Backend
npm install
npm run dev
```

Criar um arquivo `.env` dentro da pasta Backend com as seguintes variáveis:

```
PORT=
DATABASE_URL=
JWT_SECRET=
```

---

### 🔹 Frontend

```bash
cd Frontend
npm install
npm run dev
```

---

## 🎯 Objetivo do Projeto

Este projeto foi desenvolvido como prática avançada de desenvolvimento fullstack, com foco em:

- Organização de arquitetura backend
- Autenticação segura com JWT
- Controle de permissões por roles
- Integração entre frontend e API REST
- Estrutura escalável para futuras melhorias

---

## 📌 Status do Projeto

Em desenvolvimento contínuo.