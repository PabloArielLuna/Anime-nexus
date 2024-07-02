#--------------------------------------------------------------------
# Instalar con pip install Flask
from flask import Flask, request, jsonify

# Instalar con pip install flask-cors
from flask_cors import CORS

# Instalar con pip install mysql-connector-python
import mysql.connector

# Si es necesario, pip install Werkzeug
from werkzeug.utils import secure_filename

# No es necesario instalar, es parte del sistema standard de Python
import os
import time
#--------------------------------------------------------------------

app = Flask(__name__)
CORS(app)  # Esto habilitará CORS para todas las rutas

class Catalogo:
    #----------------------------------------------------------------
    # Constructor de la clase
    def __init__(self, host, user, password, database):
        self.conn = mysql.connector.connect(
            host=host,
            user=user,
            password=password
        )
        self.cursor = self.conn.cursor()
        # Intentamos seleccionar la base de datos
        try:
            self.cursor.execute(f"USE {database}")
        except mysql.connector.Error as err:
            # Si la base de datos no existe, la creamos
            if err.errno == mysql.connector.errorcode.ER_BAD_DB_ERROR:
                self.cursor.execute(f"CREATE DATABASE {database}")
                self.conn.database = database
            else:
                raise err

        self.cursor.execute('''CREATE TABLE IF NOT EXISTS avatar (
            codigo INT AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(255) NOT NULL,
            descripcion VARCHAR(255) NOT NULL,
            edad INT NOT NULL,
            imagen_url VARCHAR(255),
            creador VARCHAR(255)NOT NULL)''')
        self.conn.commit()
        
        # Cerrar el cursor inicial y abrir uno nuevo con el parámetro dictionary=True
        self.cursor.close()
        self.cursor = self.conn.cursor(dictionary=True)
        
        
    # Agregar un avatar (create)
    def agregar_avatar(self, nombre, descripcion, edad, imagen, creador):
        
        sql = "INSERT INTO avatar (nombre,descripcion,edad,imagen_url,creador) VALUES (%s, %s, %s, %s, %s)"
        valores = (nombre, descripcion, edad, imagen, creador)
        self.cursor.execute(sql, valores)
        self.conn.commit()
        return self.cursor.lastrowid

    def consultar_avatar(self, codigo):
        # Consultamos un producto a partir de su código
        self.cursor.execute(f"SELECT * FROM avatar WHERE codigo = {codigo}")
        return self.cursor.fetchone()

    def modificar_avatar(self,codigo, nuevo_nombre, nueva_descripcion, nueva_edad, nueva_imagen, nuevo_creador):
        sql = "UPDATE avatar SET nombre = %s,descripcion = %s, edad = %s, imagen_url = %s, creador = %s WHERE codigo = %s"
        valores = (nuevo_nombre,nueva_descripcion, nueva_edad, nueva_imagen, nuevo_creador, codigo)
        self.cursor.execute(sql, valores)
        self.conn.commit()
        return self.cursor.rowcount > 0
    
    def listar_avatar(self):
        self.cursor.execute("SELECT * FROM avatar")
        avatar = self.cursor.fetchall()
        return avatar

    def eliminar_avatar(self, codigo):
        # Eliminamos un avatar de la tabla a partir de su código
        self.cursor.execute(f"DELETE FROM avatar WHERE codigo = {codigo}")
        self.conn.commit()
        return self.cursor.rowcount > 0
    
    def mostrar_avatar(self, codigo):
        # Mostramos los datos de un producto a partir de su código
        avatar = self.consultar_avatar(codigo)
        if avatar:
            print("-" * 40)
            print(f"Código.....: {avatar['codigo']}")
            print(f"Nombre: {avatar['nombre']}")
            print(f"Descripción: {avatar['descripcion']}")
            print(f"Edad...: {avatar['edad']}")
            print(f"Imagen.....: {avatar['imagen_url']}")
            print(f"Creador..: {avatar['creador']}")
            print("-" * 40)
        else:
            print("Avatar no encontrado.")

    

#--------------------------------------------------------------------
# Cuerpo del programa
#--------------------------------------------------------------------
# Crear una instancia de la clase Catalogo
catalogo = Catalogo(host='anadataengineer.mysql.pythonanywhere-services.com', user='anadataengineer', password='root12345', database='anadataengineer$nexus')

# Carpeta para guardar las imagenes
# ruta_destino = './static/imagenes/'
ruta_destino = '/home/anadataengineer/mysite/static/imagenes/'

@app.route("/avatar", methods=["GET"])
def listar_avatar():
    avatar = catalogo.listar_avatar()
    return jsonify(avatar)

@app.route("/avatar/<int:codigo>", methods=["GET"])
def mostrar_avatar(codigo):
    avatar = catalogo.consultar_avatar(codigo)
    if avatar:
        return jsonify(avatar)
    else:
        return "Avatar no encontrado", 404

@app.route("/avatar", methods=["POST"])
def agregar_avatar():
    #Recojo los datos del form
    nombre = request.form['nombre']
    descripcion = request.form['descripcion']
    edad = request.form['edad']
    imagen = request.files['imagen']
    creador = request.form['creador']  
    nombre_imagen = ""

    # Genero el nombre de la imagen
    nombre_imagen = secure_filename(imagen.filename)
    nombre_base, extension = os.path.splitext(nombre_imagen) 
    nombre_imagen = f"{nombre_base}_{int(time.time())}{extension}" 

    nuevo_codigo = catalogo.agregar_avatar(nombre,descripcion,edad,nombre_imagen,creador)
    if nuevo_codigo:    
        imagen.save(os.path.join(ruta_destino, nombre_imagen))
        return jsonify({"mensaje": "Avatar agregado correctamente.", "codigo": nuevo_codigo, "imagen": nombre_imagen}), 201
    else:
        return jsonify({"mensaje": "Error al agregar el avatar."}), 500

@app.route("/avatar/<int:codigo>", methods=["PUT"])
def modificar_avatar(codigo):
    #Se recuperan los nuevos datos del formulario
    nuevo_nombre = request.form.get("nombre")
    nueva_descripcion = request.form.get("descripcion")
    nueva_edad = request.form.get("edad")
    nuevo_creador = request.form.get("creador")
    
    # Verifica si se proporcionó una nueva imagen
    if 'imagen' in request.files:
        imagen = request.files['imagen']
        # Procesamiento de la imagen
        nombre_imagen = secure_filename(imagen.filename) 
        nombre_base, extension = os.path.splitext(nombre_imagen) 
        nombre_imagen = f"{nombre_base}_{int(time.time())}{extension}" 

        # Guardar la imagen en el servidor
        imagen.save(os.path.join(ruta_destino, nombre_imagen))
        
        # Busco el producto guardado
        avatar = catalogo.consultar_avatar(codigo)
        if avatar: # Si existe el producto...
            imagen_vieja = avatar["imagen_url"]
            # Armo la ruta a la imagen
            ruta_imagen = os.path.join(ruta_destino, imagen_vieja)

            # Y si existe la borro.
            if os.path.exists(ruta_imagen):
                os.remove(ruta_imagen)
    else:     
        avatar = catalogo.consultar_avatar(codigo)
        if avatar:
            nombre_imagen = avatar["imagen_url"]

# Se llama al método modificar_producto pasando el codigo del producto y los nuevos datos.
    if catalogo.modificar_avatar(codigo,nuevo_nombre, nueva_descripcion, nueva_edad,nombre_imagen, nuevo_creador):
        return jsonify({"mensaje": "Avatar modificado"}), 200
    else:
        return jsonify({"mensaje": "Avatar no encontrado"}), 403

@app.route("/avatar/<int:codigo>", methods=["DELETE"])
def eliminar_avatar(codigo):
    # Primero, obtiene la información del producto para encontrar la imagen
    avatar = catalogo.consultar_avatar(codigo)
    if avatar:
        # Eliminar la imagen asociada si existe
        ruta_imagen = os.path.join(ruta_destino, avatar['imagen_url'])
        if os.path.exists(ruta_imagen):
            os.remove(ruta_imagen)

        # Luego, elimina el producto del catálogo
        if catalogo.eliminar_avatar(codigo):
            return jsonify({"mensaje": "Avatar eliminado"}), 200
        else:
            return jsonify({"mensaje": "Error al eliminar el Avatar"}), 500
    else:
        return jsonify({"mensaje": "Avatar no encontrado"}), 404

if __name__ == "__main__":
    app.run(debug=True)