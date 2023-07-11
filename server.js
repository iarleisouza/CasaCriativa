// instalar npm install express criar e configurar o servidor

const express = require("express")
const server = express()
const db = require("./db")


/* const ideas = [
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
        title:"karaoke",
        category:"Estudo",
        description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam, quibusdam totam? Laboriosam numquam nobis libero",
        url:""
    },
] */

// configurar arquivos estaticos (css,scripts, imagens)
server.use(express.static("public"))

//habilitar uso do req.body
server.use(express.urlencoded({ extended: true}))
//instalar o nunjucks para criação de váriaveis no html.
//npm i nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    nocache: true, //boolean
})

//rota / captura o pedido do cliente para responder
server.get("/", function(req, res) {

      db.all(`SELECT * FROM ideas`, function (err, rows){
        if (err){
            console.log(err)
            return res.send("Erro no banco de dados!")
        }
          //   console.log(rows)
          const reverseIdeas = [...rows].reverse()
          let lastIdeas = []
          for (let idea of reverseIdeas) {
             if(lastIdeas.length < 2) {
                 lastIdeas.push(idea)
             }
          }
         
          return res.render("index.html", { ideas: lastIdeas })
         
         })
        })


     //  re turn res.sendFile(__dirname + "/index.html")
  
    

server.get("/ideias", function(req, res) {
      // return res.sendFile(__dirname + "/ideias.html")
      db.all(`SELECT * FROM ideas`, function (err, rows){
        if (err){
            console.log(err)
            return res.send("Erro no banco de dados!")

        } 
      const reverseIdeas = [...rows].reverse()
   
     return res.render("ideias.html", { ideas: reverseIdeas })
     
    })
})

server.post("/", function(req, res){
    //Inserir dado na tabela
    const query = `
    INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
    ) VALUES (?,?,?,?,?);
    `
    const values = [
       req.body.image,
       req.body.title,
       req.body.category,
       req.body.description,
       req.body.link,
    ]
    db.run(query, values, function(err){
        if (err){
            console.log(err)
            return res.send("Erro no banco de dados!")
        }
        return res.redirect("/ideias")
    })
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