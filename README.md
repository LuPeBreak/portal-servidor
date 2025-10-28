# Portal do Servidor - Prefeitura Municipal de Barra Mansa

Portal web moderno e responsivo para acesso aos sistemas municipais da Prefeitura de Barra Mansa, desenvolvido com React, TypeScript e Vite.

## 🚀 Funcionalidades

### ✨ Interface Moderna
- Design responsivo e acessível
- Tema claro/escuro com persistência
- Interface intuitiva e fácil navegação
- Componentes reutilizáveis com shadcn/ui

### 🔍 Sistema de Busca Inteligente
- **Busca Fuzzy com Prioridades**: Sistema avançado de busca que encontra resultados mesmo com termos parciais
- **Ordem de Prioridade de Busca**:
  1. **Título do Link** (prioridade máxima)
  2. **Descrição do Link**
  3. **Keywords do Link**
  4. **Título da Categoria**
  5. **Descrição da Categoria**
  6. **Keywords da Categoria** (prioridade mínima)
- **Busca Inteligente**: Quando uma categoria corresponde à busca, mostra todos os links da categoria
- **Ranking por Relevância**: Resultados ordenados por score de similaridade
- **Busca em Tempo Real**: Resultados instantâneos conforme você digita

### 📂 Organização por Categorias
- **Sistemas de Gestão Pública**: Acesso aos principais sistemas administrativos
- **Utilidades**: Ferramentas e serviços úteis para o dia a dia
- **Suporte TI**: Suporte técnico e solicitações de TI

### 🎯 Características Técnicas
- **TypeScript**: Tipagem forte para maior confiabilidade
- **Estrutura de Dados Flexível**: Sistema baseado em chaves nomeadas para fácil manutenção
- **Keywords Personalizadas**: Cada link e categoria possui keywords para melhorar a busca
- **Performance Otimizada**: Hooks customizados e memoização para melhor performance
- **Linting Rigoroso**: Biome para formatação e qualidade de código

## 🛠️ Tecnologias Utilizadas

- **React 18** - Biblioteca para interfaces de usuário
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Vite** - Build tool moderna e rápida
- **Tailwind CSS** - Framework CSS utilitário
- **shadcn/ui** - Componentes de UI modernos e acessíveis
- **Lucide React** - Ícones SVG otimizados
- **Biome** - Linter e formatador de código

## 📦 Instalação e Execução

### Pré-requisitos
- Node.js 18+ 
- npm ou pnpm

### Instalação
```bash
# Clone o repositório
git clone [url-do-repositorio]

# Entre no diretório
cd portal-servidor

# Instale as dependências
npm install
# ou
pnpm install
```

### Execução
```bash
# Desenvolvimento
npm run dev
# ou
pnpm dev

# Build para produção
npm run build
# ou
pnpm build

# Preview da build
npm run preview
# ou
pnpm preview
```

### Scripts Disponíveis
```bash
# Verificação completa (lint + type-check)
npm run check

# Apenas linting
npm run lint

# Apenas verificação de tipos
npm run type-check
```

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── ui/             # Componentes base do shadcn/ui
│   ├── CategorySection.tsx
│   ├── Header.tsx
│   ├── LinkCard.tsx
│   └── SearchBar.tsx
├── data/               # Dados da aplicação
│   └── portal-links.ts # Configuração de links e categorias
├── hooks/              # Hooks customizados
│   ├── useSearch.ts    # Hook de busca inteligente
│   └── useTheme.ts     # Hook de tema
├── lib/                # Utilitários
│   └── utils.ts
└── App.tsx             # Componente principal
```

## ⚙️ Configuração de Links

Os links são configurados no arquivo `src/data/portal-links.ts` com a seguinte estrutura:

```typescript
export const portalConfig = {
  categoryKey: {
    name: "Nome da Categoria",
    description: "Descrição da categoria",
    keywords: ["palavra1", "palavra2"], // Para busca
    links: [
      {
        title: "Nome do Sistema",
        description: "Descrição do sistema",
        url: "https://sistema.barramansa.rj.gov.br",
        icon: "IconName", // Ícone do Lucide React
        keywords: ["Sistema"], // Para busca
        isNew: false // Opcional: marca como novo
      }
    ]
  }
}
```

### Adicionando Novos Links
1. Edite o arquivo `src/data/portal-links.ts`
2. Adicione o link na categoria apropriada
3. Inclua keywords relevantes para melhorar a busca
4. Use ícones disponíveis no Lucide React

## 🔍 Como Funciona a Busca

O sistema de busca implementa um algoritmo fuzzy com pontuação baseada em prioridades:

1. **Busca Exata**: Correspondência exata recebe pontuação máxima (100)
2. **Começa Com**: Texto que inicia com o termo buscado (90 pontos)
3. **Contém**: Texto que contém o termo buscado (70 pontos)
4. **Busca Fuzzy**: Correspondência parcial de palavras (30 pontos por palavra)

### Prioridades de Busca
- **Links específicos** (600-400 pontos): Título > Descrição > Keywords
- **Categorias** (300-100 pontos): Título > Descrição > Keywords

Quando uma categoria corresponde à busca, todos os seus links são exibidos. Quando apenas links específicos correspondem, apenas esses links são mostrados.

## 🎨 Personalização

### Temas
O portal suporta tema claro e escuro com persistência no localStorage. A alternância é feita através do botão no cabeçalho.

### Cores e Estilos
As cores são configuradas através do Tailwind CSS e podem ser personalizadas no arquivo `src/index.css`.

## 📱 Responsividade

O portal é totalmente responsivo e funciona em:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🚀 Deploy

O projeto pode ser deployado em qualquer serviço de hospedagem estática:

```bash
# Build para produção
npm run build

# Os arquivos estarão na pasta 'dist'
```

Serviços recomendados:
- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para suporte técnico ou dúvidas sobre o portal, entre em contato com a equipe de TI da Prefeitura Municipal de Barra Mansa.

---

*Projeto desenvolvido com auxílio da IA da TRAE.*

**Desenvolvido com ❤️ para a Prefeitura Municipal de Barra Mansa**
