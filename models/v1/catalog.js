import mongoose from 'mongoose'
import catalogdata from '../../initdata/catalog'
const Schema = mongoose.Schema

const catalogSchema = new Schema({
	name: String,
	des: String,
	article_ids: Array,
	create_time: String,
	modify_time: String
})

catalogSchema.statics.getCatalogNameById = async function (id) {
	return this.find({
		'_id': id
	}, 'name')
}

const Catalog = mongoose.model('catalog', catalogSchema)
Catalog.findOne((err, data) => {
	if (err) {
		throw err
	}
	if (!data) {
		catalogdata.forEach(item => {
			Catalog.create(item)
		})
	}
})

export default Catalog
