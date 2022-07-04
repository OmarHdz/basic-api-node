
require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")

const username = encodeURIComponent(process.env.MONGO_ATLAS_USER)
const password = encodeURIComponent(process.env.MONGO_ATLAS_PSSWRD)
const cluster = process.env.MONGO_ATLAS_CLUSTER
const authSource = process.env.MONGO_ATLAS_AUTHSOURCE
const selectDb = process.env.MONGO_ATLAS_DB
let uri = `mongodb+srv://${username}:${password}@${cluster}/${selectDb}?authSource=${authSource}`

const accountSchema = new mongoose.Schema({
	_id: String,
	account_id: Number,
	limit: Number,
	products: Array
})
const MyModel = new mongoose.model(selectDb, accountSchema, "accounts")

app.get("/db/:idaccount", function (req, res) {
	mongoose.connect(uri, { useNewUrlParser: true })
		.then(()=>{
		console.log("Database Connected")
		console.log("recibi peticion")

		const idaccounturl = req.params.idaccount
		//MyModel.find({ account_id : 977982 }).then(result => {
		MyModel.find({ account_id : Number(idaccounturl) }).then(result => {
			console.log(result)
			res.json(result[0])
			console.log("Se logro")
			mongoose.connection.close()
		}).catch(err => {
			console.log("Hubo un error")
			console.log(err)
		})
			}).catch(err => {
				console.error(err)
			})

	//console.log(res)
})
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

