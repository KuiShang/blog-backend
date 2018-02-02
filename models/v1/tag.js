import mongoose from 'mongoose'
import tagdata from '../../initdata/tag'
const Schema = mongoose.Schema

const tagSchema = new Schema({
	name: String,
	articleCount: Number
})
tagSchema.statics.getTagNameById = async function (id) {
	return this.find({
		'_id': id
	}, 'name')
}
const Tag = mongoose.model('tag', tagSchema)
Tag.findOne((err, data) => {
	if (err) {
		throw err
	}
	if (!data) {
		tagdata.forEach(item => {
			Tag.create(item)
		})
	}
})

export default Tag
