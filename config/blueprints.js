module.exports.blueprints = {

  /***************************************************************************
  *                                                                          *
  * Automatically expose implicit routes for every action in your app?       *
  *                                                                          *
  ***************************************************************************/

   actions: true,


  /***************************************************************************
  *                                                                          *
  * Automatically expose RESTful routes for your models?                     *
  *                                                                          *
  ***************************************************************************/

  rest: true,


  /***************************************************************************
  *                                                                          *
  * Automatically expose CRUD "shortcut" routes to GET requests?             *
  * (These are enabled by default in development only.)                      *
  *                                                                          *
  ***************************************************************************/

  // shortcuts: true,


  /***************************************************************************
  *                                                                          *
  * Optional mount path prefix for all implicit blueprint routes ("shadows") *
  *                                                                          *
  ***************************************************************************/

  prefix: '/api',



  /***************************************************************************
  *                                                                          *
  * Automatically enroll sockets requesting the `find` blueprint action to   *
  * receive special notifications about any new records for the same model.  *
  * (Only notifies for records created with the `create` blueprint action.)  *
  *                                                                          *
  ***************************************************************************/

  // autoWatch: true,

};
