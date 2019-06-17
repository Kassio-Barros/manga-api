const rp = require('request-promise')
const cheerio = require('cheerio')

const linksImagens = []
const linkImagensCompleto = []

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

  static async infoPagina(url, nome, capitulo) {
    const $ = await this.getUrl(url, nome, capitulo)
    const numeroPaginas = $('#pageMenu').children().last().text()
    this.numPage = numeroPaginas;

    $('#pageMenu').find('option').each((i, elem) => {
      linksImagens[i] = `https://www.mangareader.net${$(elem).attr('value')}`
    })
    console.log(linksImagens);
  }

  static async links() {
    const solveLinks = async (i) => {
      const page = await this.getUrl(linksImagens[i])
      const imagemUrl = page('#img').attr('src')
      linkImagensCompleto.push({ pagina: i + 1, url: imagemUrl })
    }

    const solvePage = []
    for (let i = 0; i < linksImagens.length; i += 1) {
      solvePage.push(solveLinks(i))
    }
    Promise.all(solvePage);
    return linkImagensCompleto
  }
}

module.exports = Download
