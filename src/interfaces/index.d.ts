/* extension of the Express.Request interface */
declare namespace Express {
  export interface Request {
    // we added a context key so we can pass local data through our middleware chain
    context?: {};
  }
}