import mongoose from 'mongoose'
import catalogdata from '../../initdata/catalog'
const Schema = mongoose.Schema

const catalogSchema = new Schema({
	catalog_id: Number,
	name: String,
    des: String,
    create_time: String,
    modify_time: String
})

const Catalog = mongoose.model('catalog', catalogSchema)
Catalog.findOne((err, data) => {
	if (!data) {
		catalogdata.forEach(item => {
			Catalog.create(item)
		})
	}
})

export default Catalog