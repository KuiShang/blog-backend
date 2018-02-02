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

articleSchema.statics.saveToCatalog = function (catalogId, articleId) {
	console.log(catalogId, articleId)
	return CatalogModel.findOne({'_id': catalogId}, (err, doc) => {
		if (err) {
			throw err
		}
		console.log(doc)
		doc.article_ids.push(articleId)
		doc.save()
	})
	// {
	// 	'article_id': articleId
	// }
}

articleSchema.statics.getCatalogNameById = function (id) {
	return CatalogModel.getCatalogNameById(id)
}
articleSchema.statics.getTagNameById = function (id) {
	return TagModel.getTagNameById(id)
}
articleSchema.statics.saveContent = function (content) {
	return ContentModel.create(content)
}
articleSchema.statics.getContent = function (id) {
	return ContentModel.findOne(id)
}
articleSchema.statics.updateContent = function (id, content) {
	return ContentModel.update({
		'article_id': id
	}, {
		content
	})
}

articleSchema.statics.removeContent = function (id) {
	return ContentModel.remove({
		'article_id': id
	})
}

const Article = mongoose.model('article', articleSchema)
Article.findOne((err, data) => {
	if (err) {
		throw err
	}
	if (!data) {
		articledata.forEach(item => {
			Article.create(item)
		})
	}
})

export default Article
