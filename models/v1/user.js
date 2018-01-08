import mongoose from 'mongoose'
import userdata from '../../initdata/user'
const Schema = mongoose.Schema

const userSchema = new Schema({
	user_id: Number,
	username: String,
	password: String,
})

const User = mongoose.model('User', userSchema)
User.findOne((err, data) => {
	if (!data) {
		userdata.forEach(item => {
			User.create(item)
		})
	}
})

export default User