import mongoose from 'mongoose'
import tagdata from '../../initdata/tag'
const Schema = mongoose.Schema

const tagSchema = new Schema({
	name: String,
    articleCount: Number
})
tagSchema.statics.getTagNameById = async function (id) {
    return await this.find({ '_id': id}, 'name');
}
const Tag = mongoose.model('tag', tagSchema)
Tag.findOne((err, data) => {
	if (!data) {
		tagdata.forEach(item => {
			Tag.create(item)
		})
	}
})

export default Tag