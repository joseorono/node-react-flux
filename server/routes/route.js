var router = require ('express').Router ();

/*
 *  This is a sample route --
 *  -- create more routes by following the commented section below this route.
 */
router.get ('/', function (request, response) {
  /**
   ** Write your logic here
   **/
   response.send ({
     character : 'Hello, Route!'
   });
});

module.exports = router;
