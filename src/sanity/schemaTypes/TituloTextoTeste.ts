import {defineField, defineType} from 'sanity'

export const TituloTextoTeste = defineType({
  name: 'TituloTextoTeste',
  title: 'Titulo Texto Teste',
  type: "document",
  fields: [
    defineField({
      name: 'titulo',
      type: 'string',
    }),
    defineField({
        name: 'texto',
        type: 'text',
    }),
    defineField({
        name: 'imagem',
        type: 'image',
    }),
  ],
})