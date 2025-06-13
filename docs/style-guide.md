Nós usamos como base [este style guide](https://mkosir.github.io/typescript-style-guide/), e vamos documentar aqui sempre que nosso estilo desviar da base.

# Nossa organização de código

Estamos adotando uma nova organização de código no IP.
Importante: Todo o código dentro de `src/features` deve respeitar as regras abaixo. O que está fora é legado e será portado aos poucos pra dentro.

- Dentro de `src/features`, só temos pastas com os nomes de  diferentes funcionalidades, como por exemplo `acf`.
- `common` é uma pasta especial onde colocamos código que pode ser reutilizado em mais de uma funcionalidade.
    - `common` também pode aparecer como um módulo que contém submódulos usados em diversos submódulos
- Cada feature é dividida em 3 pastas:
    - `backend`: todo o código usado no backend. lógica de negócio, queries, e assim por diante.
    - `frontend`: todo o código React usado no frontend. Normalmente, isso inclui componentes React (tanto server quanto client rendered), e todo o código necessário pra que eles funcionem.
    - `shared`: código que pode ser utilizado tanto pelo `backend` quanto pelo `frontend`. Normalmente isso inclui schemas usados pra comunicação.
- A partir daqui, o código é dividido em módulos
    - Pastas filhas diretas de `backend`, `frontend` e `shared` são consideradas módulos, não precisam estar dentro de uma pasta `modules`.
    - Módulos simples podem ser implementados em um único arquivo, por exemplo: `PanelSelector.tsx` ou `diabetes.ts`
    - Módulos complexos devem ser colocados dentro de uma pasta com o nome do módulo. i.e. `PanelSelector/`.
    - Um módulo sempre deve exportar diretamente tudo que considera parte da sua API pública. 
        - Módulos complexos devem conter um arquivo `index.ts|tsx` que faz estes exports.
    - Submódulos devem ser incluídos dentro de uma pasta `modules` (a não ser para as pastas `backend`, `frontend` e `shared`, como dito anteriormente).
- Quando dois módulos precisam interagir, algumas regras devem ser respeitadas:
    - imports para arquivos internos a um módulo ou submódulo são permitidos e devem usar caminho relativo. i.e.: `'./controller.ts'`
    - imports para arquivos externos ao módulo são permitidos, mas devem ser muito bem avaliados, e sempre usar caminhos absolutos. i.e.: `'@features/acf/diabetes'` 
    - Módulos nunca devem importar arquivos internos de outros módulos. Se isso precisa acontecer, então a informação deve ser exposta dentro do `index` e o módulo externo importa ela diretamente do index.
        - Exemplo: se `M1` precisa usar o controller interno do `M2`, então ao invés de importar `@features/M2/controller'`, este controller deve ser exposto no `index.ts` de `M2` e o import deve ser `import * as M2 from @features/M2`.
- Arquivos de teste ficam colozalizados com o código que testam, dentro da pasta `__tests__`.
    - Isso facilita mover módulos de um lugar para o outro sem quebrar seus testes

