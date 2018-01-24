import mongoose from 'mongoose'
import tagdata from '../../initdata/tag'
const Schema = mongoose.Schema

const tagSchema = new Schema({
	tag_id: Number,
	name: String,
    articleCount: Number
})

const tag = mongoose.model('tag', tagSchema)
tag.findOne((err, data) => {
	if (!data) {
		tagdata.forEach(item => {
			tag.create(item)
		})
	}
})

export default tag