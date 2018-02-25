'user strict';

var mongoose = require('mongoose'),
	Item = mongoose.model("Items");

exports.list_all_items = function(req,res){
	Item.find({}, function(err,item){
		if (err)
			res.send(err);
		res.json(item);
	});
};

exports.create_an_item = function(req,res){
	var new_item = new Item(req.body);
	new_item.save(function(err,item){
		if (err)
			res.send(err);
		res.json(item);
	});
};


exports.read_an_item = function(req,res){
	Item.findById(req.params.itemId, function(err,item){
		if (err)
			res.send(err);
		res.json(item);
	});
};


exports.update_an_item = function(req,res){
	Item.findOneAndUpdate({id:req.params.taskId},req.body,{new:true},function(err,item){
		if (err)
			res.send(err);
		res.json(item);
	});
};

exports.delete_an_item = function(req,res){
	Item.remove({
		_id: req.params.taskId
	}, function(err,item){
		if (err)
			res.send(err);
		res.json({ message: "Item deleted"});		
	});
};

exports.index = function(req,res){
	res.send("<p>I am an API</p>");
}
