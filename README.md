# TechWave E-commerce
O TechWave é uma SPA (Single Page Application) que simula uma loja virtual completa, permitindo que usuários naveguem, pesquisem, comprem produtos e gerenciem um carrinho de compras. Administradores têm acesso a um painel exclusivo para gerenciar o catálogo de produtos (CRUD completo).

A aplicação consome dados de uma API REST privada desenvolvida exclusivamente para este projeto.
### 🔗 Repositório da API: [TechWave-API](https://github.com/emicarolina/TechWave-API)

## Tecnologias Utilizadas
- JavaScript
- React
- Vite
- React Router DOM
- Axios
- Tailwind CSS
- Motion (Framer Motion)
- Lenis (scroll suave)
- Vercel - Deploy

## Funcionalidades
### Para Usuários
- Catálogo de Produtos: Navegação fluida pelos produtos disponíveis
- Sistema de Busca: Pesquisa por nome do produto
- Carrinho de Compras:
  - Adicionar/remover produtos
  - Ajustar quantidades
  - Visualização de total
  - Dropdown animado com scroll suave customizado
- Autenticação Completa:
  - Login e cadastro de usuários
  - Tokens JWT com duração de 7 dias
  - Proteção de rotas (carrinho e compra requerem login)
- Simulação de Compra: Modal de confirmação de pedido

### Para Administradores
- Painel Admin Exclusivo: Acesso restrito por permissão
- CRUD de Produtos:
  - Criar novos produtos
  - Editar produtos existentes
  - Excluir produtos
  - Todas as operações refletem em tempo real no banco
- Gerenciamento Visual: Interface otimizada para administração

## 👩‍💻 Desenvolvido por Emilly
Se você chegou até aqui, obrigada por conferir o projeto! 🤍
