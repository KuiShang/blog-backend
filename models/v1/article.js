import mongoose from 'mongoose'
import articledata from '../../initdata/article'
const Schema = mongoose.Schema

const articleSchema = new Schema({
	article_id: String,
	title: String,
    summary: String,
    create_time: Number,
    modify_time: Number,
    catalog_id: String,
    banner: String,
    tag_names: String,
    catalogName: String,
    tags: Array
})

const Article = mongoose.model('article', articleSchema)
Article.findOne((err, data) => {
	if (!data) {
		articledata.forEach(item => {
			Article.create(item)
		})
	}
})

export default Article
