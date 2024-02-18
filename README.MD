## Proyecto Final JavaScript - CoderHouse

Alumno: Daniel Díaz

Comision: 49845

Profesor: Jonathan Cruz

Tutores: Matías Aguilera, Igna Borraz, Jorge Mendez

## Sobre el proyecto:

Se trata de un simulador de cajero automatico del tipo ATM.

## Modo de uso:

	- Clonar el repo al medio local
	- Utilizar http-server para efectuar las pruebas
	- Seleccionar la opcion "ingresar sin tarjeta"
	- Ingresar los datos solicitados
	- se contará con un saldo inicial de $1000
	- se pueden realizar extracciones, depositos, consulta de saldo, ver ultimos movimientos y realizar pagos de servicios
	- El LocalStorage se utiliza para la persistencia de datos
	- Al actualizar la pagina o cerrarla y volver a abrir los datos ingresados y las operaciones realizadas persisten.
	- Seleccionar la opcion "Finalizar Sesion" para cerrar la sesion, esto limpiará todos los datos del LocalStorage

## Rubricas de entrega:

  -Objetos y Arrays. Métodos de Arrays.
  
	-El código hace uso de objetos para representar clientes y sus datos, así como de arrays para almacenar el historial de transacciones.
	Se utilizan métodos de arrays como push para agregar elementos al historial de transacciones.
  
  -Funciones y condicionales.
  
	-Se emplean numerosas funciones para modularizar el código y realizar diversas tareas, como iniciar sesión, consultar saldo, realizar retiros y depósitos, entre otras.
	Hay condicionales para validar la entrada del usuario, como verificar si el nombre y apellido son válidos, así como el número de DNI.
  
  -Generación del DOM de forma dinámica. Eventos.
  
	-El DOM se genera de forma dinámica en función de las acciones del usuario, mostrando diferentes pantallas y elementos según el flujo de la aplicación.
	Se manejan eventos como clics en botones para realizar acciones como consultar saldo, realizar retiros, depositar, entre otras.

  -Sintaxis avanzada.
  
	-Se hace uso de características avanzadas de JavaScript como template strings, destructuring, y métodos de objetos (getElementById, appendChild, etc.).

  -Al menos una librería de uso relevante para el proyecto.
  
	-El script modifica el DOM para mostrar elementos como formularios, mensajes de resultado y el historial de transacciones. También detecta eventos de usuario, como clics en botones, para ejecutar acciones correspondientes.

-Manejo de promesas con fetch. 
  
	-Se utilizan promesas en la funcion de pago de servicios

-Carga de datos desde un JSON local o desde una API externa.
  
	-Se utiliza el archivo facturas.json para almacenar datos de servicios impagos que son utilizados en la funcion de pago de servicios.