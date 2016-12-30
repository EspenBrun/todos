Template.todosCount.helpers({
	'todosCount': function(){
		var currentList = this._id;
		return Todos.find({listId: currentList}).count();
	},
	'completedCount': function(){
		var currentList = this._id;
		return Todos.find({completed: true, listId: currentList}).count();
	},
	'activeCount': function(){
		var currentList = this._id;
		return Todos.find({completed: false, listId: currentList}).count();
	}
});