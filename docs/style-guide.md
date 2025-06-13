Nós usamos como base [este style guide](https://mkosir.github.io/typescript-style-guide/), e vamos documentar aqui sempre que nosso estilo desviar da base.

# Nossa organização de código

Estamos adotando uma nova organização de código no IP.
Importante: Todo o código dentro de `src/features` deve respeitar as regras abaixo. O que está fora é legado e será portado aos poucos pra dentro.

- Dentro de `src/features`, só temos pastas com os nomes de  diferentes funcionalidades, como por exemplo `acf`.
- `common` é uma pasta especial onde colocamos código que pode ser reutilizado em mais de uma funcionalidade.
- Cada feature é dividida em 3 pastas:
    - `backend`: todo o código usado no backend. lógica de negócio, queries, e assim por diante.
    - `frontend`: todo o código React usado no frontend. Normalmente, isso inclui componentes React (tanto server quanto client rendered), e todo o código necessário pra que eles funcionem.
    - `shared`: código que pode ser utilizado tanto pelo `backend` quanto pelo `frontend`. Normalmente isso inclui schemas usados pra comunicação.
- Dentro das respectivas pastas, o código será organizado por módulos.
    - Módulos simples podem ser implementados em um único arquivo, por exemplo: `PanelSelector.tsx` ou `diabetes.ts`
    - Um módulo complexo deve ser colocado dentro de uma pasta com o nome do módulo. i.e. `PanelSelector/`.
    - Um módulo sempre deve exportar diretamente tudo que considera parte da sua API pública. 
        - Módulos complexos devem conter um arquivo `index.ts|tsx` que faz estes exports.
    - imports para arquivos internos ao módulo ou submódulos devem usar caminho relativo. i.e.: `'./controller.ts'`
    - imports para arquivos externos ao módulo devem sempre usar caminhos absolutos, e nunca acessar arquivos internos de um módulo. i.e.: `'@features/acf/diabetes'` 
    - Módulos nunca devem importar arquivos internos de outros módulos. Se isso precisa acontecer, então a informação deve ser exposta dentro do `index` e o módulo externo importa ela diretamente do index.
        - Exemplo: se `M1` precisa usar o controller interno do `M2`, então ao invés de importar `@features/M2/controller'`, este controller deve ser exposto no `index.ts` de `M2` e o import deve ser `import * as M2 from @features/M2`.


