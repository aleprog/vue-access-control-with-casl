"use strict";
const sqlite3 = require('sqlite3').verbose();

class Db {
	constructor(file) {
		this.db = new sqlite3.Database(file);
		this.createTable()
		this.createBlogTable()
	}

	createTable() {
		const sql = `
			CREATE TABLE IF NOT EXISTS user (
			id integer PRIMARY KEY, 
			name text NOT NULL, 
			email text NOT NULL UNIQUE, 
			user_pass text NOT NULL,
			is_admin integer NOT NULL DEFAULT 0)
		`
		return this.db.run(sql);
	}

	selectByEmail(email, callback) {
		return this.db.get(
			`SELECT * FROM user WHERE email = ?`,
			[email],function(err,row){
				callback(err,row)
			}
		)
	}

	selectAll(callback) {
		return this.db.all(`SELECT * FROM user`, function(err,rows){
			callback(err,rows)
		})
	}

	insert(user, callback) {
		return this.db.run(
			'INSERT INTO user (name,email,user_pass) VALUES (?,?,?)',
			user, (err) => {
				callback(err)
			}
		)
	}

	insertAdmin(user, callback) {
		return this.db.run(
			'INSERT INTO user (name,email,user_pass,is_admin) VALUES (?,?,?,?)',
			user, (err) => {
				callback(err)
			}
		)
	}

	createBlogTable() {
		const sql = `
			CREATE TABLE IF NOT EXISTS blog (
			id integer PRIMARY KEY, 
			title text NOT NULL, 
			body text NOT NULL,
			created_by integer NOT NULL)
		`
		return this.db.run(sql);
	}

	selectAllBlog(callback) {
		return this.db.all(`SELECT * FROM blog`, function(err,rows){
			callback(err,rows)
		})
	}

	insertBlog(blog, callback) {
		return this.db.run(
			'INSERT INTO blog (title,body,created_by) VALUES (?,?,?)',
			blog, (err) => {
				callback(err)
			}
		)
	}

	updateBlog(blog_id, data, callback) {
		return this.db.run(
			`UPDATE blog SET title = ?, body = ?) where id = ${blog_id}`,
			data, (err) => {
				callback(err)
			}
		)
	}

	deleteBlog(blog_id, callback) {
		return this.db.run(
			'DELETE FROM blog where id = ?', blog_id, (err) => {
				callback(err)
			}
		)
	}
}

module.exports = Db