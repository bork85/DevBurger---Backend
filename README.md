# 🍔 DevBurger - Backend API

<p align="center">
  <img src="./src/assets/Logo.png" alt="DevBurger Logo" width="200">
</p>

API REST completa para gerenciamento de hamburgueria desenvolvida com Node.js e Express.

## 📝 Sobre

O projeto **DevBurger** apresenta uma hamburgueria fictícia com funcionalidades gerais como: login e criação de usuários, Home com carrossel de categorias e ofertas, exibição e filtragem do cardápio, etc e administrativas como: a adição e edição dos produtos e categorias, tela de pedidos que realiza a soma do total e possui interface de pagamentos funcional. 

Este repositório traz o Backend deste projeto.

## ✨ Características

- 🔐 **Autenticação JWT**: Sistema seguro de login e registro
- 👥 **Gestão de Usuários**: Criação e gerenciamento de contas
- 🍔 **Catálogo de Produtos**: CRUD completo de produtos
- 📂 **Categorias**: Organização e filtragem por categorias
- 🛒 **Sistema de Pedidos**: Criação e acompanhamento de pedidos
- 💳 **Integração de Pagamentos**: Interface funcional para processamento
- 🖼️ **Upload de Imagens**: Gerenciamento de fotos dos produtos
- 🔒 **Middleware de Autorização**: Controle de acesso administrativo

## 📁 Estrutura do Projeto

```bash
devburger-backend/
├── src/
│   ├── app/
│   │   ├── controllers/     # Controladores da aplicação
│   │   ├── middlewares/     # Middlewares (auth, admin, etc)
│   │   ├── models/          # Modelos do banco de dados
│   │   └── schemas/         # Schemas de validação
│   ├── config/              # Configurações (database, auth, etc)
│   ├── database/            # Migrations e seeds
│   ├── routes/              # Definição de rotas
│   └── assets/              # Arquivos estáticos
├── uploads/                 # Imagens enviadas
└── package.json            # Dependências do projeto
```

## 🛠️ Tecnologias Utilizadas

- **Node.js**: Runtime JavaScript
- **Express**: Framework web
- **Sequelize**: ORM para banco de dados
- **PostgreSQL**: Banco de dados relacional
- **JWT**: Autenticação via tokens
- **Multer**: Upload de arquivos
- **Bcrypt**: Criptografia de senhas
- **Yup**: Validação de schemas

<div display="flex">
    <img width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" />
    <img width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg" />
    <img width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" />
    <img width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" />
    <img width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sequelize/sequelize-original.svg" />
</div>

## 📋 Principais Endpoints

| Método | Endpoint | Descrição | Auth |
| -------- | ---------- | ----------- | ------ |
| POST | `/users` | Criar novo usuário | ❌ |
| POST | `/sessions` | Login de usuário | ❌ |
| POST | `/products` | Criar produto | ✅ Admin |
| GET | `/products` | Listar produtos | ✅ |
| PUT | `/products/:id` | Atualizar produto | ✅ Admin |
| POST | `/categories` | Criar categoria | ✅ Admin |
| GET | `/categories` | Listar categorias | ✅ |
| POST | `/orders` | Criar pedido | ✅ |
| GET | `/orders` | Listar pedidos | ✅ |
| PUT | `/orders/:id` | Atualizar status | ✅ Admin |

## 🚀 Como Usar

1. **Clone o repositório**
   ```bash
   git clone https://github.com/bork85/devburger-backend.git
   cd devburger-backend
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   - Crie um arquivo `.env` na raiz do projeto
   - Adicione as configurações necessárias:

   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/devburger
   JWT_SECRET=seu_secret_aqui
   PORT=3001
   ```

4. **Execute as migrations**

   ```bash
   npm run migrate
   ```

5. **Inicie o servidor**

   ```bash
   npm run dev
   ```

6. **Acesse a API**

   ```
   http://localhost:3001
   ```

## 🔧 Scripts Disponíveis

```bash
npm run dev        # Inicia servidor em modo desenvolvimento
npm start          # Inicia servidor em produção
npm run migrate    # Executa migrations do banco
npm run seed       # Popula banco com dados iniciais
```

## 🌐 Integração com Frontend

Este backend foi desenvolvido para funcionar em conjunto com o frontend React:

- **Frontend**: [DevBurger-Frontend](https://github.com/bork85/devburger-Frontend)
- **Tecnologias Frontend**: HTML, CSS, JavaScript, React

## 📝 Notas de Desenvolvimento

- A API utiliza autenticação JWT para rotas protegidas
- Middleware de admin valida permissões para operações administrativas
- Upload de imagens é gerenciado via Multer com validação de tipos
- Senhas são criptografadas com Bcrypt antes de serem armazenadas
- Validação de dados com Yup em todas as requisições

## 🤝🏻 Agradecimentos

Agradeço ao [Rodolfo Mori](https://www.github.com/rodolfomori), mentor do DevClub, pelos conhecimentos que obtive para codificação e inovação do projeto.

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais.

## ✉️ Contato

- **GitHub**: [@bork85](https://github.com/bork85)
- **E-mail**: [daniel.bork@yahoo.com.br](mailto:daniel.bork@yahoo.com.br)

---

Codado por Daniel Bork...
