const express = require("express")
const app = express()
const mongoose = require("mongoose")

app.use(express.json())

let uri = `mongodb+srv://${username}:${password}@${cluster}/sample_analytics?authSource=${authSource}`

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

mongoose.connect(uri, { useNewUrlParser: true })
	.then(()=>{
		console.log("Database Connected")
	}).catch(err => {
		console.error(err)
	})

app.get("/db/:idaccount", function (req, res) {
	console.log(res)
	console.log("recibi peticion")

	const accountSchema = new mongoose.Schema({
		_id: String,
		account_id: Number,
		limit: Number,
		products: Array
	})

	const idaccounturl = req.params.idaccount
	const MyModel = new mongoose.model("sample_analytics", accountSchema, "accounts")
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
})

const PORT = 3000
app.listen(PORT, () => {
	console.log(`listening on port ${PORT}`)
})

