'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

var userSchema = Schema( {
  name: String,
  description: String,
  classpect: {class:String,aspect:String},
  createdAt: Date,
  userId: {type:ObjectId,index:true},
} );

module.exports = mongoose.model( 'User', userSchema );