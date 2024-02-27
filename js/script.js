// Definimos saldo inicial
let saldo = 1000;
// Se define array historial de transacciones vacío
let historialTransacciones = [];
// Se define objeto cliente
let cliente = null;

//--------------------------------------------------------------------------------
// Funciones para fecha y hora actuales para mostrar en el historial y en la búsqueda, se agrega cero antes de cada dígito de ser necesario
//--------------------------------------------------------------------------------

function obtenerFechaHoraActual() {
    const fechaHora = new Date();
    const dia = agregarCeroAntes(fechaHora.getDate());
    const mes = agregarCeroAntes(fechaHora.getMonth() + 1);
    const anio = fechaHora.getFullYear();
    const horas = agregarCeroAntes(fechaHora.getHours());
    const minutos = agregarCeroAntes(fechaHora.getMinutes());
    const segundos = agregarCeroAntes(fechaHora.getSeconds());
    return `${dia}/${mes}/${anio} | ${horas}:${minutos}:${segundos}`;
}

function agregarCeroAntes(numero) {
    return numero < 10 ? `0${numero}` : numero;
}

function mostrarSubMenuTipos() {
    return prompt("Tipos de transacciones:\n1. Retiro\n2. Depósito");
}

//--------------------------------------------------------------------------------
//Bloque de funcion display de pantalla de ingreso o login
//--------------------------------------------------------------------------------

function mostrarPantallaIngreso() {
    ocultarTodosLosElementos('pantallaIngreso');
    mostrarElemento('pantallaIngreso');
}



//--------------------------------------------------------------------------------
//Bloque de funcion de inicio de sesion
//--------------------------------------------------------------------------------

function iniciarSesion() {
    let nombre = document.getElementById('nombreInput').value;
    let apellido = document.getElementById('apellidoInput').value;
    let dni = document.getElementById('dniInput').value;

    if (!esNombreValido(nombre)) {
        mostrarMensaje("Ingrese un nombre válido (solo letras).", 'error');
        return;
    }

    if (!esNombreValido(apellido)) {
        mostrarMensaje("Ingrese un apellido válido (solo letras).", 'error');
        return;
    }

    if (!esNumeroDeCuentaValido(dni)) {
        mostrarMensaje("Ingrese un número de DNI válido (8 dígitos).", 'error');
        return;
    }

    // Simulación de autenticación del cliente (deberia ser mejor en una app real jeje)
    // Por ahora, vamos a simular que el proceso fue exitoso.
    cliente = {
        nombre: nombre,
        apellido: apellido,
        dni: dni,
        saldo: saldo, // Se agrega el saldo al objeto del cliente
        historialTransacciones: historialTransacciones // Se agrega el historial de transacciones al objeto del cliente
    };

    // Almacenar los datos del cliente en el almacenamiento local
    guardarDatosClienteEnLocalStorage();

    mostrarMenuPrincipal();
}

//--------------------------------------------------------------------------------
//Bloque de menú ppal
//--------------------------------------------------------------------------------

function mostrarMenuPrincipal() {
    ocultarTodosLosElementos('menuPrincipal');
    mostrarElemento('menuPrincipal');

    document.getElementById('menuPrincipal').innerHTML = `
        <h2>Bienvenido, ${cliente.nombre} ${cliente.apellido} (${cliente.dni})</h2>
        <button onclick="consultarSaldo()">Consultar Saldo</button>
        <button onclick="retirarEfectivo()">Retirar Efectivo</button>
        <button onclick="depositar()">Depositar</button>
        <button onclick="verHistorial()">Ver Últimos Movimientos</button>
        <button onclick="mostrarPantallaPagoServicios()">Pagar Servicios</button>
        <button onclick="finalizarSesion()">Finalizar Sesión</button>`;
}

//--------------------------------------------------------------------------------
//Bloque de funcion de consulta de saldo
//--------------------------------------------------------------------------------

function consultarSaldo() {
    ocultarTodosLosElementos('saldo');
    mostrarElemento('saldo');

    let saldoElement = document.getElementById('saldo');
    saldoElement.innerHTML = `<h2>Su saldo es:</h2><p>$${cliente.saldo}</p>`;

    // Agrega un botón para regresar al menú principal
    saldoElement.innerHTML += '<button onclick="regresarMenuPrincipal()">Regresar al menú</button>';
}
//--------------------------------------------------------------------------------
//Bloque de funcion de retiro de efvo
//--------------------------------------------------------------------------------

function retirarEfectivo() {
    ocultarTodosLosElementos('retiro');
    mostrarElemento('retiro');

    let retiroElement = document.getElementById('retiro');
    retiroElement.innerHTML = ''; // Limpiamos el contenido previo

    let h2 = document.createElement('h2');
    h2.textContent = 'Retirar Efectivo';
    retiroElement.appendChild(h2);

    let montoRetiroInput = document.createElement('input');
    montoRetiroInput.type = 'number';
    montoRetiroInput.id = 'montoRetiroInput';
    montoRetiroInput.placeholder = 'Ingrese el monto';
    retiroElement.appendChild(montoRetiroInput);

    // Contenedor para los botones
    let botonesContainer = document.createElement('div');
    botonesContainer.className = 'botones-container';

    let btnRetirar = document.createElement('button');
    btnRetirar.textContent = 'Retirar';
    btnRetirar.onclick = realizarRetiro;
    botonesContainer.appendChild(btnRetirar);

    let btnCancelar = document.createElement('button');
    btnCancelar.textContent = 'Cancelar';
    btnCancelar.onclick = regresarMenuPrincipal;
    botonesContainer.appendChild(btnCancelar);

    retiroElement.appendChild(botonesContainer);
}

function realizarRetiro() {
    let montoRetiroInput = document.getElementById('montoRetiroInput');
    let monto = parseFloat(montoRetiroInput.value);

    if (isNaN(monto) || monto <= 0) {
        mostrarMensaje("Ingrese un monto válido.", 'error');
    } else if (monto > cliente.saldo) { // Cambio de 'saldo' a 'cliente.saldo'
        mostrarMensaje("Fondos insuficientes.", 'error');
    } else {
        cliente.saldo -= monto; // Actualización de 'saldo' a 'cliente.saldo'
        registrarTransaccion("Retiro", -monto);
        guardarDatosClienteEnLocalStorage(); // Guardar el cliente actualizado en el almacenamiento local
        mostrarMensaje(`Retiro exitoso. Nuevo saldo: $${cliente.saldo}`, 'success'); // Actualización de 'saldo' a 'cliente.saldo'
        regresarMenuPrincipal();
        guardarHistorialTransaccionesEnLocalStorage(); // Guardar historial de transacciones en el almacenamiento local
    }
}


//--------------------------------------------------------------------------------
//Bloque de funcion de deposito
//--------------------------------------------------------------------------------
function depositar() {
    ocultarTodosLosElementos('deposito');
    mostrarElemento('deposito');

    let depositoElement = document.getElementById('deposito');
    depositoElement.innerHTML = ''; // Limpiamos el contenido previo

    let h2 = document.createElement('h2');
    h2.textContent = 'Depositar';
    depositoElement.appendChild(h2);

    let montoDepositoInput = document.createElement('input');
    montoDepositoInput.type = 'number';
    montoDepositoInput.id = 'montoDepositoInput';
    montoDepositoInput.placeholder = 'Ingrese el monto';
    depositoElement.appendChild(montoDepositoInput);

    // Contenedor para los botones
    let botonesContainer = document.createElement('div');
    botonesContainer.className = 'botones-container';

    let btnDepositar = document.createElement('button');
    btnDepositar.textContent = 'Depositar';
    btnDepositar.onclick = realizarDeposito;
    botonesContainer.appendChild(btnDepositar);

    let btnCancelar = document.createElement('button');
    btnCancelar.textContent = 'Cancelar';
    btnCancelar.onclick = regresarMenuPrincipal;
    botonesContainer.appendChild(btnCancelar);

    depositoElement.appendChild(botonesContainer);
}

function realizarDeposito() {
    let montoDepositoInput = document.getElementById('montoDepositoInput');
    let monto = parseFloat(montoDepositoInput.value);

    if (isNaN(monto) || monto <= 0) {
        mostrarMensaje("Ingrese un monto válido.", 'error');
    } else {
        cliente.saldo += monto; // Actualización de 'saldo' a 'cliente.saldo'
        registrarTransaccion("Depósito", monto);
        mostrarMensaje(`Depósito exitoso. Nuevo saldo: $${cliente.saldo}`, 'success'); // Actualización de 'saldo' a 'cliente.saldo'
        regresarMenuPrincipal();
        guardarHistorialTransaccionesEnLocalStorage(); // Guardar historial de transacciones en el almacenamiento local
    }
}

//--------------------------------------------------------------------------------
//Bloque de Ultimos Movimientos
//--------------------------------------------------------------------------------

function verHistorial() {
    ocultarTodosLosElementos('historial');
    mostrarElemento('historial');

    let historialElement = document.getElementById('historial');
    historialElement.innerHTML = '<h2>Historial de Transacciones</h2>';

    // Crear el contenedor con desplazamiento
    let historialContainer = document.createElement('div');
    historialContainer.id = 'historialContainer';
    historialContainer.style.maxHeight = '150px'; // Puedes ajustar según tus preferencias
    historialContainer.style.overflowY = 'auto';

    historialElement.appendChild(historialContainer);

    if (historialTransacciones.length === 0) {
        historialContainer.innerHTML += '<p>No hay transacciones registradas.</p>';
    } else {
        const totalMovimientos = historialTransacciones.length;

        for (let i = 0; i < totalMovimientos; i++) {
            const fechaHora = historialTransacciones[i].fechaHora;
            const tipoTransaccion = historialTransacciones[i].tipo;
            const monto = historialTransacciones[i].monto;

            historialContainer.innerHTML += `<p>${fechaHora} | ${tipoTransaccion} | $${monto}</p>`;
        }
    }

    // Crear el botón de regreso al menú principal
    let btnRegresarMenu = document.createElement('button');
    btnRegresarMenu.textContent = 'Regresar al Menú';
    btnRegresarMenu.onclick = regresarMenuPrincipal;
    historialElement.appendChild(btnRegresarMenu);
}

//--------------------------------------------------------------------------------
//Bloque de Finalizar sesión
//--------------------------------------------------------------------------------

function finalizarSesion() {
    // Llamada para limpiar los datos del cliente en localStorage
    limpiarDatosClienteDelLocalStorage();
    // Restablecer variables globales a sus valores predeterminados
    saldo = 1000;
    historialTransacciones = [];
    mostrarDespedida();
}

function mostrarDespedida() {
    ocultarTodosLosElementos('despedida');
    mostrarElemento('despedida');
}

// Agrega una función para regresar al menú de ingreso sin tarjeta desde la pantalla de despedida
function regresarMenuIngresoSinTarjeta() {
    ocultarElemento('despedida');
    mostrarElemento('app');
}

//--------------------------------------------------------------------------------
// Promesa de uso de facturas
//--------------------------------------------------------------------------------

fetch('facturas.json')
  .then(response => response.json())
  .then(data => {
    // Aquí trabajaremos con los datos obtenidos del archivo JSON
    // Por ejemplo, podríamos mostrar las facturas en la consola
    console.log('Facturas de servicios:');
    data.forEach(factura => {
      console.log(`ID: ${factura.id}, Tipo: ${factura.tipo}, Monto: $${factura.monto}, Fecha: ${factura.fecha}, Pagado: ${factura.pagado ? 'Sí' : 'No'}`);
    });
  })
  .catch(error => console.error('Error al cargar el archivo JSON:', error));

//--------------------------------------------------------------------------------
// Función para mostrar pantalla de pago de servicios
//--------------------------------------------------------------------------------

function mostrarPantallaPagoServicios() {
    ocultarTodosLosElementos('pagoServicios');

    // Mostramos la pantalla de pago de servicios
    mostrarElemento('pagoServicios');

    // Cargar y mostrar las facturas de servicios
    cargarFacturasDeServicios();
    
    // Limpiar los botones anteriores
    limpiarBotonesPagoServicios();
    
    // Agregar botón de pagar servicios
    const botonPagar = document.createElement('button');
    botonPagar.textContent = 'Pagar Servicios Seleccionados';
    botonPagar.onclick = pagarServicios;
    document.getElementById('pagoServicios').appendChild(botonPagar);

    // Agregar botón de cancelar
    const botonCancelar = document.createElement('button');
    botonCancelar.textContent = 'Cancelar';
    botonCancelar.onclick = regresarMenuPrincipal;
    document.getElementById('pagoServicios').appendChild(botonCancelar);
}

function limpiarBotonesPagoServicios() {
    const pagoServicios = document.getElementById('pagoServicios');
    // Eliminar los botones anteriores si los hay
    const botonesAnteriores = pagoServicios.querySelectorAll('button');
    botonesAnteriores.forEach(boton => {
        boton.remove();
    });
}

function cargarFacturasDeServicios() {
    fetch('facturas.json')
        .then(response => response.json())
        .then(data => {
            const facturasContainer = document.getElementById('facturas-container');
            facturasContainer.innerHTML = '';

            // Mostrar cada factura en el contenedor
            data.forEach(factura => {
                if (!factura.pagado) {
                    const facturaElement = document.createElement('div');
                    facturaElement.classList.add('factura');

                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.value = factura.id;
                    facturaElement.appendChild(checkbox);

                    const label = document.createElement('label');
                    label.textContent = `ID: ${factura.id} | Tipo: ${factura.tipo} | Monto: $${factura.monto} | Fecha: ${factura.fecha}`;
                    facturaElement.appendChild(label);

                    facturasContainer.appendChild(facturaElement);
                }
            });
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));
}

async function pagarServicios() {
  try {
    // Obtener las facturas seleccionadas
    const facturasSeleccionadas = await obtenerFacturasSeleccionadas();

    // Calcular el total a pagar
    const totalFacturas = calcularTotalFacturas(facturasSeleccionadas);

    // Verificar si el saldo del cliente es suficiente
    if (totalFacturas > cliente.saldo) {
      // Mostrar un mensaje de error
      mostrarMensaje("Saldo en cuenta insuficiente para realizar el pago.", "error");
      return;
    }

    // Restar el total a pagar del saldo del cliente
    cliente.saldo -= totalFacturas;

    // Registrar el pago en el historial de transacciones
    registrarPagoEnHistorial(facturasSeleccionadas);

    // Mostrar un mensaje de éxito
    mostrarMensaje("Pago de servicios realizado correctamente.", "success");

    // Regresar al menú principal
    regresarMenuPrincipal();

    // Guardar los datos del cliente en Local Storage
    guardarDatosClienteEnLocalStorage();

    // Guardar el historial de transacciones en Local Storage
    guardarHistorialTransaccionesEnLocalStorage();
  } catch (error) {
    // Manejar cualquier error que ocurra
    console.error('Error al pagar servicios:', error);
    mostrarMensaje("Error al pagar servicios. Por favor, inténtalo de nuevo.", "error");
  }
}


async function obtenerFacturasSeleccionadas() {
  // Obtener todos los checkboxes seleccionados
  const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

  // Convertir la lista de checkboxes a un array
  const facturasSeleccionadas = Array.from(checkboxes).map(async checkbox => {
    // Obtener el ID de la factura
    const facturaId = parseInt(checkbox.value);

    // Obtener la factura por ID
    return await obtenerFacturaPorId(facturaId);
  });

  // Esperar a que todas las promesas se resuelvan y devolver el array de facturas
  return Promise.all(facturasSeleccionadas);
}


function calcularTotalFacturas(facturas) {
    // Reducir el array de facturas a un solo valor, sumando el monto de cada factura
    const total = facturas.reduce((acumulador, factura) => acumulador + parseInt(factura.monto), 0);
    return total;
}


async function obtenerFacturaPorId(id) {
    // Obtener la respuesta de la API
    const response = await fetch('facturas.json');

    // Convertir la respuesta a JSON
    const data = await response.json();

    // Encontrar la factura con el ID especificado
    return data.find(factura => factura.id === id);
}

function registrarPagoEnHistorial(facturas) {
    // Registrar cada factura como un pago en el historial
    facturas.forEach(factura => {
        // Tipo de transacción: "Pago de" + tipo de factura
        let tipo = `Pago de ${factura.tipo}`;

        // Monto de la transacción (negativo para indicar un pago)
        let monto = -factura.monto;

        // Registrar la transacción
        registrarTransaccion(tipo, monto);
    });
}


//--------------------------------------------------------------------------------
//Bloque de Funciones para local storage
//--------------------------------------------------------------------------------

// Función para guardar los datos del cliente en localStorage al iniciar sesión
function guardarDatosClienteEnLocalStorage() {
    localStorage.setItem('cliente', JSON.stringify(cliente));
}

// Función para guardar el historial de transacciones en localStorage
function guardarHistorialTransaccionesEnLocalStorage() {
    localStorage.setItem('historialTransacciones', JSON.stringify(historialTransacciones));
}

function recuperarDatosClienteDelLocalStorage() {
    const clienteGuardado = localStorage.getItem('cliente');
    if (clienteGuardado) {
        cliente = JSON.parse(clienteGuardado);
        // Mostrar el menú principal después de recuperar los datos del cliente
        mostrarMenuPrincipal();
        // Mostrar un mensaje de alerta
        mostrarMensaje("Datos del cliente recuperados del almacenamiento local.", 'success');
    } else {
        // Mostrar un mensaje de alerta si no se encuentran datos en el almacenamiento local
        mostrarMensaje("No se encontraron datos del cliente en el almacenamiento local.", 'error');
    }
}

function recuperarHistorialTransaccionesDelLocalStorage() {
    const historialGuardado = localStorage.getItem('historialTransacciones');
    if (historialGuardado) {
        historialTransacciones = JSON.parse(historialGuardado);
    }
}

// Función para limpiar los datos del cliente del localStorage al finalizar sesión
function limpiarDatosClienteDelLocalStorage() {
    localStorage.removeItem('cliente');
}

// Llamada para recuperar los datos del cliente y el historial de transacciones al cargar la página
recuperarDatosClienteDelLocalStorage();
recuperarHistorialTransaccionesDelLocalStorage();


//--------------------------------------------------------------------------------
//Bloques de funciones adicionales
//--------------------------------------------------------------------------------

function regresarMenuPrincipal() {
    ocultarTodosLosElementos();
    mostrarElemento('menuPrincipal');
}


function ocultarTodosLosElementos(excepcion) {
    const secciones = ['retiro', 'deposito', 'historial', 'saldo', 'menuPrincipal', 'app', 'pantallaIngreso', 'pagoServicios'];

    for (const seccion of secciones) {
        if (seccion !== excepcion) {
            ocultarElemento(seccion);
        }
    }
}


function registrarTransaccion(tipo, monto) {
    historialTransacciones.push({ tipo: tipo, monto: monto, fechaHora: obtenerFechaHoraActual() });
}

function esNombreValido(nombre) {
    return /^[a-zA-Z]+$/.test(nombre);
}

function esNumeroDeCuentaValido(numero) {
    return /^\d{8}$/.test(numero);
}

function ocultarElemento(elementoId) {
    let elemento = document.getElementById(elementoId);
    if (elemento) {
        elemento.style.display = 'none';
    }
}

function mostrarElemento(elementoId) {
    let elemento = document.getElementById(elementoId);
    if (elemento) {
        elemento.style.display = 'block';
    }
}


function mostrarMensaje(mensaje, tipo) {
    let mensajeElement = document.getElementById('mensaje');
    mensajeElement.innerHTML = mensaje;
    mensajeElement.classList.remove('hidden', 'success', 'error');
    mensajeElement.classList.add(tipo);

    setTimeout(() => {
        mensajeElement.classList.add('hidden');
    }, 3000);
}