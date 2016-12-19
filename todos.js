Todos = new Mongo.Collection('todos');

if(Meteor.isClient){
	console.log('hello client');
}

if(Meteor.isServer){
	console.log('hello server');
}