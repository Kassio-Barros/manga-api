const rp = require('request-promise')
const cheerio = require('cheerio')
const linksImagens = new Array
const linkImagensCompleto = new Array

class Donwload {
  constructor(nome, capitulo) {
    this.nome = nome
    this.capitulo = capitulo
  }

  static async getUrl(url, nome, capitulo = false) {
    let pagina
    if (capitulo) {
      pagina = await rp(`${url}${nome}/${capitulo}`)
    } else {
      pagina = await rp(`${url}${nome}`)
    }

    const $ = cheerio.load(pagina)
    return $
  }

  static async totalCap(url, nome) {
    const $ = await this.getUrl(url, nome)
    const ultimoCapitulo = $('#latestchapters > ul:nth-child(2) > li:nth-child(1) > a:nth-child(2)').text().trim()
    const regexNumero = /\w+$/g

    const resultRegex = ultimoCapitulo.match(regexNumero)
    return resultRegex
  }

  static async numeroPaginas(url, nome, capitulo) {
    const $ = await this.getUrl(url, nome, capitulo)
    const numeroPaginas = $('#pageMenu').children().last().text()
    return numeroPaginas
  }

  static async links(url, nome, capitulo) {
    const $ = await this.getUrl(url, nome, capitulo)

    $('#pageMenu').find('option').each(function (i, elem) {
      linksImagens[i] = $(this).val()
    })

    linksImagens.forEach((i, elem) => {
      linkImagensCompleto.push({ pagina: elem + 1, url: `https:/www.mangareader.net${[i]}` })
    })
    return linkImagensCompleto
  }
}

module.exports = Donwload
