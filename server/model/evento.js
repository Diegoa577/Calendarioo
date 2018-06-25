const mongoose = require('mongoose')
	const Schema = mongoose.Schema

	let EventoSchema = new Schema({
		_creator:{
			 type: mongoose.Schema.Types.ObjectId,
			 require: true,
		 },
		title:{
			 type: String,
			 require: true,
		 },
		 start:{
 			type: String,
 			require: true
 		},
		end:{
			type: String,
		}

	})


	let Evento = mongoose.model('Evento', EventoSchema)

	module.exports = {Evento}
