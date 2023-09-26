<!--
SPDX-FileCopyrightText: 2021, 2022 ImpulsoGov <contato@impulsogov.org>

SPDX-License-Identifier: MIT
-->
![Badge em Produção](https://img.shields.io/badge/status-em%20produ%C3%A7%C3%A3o-green)

# Impulso Previne
O Impulso Previne é uma realização da ImpulsoGov, uma organização sem fins lucrativos e suprapartidária que apoia profissionais do SUS no aprimoramento das políticas públicas por meio do uso de dados e tecnologia, para que todas as pessoas no Brasil tenham acesso a serviços de saúde de qualidade.


*******
## :mag_right: Índice
1. [Contexto](#contexto)
2. [Estrutura do repositório](#estrutura)
3. [Rodando em produção](#rodando)
4. [Instruções para instalação e acesso ao projeto](#instalacao)
6. [Contribua](#contribua)
7. [Licença](#licenca)
*******

<div id='contexto'/>  

## :rocket: Contexto

O Previne Brasil é um programa para Atenção Básica que condiciona o repasse financeiro do MS para todos os municípios do Brasil. São avaliados os cadastros e 7 indicadores e a partir deles, é calculado o financiamento ponderado e por desempenho. 

O desenho do programa é bastante complexo e faltam ferramentas para o entendimento e acompanhamento por parte do gestor público, resultando em perda de financiamento para AB se não atingir as metas e grande dificuldade em fazer um autodiagnóstico e definir um plano de ação.

Assim criamos o Impulso Previne como coach virtual para guiar o gestor até o sucesso.
 
<div id='estrutura'/>  

 ## :milky_way: Estrutura do repositório

Essa aplicação foi implementada com [Next.js](https://nextjs.org/) como principal tecnologia e utilizando SSR para melhor performance no lado do cliente.

Essa aplicação é construida com a biblioteca de componentes do [Design System](https://designsystem.impulsogov.org/) da ImpulsoGov.

```plain
root
├─ componentes
├─ constants
├─ pages
│  ├─ ...
│  └──...
├─ public
├─ services
├─ styles
└─ utils
```

- componentes: componentes que podem ser reutilizados em outras partes da aplicação.
- constants: armazena constantes como url da aplicação e dos paineis no datastudio.
- pages: arquivos das páginas da aplicação.
- public: imagens para utilização na aplicação.
- services: importa outros serviços, como validador de token de login.
- styles: css do estilo das aplicações.
- utils: querys que puxa respostas do gerenciador de conteúdo.

*******
 <div id='rodando'/> 
 
## :gear: Rodando em produção

As nossas aplicações são rodadas na [vercel](https://vercel.com/).

*******

<div id='instalacao'/> 

 ## 🛠️ Instruções para instalação e acesso ao projeto
 
Para rodar em desenvolvimento:
```bash
npm run dev
```

Para verificar a aplicação estática produzida:
```bash
npm run build
# and
npm run start
```
*******

<div id='contribua'/>  

## :left_speech_bubble: Contribua
Sinta-se à vontade para contribuir em nosso projeto! Abra uma issue ou envie PRs.

*******
<div id='licenca'/>  

## :registered: Licença
MIT (c) 2020, 2022 Impulso Gov <contato@impulsogov.org>
