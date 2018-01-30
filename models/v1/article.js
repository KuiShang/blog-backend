import mongoose from 'mongoose'
import articledata from '../../initdata/article'
import CatalogModel from './catalog'
import ContentModel from './content'
import TagModel from './tag'

const Schema = mongoose.Schema
const articleSchema = new Schema({
	id: String,
	title: String,
    summary: String,
    create_time: Number,
    modify_time: Number,
    catalog_id: String,
    banner: String,
    status: Number,
    tag_ids: Array
})

articleSchema.statics.getCatalogNameById = function (id) {
    return CatalogModel.getCatalogNameById(id);
}
articleSchema.statics.getTagNameById = function (id) {
    return TagModel.getTagNameById(id);
}
articleSchema.statics.saveContent = function (content) {
    return ContentModel.create(content);
}

const Article = mongoose.model('article', articleSchema)
Article.findOne((err, data) => {
	if (!data) {
		articledata.forEach(item => {
			Article.create(item)
		})
	}
})

export default Article
