const rp = require('request-promise');
const cheerio = require('cheerio')
const linksImagens = new Array
const linkImagensCompleto = new Array

class Donwload {
  constructor(nome, capitulo) {
    this.nome = nome
    this.capitulo = capitulo
  }

  static async totalCap(nome) {
    const paginaInicial = await rp(`https://www.mangareader.net/${nome}`)
    const $ = cheerio.load(paginaInicial);
    const ultimoCapitulo = $('#latestchapters > ul:nth-child(2) > li:nth-child(1) > a:nth-child(2)').text().trim()
    const regexNumero = /\w+$/g

    const resultRegex = ultimoCapitulo.match(regexNumero)
    return resultRegex
  }

  static async numeroPaginas(nome, capitulo) {
    const paginaManga = await rp(`https://www.mangareader.net/${nome}/${capitulo}`)
    const $2 = cheerio.load(paginaManga);
    const numeroPaginas = $2('#pageMenu').children().last().text()
    return numeroPaginas
  }

  static async links(nome, capitulo) {
    const paginaManga = await rp(`https://www.mangareader.net/${nome}/${capitulo}`)
    const $2 = cheerio.load(paginaManga);

    $2('#pageMenu').find('option').each(function (i, elem) {
      linksImagens[i] = $2(this).val();
    })

    linksImagens.forEach((i, elem) => {
      linkImagensCompleto.push({ pagina: elem + 1, url: `https:/www.mangareader.net${[i]}` })
    })
    return linkImagensCompleto;
  }
}


module.exports = Donwload;
