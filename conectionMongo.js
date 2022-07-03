
const username = ${{ secrets.MONGO_ATLAS_USER }}
const password = ${{ secrets.MONGO_ATLAS_USER }}
const cluster = ${{ secrets.MONGO_ATLAS_USER }}
const authSource = ${{ secrets.MONGO_ATLAS_USER }}
let uri = `mongodb+srv://${username}:${password}@${cluster}/sample_analytics?authSource=${authSource}`

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