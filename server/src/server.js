const finalhandler     = require('finalhandler')
const http             = require('http')
const bodyParser       = require('body-parser')
const sanitizeFilename = require('sanitize-filename')
const FileServer       = require('file-server')
const Router           = require('router')
 
const router = Router()

//serve dynamic requests
router.get('/greet', (req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.end('Hello World!')
})
router.use(bodyParser.json({limit: 1024})) //.use(bodyParser.urlencoded({extended: true}))
router.post('/greet', (req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  const {name} = req.body
  res.end(`Hello ${name}!`)
})

const fileServer = new FileServer((error, req, res) => serveError(res, 404, 'file not found'))

function serveError(res, code, message) {
  res.statusCode = code;
  res.end(message)
}
//serve files
function serveFile(fromDir) {
  const mimes = {
    txt: 'text/plain',
    ico: 'image/x-icon',
    html: 'text/html',
    js: 'text/javascript',
    json: 'application/json',
    map: 'application/json',
    css: 'text/css',
    png: 'image/png',
    svg: 'image/svg+xml'
  }
  return (req, res) => {
    const filename = sanitizeFilename(req.params.filename || 'index.html')
    const dot = filename.lastIndexOf('.')
    if(dot <= 1) {
      serveError(res, 500, 'file requested must have extension')
      return
    }
    const extension = filename.substring(dot + 1)
    if(!extension || !mimes[extension]) {
      serveError(res, 500, 'unknown extension')
      return
    }
    fileServer.serveFile(fromDir + filename, mimes[extension])(req, res)
  }
}
for(let kind of ['css', 'js', 'media']) {
  router.get(`/static/${kind}/:filename`, serveFile(`${__dirname}/../../build/static/${kind}/`))
}
router.get('/:filename?', serveFile(__dirname + '/../../build/'))

http.createServer((req, res) => router(req, res, finalhandler(req, res)))
  .listen(process.env.PORT_SERVER || process.env.PORT || 3000)