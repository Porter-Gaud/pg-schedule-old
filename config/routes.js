module.exports = function(express){
	var router = express.Router();
	router.get("/", function(req, res, next){
		res.sendFile("index.html", {"root": __dirname+"./../views/"});
		next();
	});
}