Todos = new Mongo.Collection('todos');

if(Meteor.isClient){
	Template.todos.helpers({
		'todo': function(){
			return Todos.find({}, {sort: {createdAt: -1}});
		},
	});

	Template.todos.events({
		'submit form': function(){
			event.preventDefault();
			var todoName = $('[name="todoName"]').val();
			Todos.insert({
				name: todoName,
				completed: false,
				createdAt: new Date()
			});
			$('[name="todoName"]').val('');
		}
	});
}

if(Meteor.isServer){
	console.log('hello server');
}