Template.todoItem.helpers({
	'checked': function(){
		var isCompleted = this.completed;
		if(isCompleted){
			return "checked"
		} else {
			return ""
		}
	}
});

Template.todoItem.events({
	'click .delete-todo': function(event){
		event.preventDefault();
		var documentId = this._id;
		var confirm = window.confirm("Delete this task?");
		if(confirm){
			Todos.remove({_id: documentId});
		}
	},
	'keyup [name=todoItem]': function(event){
		if(event.which == 13 || event.which == 27){
			$(event.target).blur();
		} else {
			var todoItem = $(event.target).val();
			var documentId = this._id;
			Todos.update({_id: documentId}, {$set: {name: todoItem}});
		}
	},
	'change [type=checkbox]': function(){
		var documentId = this._id;
		var isCompleted = this.completed;
		Todos.update({_id: documentId}, {$set: {completed: !isCompleted}});
	}
});