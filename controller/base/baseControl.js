import uuid from 'node-uuid'
export default class BaseControl {
	uuid () {
		return uuid.v1()
	}
}
