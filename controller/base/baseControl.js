import TagModel from '../../models/v1/tag'
import uuid from 'node-uuid'
export default class BaseControl {
    constructor() {
    }
    uuid() {
      return uuid.v1()
    }
}