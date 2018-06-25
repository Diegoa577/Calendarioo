const mongoose = require('mongoose')
	const Schema = mongoose.Schema

	let UserSchema = new Schema({
		usuario:{
			 type: String,
			 require: true,
			 unique:true
		 },
		 pass:{
 			type: String,
 			require: true
 		},
		nombres:{
			type: String,
			require: true
		},
		apellidos:{
			type: String,
			require: true
		}

	})

	UserSchema.statics.findByCredentials = function (usuario, pass) {
	  var User = this;

	  return User.findOne({usuario}).then((user) => {
	    if (!user) {
	      return Promise.reject();
	    }

	    return new Promise((resolve, reject) => {
				if(pass == user.pass){
					resolve(user);
	 		 } else {
	 			 reject();
	 		 }
	    });
	  });
	};

	let User = mongoose.model('User', UserSchema)

	module.exports = {User}
