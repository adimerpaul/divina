import QRCode from 'qrcode'
import { useCounterStore } from 'stores/example-store'
import { Printd } from 'printd'
import conversor from 'conversor-numero-a-letras-es-ar'
import { Unidades } from 'numero-a-letras';

import moment from 'moment'
// const puppeteer = require('puppeteer')
// import puppeteer from 'puppeteer'

export class Imprimir {
  static numeroALetras(num) {
    num = parseInt(num);
    if (isNaN(num) || num < 0 || num > 1000000) return 'Número fuera de rango';

    const unidades = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
    const decenas = ['', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
    const especiales = {
      10: 'diez', 11: 'once', 12: 'doce', 13: 'trece', 14: 'catorce',
      15: 'quince', 16: 'dieciséis', 17: 'diecisiete', 18: 'dieciocho', 19: 'diecinueve'
    };
    const centenas = ['', 'cien', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];

    function convertirCentenas(n) {
      if (n < 10) return unidades[n];
      if (n >= 10 && n < 20) return especiales[n];
      if (n < 100) {
        const unidad = n % 10;
        return `${decenas[Math.floor(n / 10)]}${unidad > 0 ? ' y ' + unidades[unidad] : ''}`;
      }
      if (n === 100) return 'cien';
      const dec = n % 100;
      return `${centenas[Math.floor(n / 100)]}${dec > 0 ? ' ' + convertirCentenas(dec) : ''}`;
    }

    if (num === 1000000) return 'un millón';

    let miles = Math.floor(num / 1000);
    let resto = num % 1000;
    let milesTexto = miles > 0 ? (miles === 1 ? 'mil' : `${convertirCentenas(miles)} mil`) : '';
    let restoTexto = resto > 0 ? convertirCentenas(resto) : '';

    return (milesTexto + ' ' + restoTexto).trim();
  }
  static imprimirCaja (caja) {

  }
  static factura (factura) {
    return new Promise((resolve, reject) => {
      const ClaseConversor = conversor.conversorNumerosALetras
      const miConversor = new ClaseConversor()
      const a = miConversor.convertToText(parseInt(factura.montoTotal))
      const opts = {
        errorCorrectionLevel: 'M',
        type: 'png',
        quality: 0.95,
        width: 100,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFF'
        }
      }
      const env = useCounterStore().env
      QRCode.toDataURL(env.url2 + 'consulta/QR?nit=' + env.nit + '&cuf=' + factura.cuf + '&numero=' + factura.numeroFactura + '&t=2', opts).then(url => {
        let cadena = `${this.head()}
  <div style='padding-left: 0.5cm;padding-right: 0.5cm'>
      <div class='titulo'>FACTURA <br>CON DERECHO A CREDITO FISCAL</div>
      <div class='titulo2'>${env.razon} <br>
      Casa Matriz<br>
      No. Punto de Venta 0<br>
${env.direccion}<br>
Tel. ${env.telefono}<br>
Oruro</div>
<hr>
<div class='titulo'>NIT</div>
<div class='titulo2'>${env.nit}</div>
<div class='titulo'>FACTURA N°</div>
<div class='titulo2'>${factura.numeroFactura}</div>
<div class='titulo'>CÓD. AUTORIZACIÓN</div>
<div class='titulo2'>${factura.cuf}</div>
<hr>
<table>
<tr><td class='titder'>NOMBRE/RAZÓN SOCIAL:</td><td class='contenido'>${factura.client.nombreRazonSocial}</td>
</tr><tr><td class='titder'>NIT/CI/CEX:</td><td class='contenido'>${factura.client.numeroDocumento}</td></tr>
<tr><td class='titder'>COD. CLIENTE:</td ><td class='contenido'>${factura.client.id}</td></tr>
<tr><td class='titder'>FECHA DE EMISIÓN:</td><td class='contenido'>${factura.fechaEmision}</td></tr>
</table><hr><div class='titulo'>DETALLE</div>`
        factura.details.forEach(r => {
          cadena += `<div style='font-size: 12px'><b>${r.product_id} ${r.descripcion} </b></div>`
          cadena += `<div>${r.cantidad} ${parseFloat(r.precioUnitario).toFixed(2)} 0.00
                    <span style='float:right'>${parseFloat(r.subTotal).toFixed(2)}</span></div>`
        })
        cadena += `<hr>
      <table style='font-size: 8px;'>
      <tr><td class='titder' style='width: 60%'>SUBTOTAL Bs</td><td class='conte2'>${parseFloat(factura.montoTotal).toFixed(2)}</td></tr>
      <tr><td class='titder'>DESCUENTO Bs</td><td class='conte2'>0.00</td></tr>
      <tr><td class='titder'>TOTAL Bs</td><td class='conte2'>${parseFloat(factura.montoTotal).toFixed(2)}</td></tr>
      <tr><td class='titder'>MONTO GIFT CARD Bs</td ><td class='conte2'>0.00</td></tr>
      <tr><td class='titder'>MONTO A PAGAR Bs</td><td class='conte2'>${parseFloat(factura.montoTotal).toFixed(2)}</td></tr>
      <tr><td class='titder' style='font-size: 8px'>IMPORTE BASE CRÉDITO FISCAL Bs</td>
      <td class='conte2'>${parseFloat(factura.montoTotal).toFixed(2)}</td></tr>
      </table>
      <br>
      <div>Son ${a} ${((parseFloat(factura.montoTotal) - Math.floor(parseFloat(factura.montoTotal))) * 100).toFixed(2)} /100 Bolivianos</div><hr>
      <div class='titulo2' style='font-size: 9px'>
      ESTA FACTURA CONTRIBUYE AL DESARROLLO DEL PAÍS,<br>
      EL USO ILÍCITO SERÁ SANCIONADO PENALMENTE DE<br>
      ACUERDO A LEY<br><br>
      ${factura.leyenda} <br><br>
      “Este documento es la Representación Gráfica de un<br>
      Documento Fiscal Digital emitido en una modalidad de<br>
      facturación en línea”</div><br>
      <div style='display: flex;justify-content: center;'> <img  src="${url}" ></div></div>
      </div>
</body>
</html>`
        document.getElementById('myElement').innerHTML = cadena
        const d = new Printd()
        d.print(document.getElementById('myElement'))
        resolve(url)
      }).catch(err => {
        reject(err)
      })
    })
  }

  static nota (factura, imprimir = true) {
    console.log('factura', factura)
    return new Promise((resolve, reject) => {
      const a = this.numeroALetras(123)
      const opts = {
        errorCorrectionLevel: 'M',
        type: 'png',
        quality: 0.95,
        width: 100,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFF'
        }
      }
      const env = useCounterStore().env
      QRCode.toDataURL(`Fecha: ${factura.fecha_emision} Monto: ${parseFloat(factura.total).toFixed(2)}`, opts).then(url => {
        let producto = ''
        let cantidad = ''
        if (factura.producto) {
          // eslint-disable-next-line no-template-curly-in-string
          producto = '<tr><td class=\'titder\'>PRODUCTO:</td><td class=\'contenido\'>' + factura.producto + '</td></tr>'
        }
        if (factura.cantidad) {
          // eslint-disable-next-line no-template-curly-in-string
          cantidad = '<tr><td class=\'titder\'>CANTIDAD:</td><td class=\'contenido\'>' + factura.cantidad + '</td></tr>'
        }

        let cadena = `${this.head()}
  <!--div style='padding-left: 0.5cm;padding-right: 0.5cm'>
  <img src="logo.png" alt="logo" style="width: 100px; height: 50px; display: block; margin-left: auto; margin-right: auto;">
      <div class='titulo'>${factura.tipo_venta === 'EGRESO' ? 'NOTA DE EGRESO' : 'NOTA DE VENTA'}</div>
      <div class='titulo2'>${factura.tipo_comprobante} <br>
      Casa Matriz<br>
      No. Punto de Venta 0<br>
${'Calle Beni Nro. 60, entre 6 de Octubre y Potosí.'}<br>
Tel. ${'25247993 - 76148555'}<br>
Oruro</div!-->
<html lang="es">
<head>
    <meta charset="UTF-8">
    <style>
   .mono {
    font-family: Monospace,serif !important;
    font-size: 18px !important;
  }
</style>
<title></title>
</head>
<body>
<div class="mono">
<hr>
<table>
<tr><td class='titder'>ID:</td><td class='titder'>${factura.id }</td></tr>
<tr><td class='titder'>NOMBRE/RAZÓN SOCIAL:</td><td class='titder'>${factura.nombre }</td></tr>
<tr><!-- td class='titder'>NIT/CI/CEX:</td><td class='contenido'>${factura.client ? factura.client.nit : ''}</td --></tr>
<tr><td class='titder'>FECHA DE EMISIÓN:</td><td class='contenido'>${factura.fecha}</td></tr>
${producto}
${cantidad}
</table><hr><div class='titulo'>DETALLE</div>`
        factura.venta_detalles.forEach(r => {
          console.log('r', r)
          cadena += `<div style='font-size: 12px'><b> ${r.producto?.nombre} </b></div>`
          if (r.visible === 1) {
            cadena += `<div>
                    <span style='font-size: 18px;font-weight: bold'>
                        ${r.cantidad}
                    </span>
                    <span>
                    ${parseFloat(r.precio).toFixed(2)}
                    </span>

                    <span style='float:right'>
                        ${parseFloat(r.precio * r.cantidad).toFixed(2)}
                    </span>
                    </div>`
          } else {
            cadena += `<div>
                    <span style='font-size: 18px;font-weight: bold'>
                        ${r.cantidad}
                    </span>
                    <span>

                    </span>

                    <span style='float:right'>

                    </span>`
          }
        })
        cadena += `<hr>
<div>${factura.comentario === '' || factura.comentario === null  || factura.comentario === undefined ? '' : 'Comentario: ' + factura.comentario}</div>
      <table style='font-size: 8px;'>
      <tr><td class='titder' style='width: 60%'>SUBTOTAL Bs</td><td class='titder'>${parseFloat(factura.total).toFixed(2)}</td></tr>
<!--      <tr><td class='titder' style='width: 60%'>Descuento Bs</td><td class='titder'>${parseFloat(factura.descuento).toFixed(2)}</td></tr>-->
<!--      <tr><td class='titder' style='width: 60%'>TOTAL Bs</td><td class='titder'>${parseFloat(factura.total - factura.descuento).toFixed(2)}</td></tr>-->
      </table>
      <br>
      <div>Son ${a} ${((parseFloat(factura.total) - Math.floor(parseFloat(factura.total))) * 100).toFixed(2)} /100 Bolivianos</div><hr>
        <!--div style='display: flex;justify-content: center;'>
          <img  src="${url}" style="width: 75px; height: 75px; display: block; margin-left: auto; margin-right: auto;">
        </div--!>
      </div>
      </div>
</body>
</html>`
        // console.log('cadena', cadena)
        document.getElementById('myElement').innerHTML = cadena
        if (imprimir) {
          const d = new Printd()
          d.print(document.getElementById('myElement'))
        }
        resolve(url)
      }).catch(err => {
        reject(err)
      })
    })
  }

  static cotizacion (detalle, cliente, total, descuento, imprimir = true) {
    // console.log('detalle', detalle)
    // console.log('cliente', cliente)
    // console.log('total', total)
    // console.log('descuento', descuento)
    if (descuento === null || descuento === undefined || descuento === '') {
      descuento = 0
    }
    return new Promise((resolve, reject) => {
      const ClaseConversor = conversor.conversorNumerosALetras
      const miConversor = new ClaseConversor()
      const a = miConversor.convertToText(parseInt(total))
      const hoy = moment().format('YYYY-MM-DD')
      const opts = {
        errorCorrectionLevel: 'M',
        type: 'png',
        quality: 0.95,
        width: 100,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFF'
        }
      }
      const env = useCounterStore().env
      QRCode.toDataURL(`Fecha: ${hoy} Monto: ${parseFloat(total).toFixed(2)}`, opts).then(url => {
        let cadena = `${this.head()}
  <div style='padding-left: 0.5cm;padding-right: 0.5cm'>
  <img src="logo.png" alt="logo" style="width: 100px; height: 50px; display: block; margin-left: auto; margin-right: auto;">
      <div class='titulo'>${'COTIZACION'}</div>
      <div class='titulo2'>${env.razon} <br>
      Casa Matriz<br>
      No. Punto de Venta 0<br>
${env.direccion}<br>
Tel. ${env.telefono}<br>
Oruro</div>
<hr>
<table>
<tr><td class='titder'>NOMBRE/RAZÓN SOCIAL:</td><td class='contenido'>${cliente.nombre}</td>
<tr><td class='titder'>FECHA DE EMISIÓN:</td><td class='contenido'>${hoy}</td></tr>
</table><hr><div class='titulo'>DETALLE</div>`
        detalle.forEach(r => {
          cadena += `<div style='font-size: 12px'><b> ${r.nombre} </b></div>`
          cadena += `<div><span style='font-size: 18px;font-weight: bold'>${r.cantidadVenta}</span> ${parseFloat(r.precioVenta).toFixed(2)} 0.00
                    <span style='float:right'>${parseFloat(r.precioVenta * r.cantidadVenta).toFixed(2)}</span></div>`
        })
        cadena += `<hr>
<div>${cliente.comentario === '' || cliente.comentario === null || cliente.comentario === undefined ? '' : 'Comentario: ' + cliente.comentario}</div>
      <table style='font-size: 8px;'>
      <tr><td class='titder' style='width: 60%'>SUBTOTAL Bs</td><td class='conte2'>${parseFloat(total).toFixed(2)}</td></tr>
      <tr><td class='titder' style='width: 60%'>Descuento Bs</td><td class='conte2'>${parseFloat(descuento).toFixed(2)}</td></tr>
      <tr><td class='titder' style='width: 60%'>TOTAL Bs</td><td class='conte2'>${parseFloat(total - descuento).toFixed(2)}</td></tr>
      </table>
      <br>
      <div>Son ${a} ${((parseFloat(total) - Math.floor(parseFloat(total))) * 100).toFixed(2)} /100 Bolivianos</div><hr>
      <div style='display: flex;justify-content: center;'>
        <img  src="${url}" style="width: 75px; height: 75px; display: block; margin-left: auto; margin-right: auto;">
      </div></div>
      </div>
</body>
</html>`
        document.getElementById('myElement').innerHTML = cadena
        if (imprimir) {
          const d = new Printd()
          d.print(document.getElementById('myElement'))
        }
        resolve(url)
      }).catch(err => {
        reject(err)
      })
    })
  }

  static notaCompra (factura) {
    console.log('factura', factura)
    return new Promise((resolve, reject) => {
      const ClaseConversor = conversor.conversorNumerosALetras
      const miConversor = new ClaseConversor()
      const a = miConversor.convertToText(parseInt(factura.total))
      const opts = {
        errorCorrectionLevel: 'M',
        type: 'png',
        quality: 0.95,
        width: 100,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFF'
        }
      }
      const env = useCounterStore().env
      QRCode.toDataURL(`Fecha: ${factura.fecha_emision} Monto: ${parseFloat(factura.total).toFixed(2)}`, opts).then(async url => {
        let cadena = `${this.head()}
  <div style='padding-left: 0.5cm;padding-right: 0.5cm'>
  <img src="logo.png" alt="logo" style="width: 100px; height: 50px; display: block; margin-left: auto; margin-right: auto;">
      <div class='titulo'>${factura.tipo_venta === 'EGRESO' ? 'NOTA DE EGRESO' : 'NOTA DE COMPRA'}</div>
      <div class='titulo2'>${env.razon} <br>
      Casa Matriz<br>
      No. Punto de Venta 0<br>
${env.direccion}<br>
Tel. ${env.telefono}<br>
Oruro</div>
<hr>
<table>
<tr><td class='titder'>NOMBRE/RAZÓN SOCIAL:</td><td class='contenido'>${factura.client ? factura.client.nombre : ''}</td>
</tr><tr><td class='titder'>NIT/CI/CEX:</td><td class='contenido'>${factura.client ? factura.client.nit : ''}</td></tr>
<!--<tr><td class='titder'>FECHA DE EMISIÓN:</td><td class='contenido'>${factura.fecha_emision}</td></tr>-->
</table><hr><div class='titulo'>DETALLE</div>`
        factura.buy_details.forEach(r => {
          cadena += `<div style='font-size: 12px'><b>${r.nombre} </b></div>`
          cadena += `<div><span style='font-size: 14px;font-weight: bold'>${r.cantidad}</span> ${parseFloat(r.precio).toFixed(2)} 0.00
                    <span style='float:right'>${parseFloat(r.subtotal).toFixed(2)}</span></div>`
        })
        cadena += `<hr>
      <table style='font-size: 8px;'>
      <tr><td class='titder' style='width: 60%'>SUBTOTAL Bs</td><td class='conte2'>${parseFloat(factura.total).toFixed(2)}</td></tr>
      <tr><td class='titder' style='width: 60%'>Descuento Bs</td><td class='conte2'>${parseFloat(factura.descuento).toFixed(2)}</td></tr>
      <tr><td class='titder' style='width: 60%'>TOTAL Bs</td><td class='conte2'>${parseFloat(factura.total - factura.descuento).toFixed(2)}</td></tr>
      </table>
      <br>
      <div>Son ${a} ${((parseFloat(factura.total) - Math.floor(parseFloat(factura.total))) * 100).toFixed(2)} /100 Bolivianos</div><hr>
      <div style='display: flex;justify-content: center;'>
        <img  src="${url}" style="width: 75px; height: 75px; display: block; margin-left: auto; margin-right: auto;">
      </div></div>
      </div>
</body>
</html>`
        document.getElementById('myElement').innerHTML = cadena
        const d = new Printd()
        d.print(document.getElementById('myElement'))
        resolve(url)
      }).catch(err => {
        reject(err)
      })
    })
  }

  static reportTotal (sales, title) {
    const montoIngreso = sales.filter(r => r.tipoVenta === 'Ingreso').reduce((a, b) => a + b.montoTotal, 0)
    const montoEgreso = sales.filter(r => r.tipoVenta === 'Egreso').reduce((a, b) => a + b.montoTotal, 0)
    const montoTotal = montoIngreso - montoEgreso
    console.log('montoTotal', montoTotal)
    return new Promise((resolve, reject) => {
      const ClaseConversor = conversor.conversorNumerosALetras
      const miConversor = new ClaseConversor()
      const montoAbsoluto = Math.abs(montoTotal)
      const a = miConversor.convertToText(parseInt(montoAbsoluto))
      const opts = {
        errorCorrectionLevel: 'M',
        type: 'png',
        quality: 0.95,
        width: 100,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFF'
        }
      }
      const env = useCounterStore().env
      QRCode.toDataURL(` Monto: ${parseFloat(montoTotal).toFixed(2)}`, opts).then(url => {
        let cadena = `${this.head()}
  <div style='padding-left: 0.5cm;padding-right: 0.5cm'>
  <img src="logo.png" alt="logo" style="width: 100px; height: 100px; display: block; margin-left: auto; margin-right: auto;">
      <div class='titulo'>title</div>
      <div class='titulo2'>${env.razon} <br>
      Casa Matriz<br>
      No. Punto de Venta 0<br>
${env.direccion}<br>
Tel. ${env.telefono}<br>
Oruro</div>
<hr>
<table>
</table><hr><div class='titulo'>DETALLE</div>`
        sales.forEach(r => {
          cadena += `<div style='font-size: 12px'><b> ${r.user.name} </b></div>`
          cadena += `<div> ${parseFloat(r.montoTotal).toFixed(2)} ${r.tipoVenta}
          <span style='float:right'> ${r.tipoVenta === 'Egreso' ? '-' : ''} ${parseFloat(r.montoTotal).toFixed(2)}</span></div>`
        })
        cadena += `<hr>
      <table style='font-size: 8px;'>
      <tr><td class='titder' style='width: 60%'>SUBTOTAL Bs</td><td class='conte2'>${parseFloat(montoTotal).toFixed(2)}</td></tr>
      </table>
      <br>
      <div>Son ${a} ${((parseFloat(montoTotal) - Math.floor(parseFloat(montoTotal))) * 100).toFixed(2)} /100 Bolivianos</div><hr>
      <div style='display: flex;justify-content: center;'>
        <img  src="${url}" style="width: 75px; height: 75px; display: block; margin-left: auto; margin-right: auto;">
      </div></div>
      </div>
</body>
</html>`
        document.getElementById('myElement').innerHTML = cadena
        const d = new Printd()
        d.print(document.getElementById('myElement'))
        resolve(url)
      }).catch(err => {
        reject(err)
      })
    })
  }

  static reciboCompra (buy) {
    console.log('reciboCompra', buy)
    return new Promise((resolve, reject) => {
      const ClaseConversor = conversor.conversorNumerosALetras
      const miConversor = new ClaseConversor()
      const a = miConversor.convertToText(parseInt(buy.total))
      const opts = {
        errorCorrectionLevel: 'M',
        type: 'png',
        quality: 0.95,
        width: 100,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFF'
        }
      }
      const env = useCounterStore().env
      QRCode.toDataURL(`Fecha: ${buy.date} Monto: ${parseFloat(buy.total).toFixed(2)}`, opts).then(url => {
        let cadena = `${this.head()}
    <div style='padding-left: 0.5cm;padding-right: 0.5cm'>
    <img src="logo.png" alt="logo" style="width: 100px; height: 100px; display: block; margin-left: auto; margin-right: auto;">
      <div class='titulo'>RECIBO DE COMPRA</div>
      <div class='titulo2'>${env.razon} <br>
      Casa Matriz<br>
      No. Punto de Venta 0<br>
    ${env.direccion}<br>
    Tel. ${env.telefono}<br>
    Oruro</div>
    <hr>
    <table>
    </table><hr><div class='titulo'>DETALLE</div>`
        buy.compra_detalles.forEach(r => {
        cadena += `<div style='font-size: 12px'><b>${r.nombre} </b></div>`
        cadena += `<div>${r.cantidad} ${parseFloat(r.precio).toFixed(2)} 0.00
          <span style='float:right'>${parseFloat(r.total).toFixed(2)}</span></div>`
        })
        cadena += `<hr>
      <table style='font-size: 8px;'>
      <tr><td class='titder' style='width: 60%'>SUBTOTAL Bs</td><td class='conte2'>${parseFloat(buy.total).toFixed(2)}</td></tr>
      </table>
      <br>
      <div>Son ${a} ${((parseFloat(buy.total) - Math.floor(parseFloat(buy.total))) * 100).toFixed(2)} /100 Bolivianos</div><hr>
      <div style='display: flex;justify-content: center;'>
        <img  src="${url}" style="width: 75px; height: 75px; display: block; margin-left: auto; margin-right: auto;">
      </div></div>
      </div>
    </body>
    </html>`
        document.getElementById('myElement').innerHTML = cadena
        const d = new Printd()
        d.print(document.getElementById('myElement'))
        resolve(url)
      }).catch(err => {
        reject(err)
      })
    })
  }
  static reciboPedido (buy) {
    console.log('reciboPedido', buy)
    return new Promise((resolve, reject) => {
      const ClaseConversor = conversor.conversorNumerosALetras
      const miConversor = new ClaseConversor()
      const a = miConversor.convertToText(parseInt(buy.total))
      const opts = {
        errorCorrectionLevel: 'M',
        type: 'png',
        quality: 0.95,
        width: 100,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFF'
        }
      }
      const env = useCounterStore().env
      QRCode.toDataURL(`Fecha: ${buy.date} Monto: ${parseFloat(buy.total).toFixed(2)}`, opts).then(url => {
        let cadena = `${this.head()}
    <div style='padding-left: 0.5cm;padding-right: 0.5cm'>
    <img src="logo.png" alt="logo" style="width: 100px; height: 100px; display: block; margin-left: auto; margin-right: auto;">
      <div class='titulo'>RECIBO DE PEDIDO</div>
      <div class='titulo2'>${env.razon} <br>
      Casa Matriz<br>
      No. Punto de Venta 0<br>
    ${env.direccion}<br>
    Tel. ${env.telefono}<br>
    Oruro</div>
    <hr>
    <div style='display: flex;justify-content: space-between;'>
        <div class='titulo'>FECHA HORA</div>
        <div class='titulo2'>${buy.fecha} ${buy.hora}</div>
    </div>
    <div style='display: flex;justify-content: space-between;'>
        <div class='titulo'>ID</div>
        <div class='titulo2'>${buy.id}</div>
    </div>
    <hr>
    <div class='titulo'>DETALLE</div>`
        buy.detalles.forEach(r => {
          cadena += `<div style='font-size: 12px'><b>${r.producto?.nombre} </b></div>`
          cadena += `<div>${r.cantidad} ${parseFloat(r.cantidad).toFixed(2)} 0.00
          <span style='float:right'>${parseFloat(r.cantidad).toFixed(2)}</span></div>`
        })
        cadena += `<hr>
      <table style='font-size: 8px;'>
      <tr><td class='titder' style='width: 60%'>SUBTOTAL Bs</td><td class='conte2'>${parseFloat(buy.total).toFixed(2)}</td></tr>
      </table>
      <br>
      <div>Son ${a} ${((parseFloat(buy.total) - Math.floor(parseFloat(buy.total))) * 100).toFixed(2)} /100 Bolivianos</div><hr>
      <div style='display: flex;justify-content: center;'>
        <img  src="${url}" style="width: 75px; height: 75px; display: block; margin-left: auto; margin-right: auto;">
      </div></div>
      </div>
    </body>
    </html>`
        document.getElementById('myElement').innerHTML = cadena
        const d = new Printd()
        d.print(document.getElementById('myElement'))
        resolve(url)
      }).catch(err => {
        reject(err)
      })
    })
  }

  static reciboTranferencia (producto, de, ha, cantidad) {
    console.log('producto', producto, 'de', de, 'ha', ha, 'cantidad', cantidad)
    return new Promise((resolve, reject) => {
      const ClaseConversor = conversor.conversorNumerosALetras
      const miConversor = new ClaseConversor()
      const a = miConversor.convertToText(parseInt(cantidad))
      const opts = {
        errorCorrectionLevel: 'M',
        type: 'png',
        quality: 0.95,
        width: 100,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFF'
        }
      }
      const env = useCounterStore().env
      QRCode.toDataURL(`de: ${de} A: ${ha}`, opts).then(url => {
        let cadena = `${this.head()}
    <div style='padding-left: 0.5cm;padding-right: 0.5cm'>
    <img src="logo.png" alt="logo" style="width: 100px; height: 100px; display: block; margin-left: auto; margin-right: auto;">
      <div class='titulo'>RECIBO DE TRANSFERENCIA</div>
      <div class='titulo2'>${env.razon} <br>
      Casa Matriz<br>
      No. Punto de Venta 0<br>
    ${env.direccion}<br>
    Tel. ${env.telefono}<br>
    Oruro</div>
    <hr>
    <table>
    </table><hr><div class='titulo'>DETALLE</div>`
        cadena += `<div style='font-size: 12px'><b>Producto: ${producto} de Sucursal${de} a ${ha} </b></div>`
        cadena += `<hr>
      <table style='font-size: 8px;'>
      <tr><td class='titder' style='width: 60%'>CANTIDAD </td><td class='conte2'>${cantidad + ''}</td></tr>
      </table>
      <br>
      <div>Son ${a + ''} ${cantidad + ''} unidades</div><hr>
      <div style='display: flex;justify-content: center;'>
        <img  src="${url}" style="width: 75px; height: 75px; display: block; margin-left: auto; margin-right: auto;">
      </div></div>
      </div>
    </body>
    </html>`
        document.getElementById('myElement').innerHTML = cadena
        const d = new Printd()
        d.print(document.getElementById('myElement'))
        resolve(url)
      }).catch(err => {
        reject(err)
      })
    })
  }

  static head () {
    return `<html>
<style>
      .titulo{
      font-size: 12px;
      text-align: center;
      font-weight: bold;
      }
      .titulo2{
      font-size: 10px;
      text-align: center;
      }
            .titulo3{
      font-size: 10px;
      text-align: center;
      width:70%;
      }
            .contenido{
      font-size: 10px;
      text-align: left;
      }
      .conte2{
      font-size: 10px;
      text-align: right;
      }
      .titder{
      font-size: 12px;
      text-align: right;
      font-weight: bold;
      }
      hr{
  border-top: 1px dashed   ;
}
  table{
    width:100%
  }
  h1 {
    color: black;
    font-family: sans-serif;
  }
  </style>
<body>
<div style="width: 300px;">`
  }
}
