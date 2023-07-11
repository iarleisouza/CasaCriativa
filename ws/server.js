// instalar npm install express criar e configurar o servidor

const express = require("express")
const server = express()
/*const db = require("./db")*/


const ideas = [
    {
        img:"./img/curso.png",
        title:"Cursos de Programação",
        category:"Estudo",
        description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam, quibusdam totam? Laboriosam numquam nobis libero",
        url:""
    },
    {
        img:"./img/curso.png",
        title:"Cursos de Programação",
        category:"Estudo",
        description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam, quibusdam totam? Laboriosam numquam nobis libero",
        url:""
    },
    {
        img:"./img/curso.png",
        title:"Cursos de Programação",
        category:"Estudo",
        description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam, quibusdam totam? Laboriosam numquam nobis libero",
        url:""
    },
    {
        img:"./img/curso.png",
        title:"Cursos de Programação",
        category:"Estudo",
        description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam, quibusdam totam? Laboriosam numquam nobis libero",
        url:""
    },
]

// configurar arquivos estaticos (css,scripts, imagens)
server.use(express.static("public"))


//instalar o nunjucks para criação de váriaveis no html.
//npm i nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    nocache: true, //boolean
})

//rota / captura o pedido do cliente para responder
server.get("/", function(req, res) {

  /*    db.all(`SELECT * FROM ideas`, function (err, rows){
             if (err) return console.log(err)
             console.log(rows)
        })


     //  re turn res.sendFile(__dirname + "/index.html")
     const h1 = "Backend"  */
     const lastIdeas = []
     for (let idea of ideas) {
        if(lastIdeas.length < 2) {
            lastIdeas.push(idea)
        }
     }
     return res.render("index.html", { ideas: lastIdeas })
    
    })

server.get("/ideias", function(req, res) {
      // return res.sendFile(__dirname + "/ideias.html")
     return res.render("ideias.html", { ideas })
    })
// instalar o monitoramento do node o nodemon / npm i nodemon ou npm install nodemon
// Servidor na porta 3000
// rodar npm init -y para criar o arquivo package.json com informações do módulo servidor.
server.listen(3000)

// Instalar npm i nodemon // rodar o servidor
//adicionar no arquivo package.json a linha abaixo
/*  "scripts": {
    "start": "nodemon server.js"
  },
  "name": "ws",
  "version": "1.0.0",
  "main": "index.js",
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": ""
}*/

// rodar comando npm start