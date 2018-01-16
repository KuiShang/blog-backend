import v1 from './v1'
import v6 from './v6'
export default app => {
  app.use('/v1', v1)
  app.use('/v6', v6);
}