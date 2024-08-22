
from flask import Flask, render_template, request, redirect, url_for
from pymongo import MongoClient
from dotenv import load_dotenv
import os
from bson.objectid import ObjectId

def to_do_list():

	app = Flask(__name__)

	# Conectar a la base de datos
	cliente = MongoClient(os.getenv("CLAVE_MONGO"))
	app.db = cliente["TODOLIST"]
	coleccion = app.db["Tareas"]

	@app.route("/")
	def index():
		tareas = list(coleccion.find())
		tareas_pendientes = sum(1 for tarea in tareas if not tarea.get("Completada"))
		tareas_completas = len(tareas) - tareas_pendientes
		
		return render_template("index.html", tareas = tareas, tareas_pendientes = tareas_pendientes, 
			tareas_completas = tareas_completas)

	@app.route("/Guardar_Tarea", methods = ["POST"])
	def guardar_tarea():
		tarea = request.form.get("tarea")
		if tarea:
			coleccion.insert_one({"Nombre": tarea, "Completada": False})
		
		return redirect(url_for("index"))

	@app.route("/Toggle_Tarea/<id>")
	def toggle_tarea(id):
		tarea = coleccion.find_one({"_id": ObjectId(id)})
		if tarea:
			coleccion.update_one({"_id": ObjectId(id)}, {"$set": {"Completada": not tarea["Completada"]}})
		
		return redirect(url_for("index"))

	@app.route("/Borrar_Tarea/<id>")
	def borrar_tarea(id):
		coleccion.delete_one({"_id": ObjectId(id)})
		
		return redirect(url_for("index"))

	@app.errorhandler(404)
	def error_404(e):
	    return render_template("404.html"), 404

	return app

if __name__ == "__main__":
	app = to_do_list()
	app.run()