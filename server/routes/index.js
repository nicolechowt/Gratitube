// module.exports = function(app){

// 	const api = require('./routes/gratitudeListRoutes');
// 	app.use('/api', api);
// }

const path = require("path");
const router = require("express").Router();
const api = require('./gratitudeListRoutes');

// API Routes
router.use("/api", api);

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../../public/index.html"));
});


// router.use(function(req,res){
// 	res.send("<p>I am good!!</p>");
// });

module.exports = router;
