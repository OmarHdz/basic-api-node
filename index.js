
const express = require("express")
const app = express()
const mongoose = require("mongoose")

app.use(express.json())

let respuesta = [
	{
		id: "1",
		mode: "raze",
		otro: "lala"
	},
	{
		id: "2",
		mode: "speed",
		otro: "hsldk"
	},
	{
		id: "3",
		mode: "nome",
		otro: "slakd"
	},
]

app.get("/", function (req, res) {
	res.send("<h1>Hello World</h1>")
})

app.get("/res", function (req, res) {
	res.json(respuesta)
})

app.get("/res/:id", function (req, res) {
	const id = req.params.id
	const note = respuesta.find(d => d.id===id)

	if(note){
		res.send(note)
	} else { 
		res.send("<h1>Id not found</h1>")
		//res.status(404).end()
	}
})

app.post("/pos", function (req, res) {
	let cont = req.body

	let idm = Number(cont.id)*2
	res.json(cont)
	console.log(cont)
	console.log(idm)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log(`listening on port ${PORT}`)
})

