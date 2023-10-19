/*
  value-object é uma forma de abstrair uma regra de negocio de um único campo da nossa
  entidade em uma class separada (arquivo)

  SLUG: é uma forma de identificar uma informação em especifico pelo navegador, neste caso usa o slug que é uma representação
  to titulo da perguntar sem acentos é sem caracteres especiais. Isso é bom para a indexação de não utilizar o id da pergunta
  na URL do navegador, quando o usuário for procurar por alguma pergunta.
*/
export class Slug {
  public value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(slug: string) {
    return new Slug(slug)
  }

  /**
   * Receives a string and normalizes it as a slug
   *
   * Example: "An example title" => "an-example-title"
   *
   * @param text {string}
   */
  static createFromText(text: string) {
    const slugText = text
      .normalize('NFKD')
      .toLocaleLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/_/g, '-')
      .replace(/--+/g, '-')
      .replace(/-$/g, '')

    return new Slug(slugText)
  }
}
