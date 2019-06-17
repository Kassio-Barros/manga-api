const rp = require('request-promise')
const cheerio = require('cheerio')
const linksImagens = new Array
const linkImagensCompleto = new Array

class Download {
  constructor(nome, capitulo) {
    this.nome = nome
    this.capitulo = capitulo
  }

  static async getUrl(url, nome = false, capitulo = false) {
    let pagina
    if (capitulo) {
      pagina = await rp(`${url}${nome}/${capitulo}`)

    } else if (url && nome) {
      pagina = await rp(`${url}${nome}`)

    } else {
      pagina = await rp(url)
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
    this.numPage = numeroPaginas;
  }

  static async links(url, nome, capitulo) {
    const $ = await this.getUrl(url, nome, capitulo)

    $('#pageMenu').find('option').each(function (i, elem) {
      linksImagens[i] = $(this).val()
    })

    for (let i = 0; i < linksImagens.length; i += 1) {
      const linkImagem = `https://www.mangareader.net${linksImagens[i]}`
      const $ = await this.getUrl(linkImagem)

      const imagemUrl = $('#img').attr('src')
      console.log(imagemUrl);

      linkImagensCompleto.push({ pagina: i + 1, url: imagemUrl })

    }

    return linkImagensCompleto
  }
}

module.exports = Download
