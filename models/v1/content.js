import mongoose from 'mongoose'
// import tagdata from '../../initdata/tag'
const Schema = mongoose.Schema

const contentSchema = new Schema({
	article_id: String,
	content: String
})

const content = mongoose.model('content', contentSchema)
// Tag.findOne((err, data) => {
// 	if (!data) {
// 		tagdata.forEach(item => {
// 			Tag.create(item)
// 		})
// 	}
// })

export default content
