import mongoose from 'mongoose'
import catalogdata from '../../initdata/catalog'
const Schema = mongoose.Schema

const catalogSchema = new Schema({
	name: String,
    des: String,
    create_time: String,
    modify_time: String
})

catalogSchema.statics.getCatalogNameById = async function (id) {
    return await this.find({ '_id': id}, 'name');
}

const Catalog = mongoose.model('catalog', catalogSchema)
Catalog.findOne((err, data) => {
	if (!data) {
		catalogdata.forEach(item => {
			Catalog.create(item)
		})
	}
})

export default Catalog