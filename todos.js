Todos = new Mongo.Collection('todos');
Lists = new Mongo.Collection('lists');

Router.route('/', {
	name: 'home',
	template: 'home'
});
Router.configure({
	layoutTemplate: 'main'
});
Router.route('/register');
Router.route('/login');
Router.route('/list/:_id', {
	name: 'listPage',
	template: 'listPage',
	data: function(){
		var currentList = this.params._id;
		return Lists.findOne({_id: currentList});
	}
});

if(Meteor.isClient){
	Template.todos.helpers({
		'todo': function(){
			var currentList = this._id;
			return Todos.find({listId: currentList}, {sort: {createdAt: -1}});
		},
	});	

	Template.todos.events({
		'submit form': function(event){
			event.preventDefault();
			var todoName = $('[name="todoName"]').val();
			var currentList = this._id;
			Todos.insert({
				name: todoName,
				completed: false,
				createdAt: new Date(),
				listId: currentList
			});
			$('[name="todoName"]').val('');
		}
	});

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

	Template.lists.helpers({
		'list': function(){
			return Lists.find({}, {sort: {name: 1}});
		}
	})

	Template.addList.events({
		'submit form': function(event){
			event.preventDefault();
			var listName = $('[name=listName]').val();
			Lists.insert({
				name: listName
			}, function(error, results){
				Router.go('listPage', {_id: results});
			});
			$('[name=listName]').val('');
		}
	});
}
