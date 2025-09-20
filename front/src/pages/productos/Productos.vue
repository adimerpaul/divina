<template>
  <q-page class="q-pa-xs">
<q-card flat bordered>
  <q-card-section class="q-pa-xs">
    <div class="text-right">
      <div>
        <q-btn color="primary" label="Actualizar" no-caps  icon="refresh" :loading="loading" @click="productosGet" />
        <q-btn color="primary" label="Descargar" no-caps  icon="fa-solid fa-file-excel" :loading="loading" @click="exportExcel" />
        <q-btn color="green" label="Nuevo" @click="productoNew" no-caps  icon="add_circle_outline" :loading="loading" />
      </div>
      <q-input v-model="filter" label="Buscar" dense outlined debounce="300" @update:modelValue="productosGet">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>
    <div class="flex flex-center">
      <q-pagination
        v-model="pagination.page"
        :max="Math.ceil(pagination.rowsNumber / pagination.rowsPerPage)"
        :rows-per-page-options="[10, 25, 50, 100]"
        :rows-per-page="pagination.rowsPerPage"
        :rows-number="pagination.rowsNumber"
        color="primary"
        @update:modelValue="productosGet"
        boundary-numbers
        max-pages="5"
        />
    </div>
    <q-markup-table dense wrap-cells>
      <thead>
        <tr>
          <th>Opciones</th>
          <th>Imagen</th>
          <th v-for="column in columns" :key="column.name" :class="column.align">
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="producto in productos" :key="producto.id">
          <td>
            <q-btn-dropdown label="Opciones" no-caps size="10px" dense color="primary">
              <q-list>
                <q-item clickable @click="productoEdit(producto)" v-close-popup>
                  <q-item-section avatar>
                    <q-icon name="edit" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Editar</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable @click="productoDelete(producto.id)" v-close-popup>
                  <q-item-section avatar>
                    <q-icon name="delete" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Eliminar</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable @click="verHistorial(producto)" v-close-popup>
                  <q-item-section avatar><q-icon name="history" /></q-item-section>
                  <q-item-section><q-item-label>Historial de compras</q-item-label></q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </td>
          <td>
<!--            {{`${$url}../images/${producto.imagen}`}}<br>-->
            <q-img
              :src="`${$url}../images/${producto.imagen}`"
              style="width: 50px; height: 50px"
              class="q-mr-sm" ></q-img>
          </td>
          <td>
            <div style="max-width: 150px; wrap-option: wrap;line-height: 0.9;">
              {{ producto.nombre }}
            </div>
          </td>
<!--          <td>-->
<!--            <div style="max-width: 200px; wrap-option: wrap;line-height: 0.9;">-->
<!--            {{ producto.descripcion }}-->
<!--            </div>-->
<!--          </td>-->
<!--          <td>-->
<!--            <div style="max-width: 80px; wrap-option: wrap;line-height: 0.9;">-->
<!--              {{ producto.unidad }}-->
<!--            </div>-->
<!--          </td>-->
          <td>
            <input
              v-model.number="producto.precio"
              type="number"
              step="0.01"
              min="0"
              style="width: 55px; text-align: right"
              @keyup="debouncedCambioPrecio(producto)"
            />
          </td>
<!--          <td>-->
<!--            <input-->
<!--              v-model.number="producto.stockAlmacen"-->
<!--              type="number"-->
<!--              step="1"-->
<!--              min="0"-->
<!--              style="width: 50px; text-align: right"-->
<!--              @keyup="debouncedCambioA(producto)"-->
<!--            />-->
<!--          </td>-->
<!--          <td>-->
<!--            <input-->
<!--              v-model.number="producto.stockChallgua"-->
<!--              type="number"-->
<!--              step="1"-->
<!--              min="0"-->
<!--              style="width: 50px; text-align: right"-->
<!--              @keyup="debouncedCambio1(producto)"-->
<!--            />-->
<!--          </td>-->
<!--          <td>-->
<!--            <input-->
<!--              v-model.number="producto.stockSocavon"-->
<!--              type="number"-->
<!--              step="1"-->
<!--              min="0"-->
<!--              style="width: 50px; text-align: right"-->
<!--              @keyup="debouncedCambio2(producto)"-->
<!--            />-->
<!--          </td>-->
<!--          <td>-->
<!--            <input-->
<!--              v-model.number="producto.stockCatalina"-->
<!--              type="number"-->
<!--              step="1"-->
<!--              min="0"-->
<!--              style="width: 50px; text-align: right"-->
<!--              @keyup="debouncedCambio3(producto)"-->
<!--            />-->
<!--          </td>-->
          <td>
            <input
              v-model.number="producto.barra"
              style="width: 150px; text-align: right"
              @keyup="debouncedCambioBarra(producto)"
            />
          </td>
          <td>{{ producto.stock }}</td>

        </tr>
      </tbody>
    </q-markup-table>
  </q-card-section>
</q-card>
<!--    <pre>{{ productos }}</pre>-->
<!--    [-->
<!--    {-->
<!--    "id": 3284,-->
<!--    "nombre": "3-A OFTENO 0,1 % 5 ML",-->
<!--    "descripcion": "Antiinflamatorio no esteroideo",-->
<!--    "unidad": "SOLUCION OFTALMICA",-->
<!--    "precio": 1,-->
<!--    "stock": null,-->
<!--    "stock_minimo": null,-->
<!--    "stock_maximo": null-->
<!--    },-->
    <q-dialog v-model="productoDialog" persistent>
      <q-card style="width: 400px;margin: 0 auto">
        <q-card-section class="q-pb-none row items-center">
          <div>
            {{ actionPeriodo }} producto
          </div>
          <q-space />
          <q-btn icon="close" flat round dense @click="productoDialog = false" />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-form @submit="producto.id ? productoPut() : productoPost()">
            <q-input v-model="producto.nombre" label="Nombre" dense outlined :rules="[val => !!val || 'Campo requerido']" />
            <q-input v-model="producto.descripcion" label="Descripción" dense outlined hint="" />
            <q-input v-model="producto.unidad" label="Unidad" dense outlined hint="" />
            <q-input v-model="producto.precio" label="Precio" dense outlined hint="" type="number" step="0.01" />
<!--            <q-input v-model="producto.stock" label="Stock" dense outlined hint="" />-->
            <q-input v-model="producto.barra" label="Código de barras" dense outlined hint="" />
<!--            <q-input v-model="producto.stock_minimo" label="Stock mínimo" dense outlined hint="" />-->
<!--            <q-input v-model="producto.stock_maximo" label="Stock máximo" dense outlined hint="" />-->
            <div class="text-right" >
              <q-btn color="negative" label="Cancelar" @click="productoDialog = false" no-caps :loading="loading" />
              <q-btn color="primary" label="Guardar" type="submit" no-caps :loading="loading" class="q-ml-sm" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="historialDialog" persistent>
      <q-card style="width: 800px;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Historial de Compras: {{ productoHistorialNombre }}</div>
          <q-space />
          <q-btn icon="close" flat round dense @click="historialDialog = false" />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-markup-table dense wrap-cells flat bordered>
            <thead>
            <tr>
              <th>#</th>
              <th>Fecha</th>
              <th>Lote</th>
              <th>Vencimiento</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Total</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, i) in historialCompras" :key="item.id">
              <td>{{ i + 1 }}</td>
              <td>{{ item.compra?.fecha }}</td>
              <td>{{ item.lote }}</td>
              <td>{{ item.fecha_vencimiento }}</td>
              <td>{{ item.stock }}</td>
              <td>{{ item.precio }}</td>
              <td>{{ item.total }}</td>
            </tr>
            </tbody>
          </q-markup-table>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import moment from 'moment'
import {Excel} from "src/addons/Excel";
import {debounce} from "quasar";
export default {
  name: 'ProductosPage',
  data() {
    return {
      productos: [],
      producto: {},
      productoDialog: false,
      loading: false,
      actionPeriodo: '',
      filter: '',
      pagination: {
        page: 1,
        rowsPerPage: 15,
        rowsNumber: 0,
      },
      columns: [
        { name: 'nombre', label: 'Nombre', align: 'left', field: 'nombre' },
        // { name: 'descripcion', label: 'Descripción', align: 'left', field: 'descripcion' },
        // { name: 'unidad', label: 'Unidad', align: 'left', field: 'unidad' },
        { name: 'precio', label: 'Precio', align: 'left', field: 'precio' },
        // { name: 'stockAlmacen', label: 'Cantidad Almacen', align: 'left', field: 'stockAlmacen' },
        // { name: 'stockChallgua', label: 'Cantidad Challgua', align: 'left', field: 'stockChallgua' },
        // { name: 'stockSocavon', label: 'Cantidad Socavon', align: 'left', field: 'stockSocavon' },
        // { name: 'stockCatalina', label: 'Cantidad Catalina', align: 'left', field: 'stockCatalina' },
        // { name: 'stock_minimo', label: 'Stock mínimo', align: 'left', field: 'stock_minimo' },
        // { name: 'stock_maximo', label: 'Stock máximo', align: 'left', field: 'stock_maximo' },
        { name: 'barra', label: 'Código de barras', align: 'left', field: 'barra' },
        { name: 'stock', label: 'Stock', align: 'left', field: 'stock' },
      ],
      historialDialog: false,
      historialCompras: [],
      productoHistorialNombre: '',
    }
  },
  mounted() {
    this.productosGet()
    // this.debouncedCambioPrecio = debounce(this.cambioPrecio, 500)
    // // this.debouncedCambioStock = debounce(this.cambioStock, 500)
    // this.debouncedCambioA = debounce(this.cambioStockA, 500)
    // this.debouncedCambio1 = debounce(this.cambioStock1, 500)
    // this.debouncedCambio2 = debounce(this.cambioStock2, 500)
    // this.debouncedCambio3 = debounce(this.cambioStock3, 500)
    this.debouncedCambioBarra = debounce(this.cambioBarra, 500)
  },
  methods: {
    cambioStockA(producto) {
      this.loading = true
      this.$axios.put('productos/' + producto.id, { stockAlmacen: producto.stockAlmacen }).then(res => {
        this.productosGet()
        this.$alert.success('Cantidad Almacen actualizada')
      }).catch(error => {
        this.$alert.error(error.response.data.message)
      }).finally(() => {
        this.loading = false
      })
    },
    cambioStock1(producto) {
      this.loading = true
      this.$axios.put('productos/' + producto.id, { stockChallgua: producto.stockChallgua }).then(res => {
        this.productosGet()
        this.$alert.success('Cantidad Sucursal 1 actualizada')
      }).catch(error => {
        this.$alert.error(error.response.data.message)
      }).finally(() => {
        this.loading = false
      })
    },
    cambioStock2(producto) {
      this.loading = true
      this.$axios.put('productos/' + producto.id, { stockSocavon: producto.stockSocavon }).then(res => {
        this.productosGet()
        this.$alert.success('Cantidad Sucursal 2 actualizada')
      }).catch(error => {
        this.$alert.error(error.response.data.message)
      }).finally(() => {
        this.loading = false
      })
    },
    cambioStock3(producto) {
      this.loading = true
      this.$axios.put('productos/' + producto.id, { stockCatalina: producto.stockCatalina }).then(res => {
        this.productosGet()
        this.$alert.success('Cantidad Sucursal 3 actualizada')
      }).catch(error => {
        this.$alert.error(error.response.data.message)
      }).finally(() => {
        this.loading = false
      })
    },
    verHistorial(producto) {
      this.loading = true;
      this.productoHistorialNombre = producto.nombre;
      this.$axios.get(`productos/${producto.id}/historial-compras`)
        .then(res => {
          this.historialCompras = res.data;
          this.historialDialog = true;
        }).catch(err => {
        this.$alert.error("Error al obtener historial");
      }).finally(() => {
        this.loading = false;
      });
    },
    cambioBarra(producto) {
      this.loading = true
      this.$axios.put('productos/' + producto.id, { barra: producto.barra }).then(res => {
        this.productosGet()
        this.$alert.success('Código de barras actualizado')
      }).catch(error => {
        this.$alert.error(error.response.data.message)
      }).finally(() => {
        this.loading = false
      })
    },
    cambioStock(producto) {
      this.loading = true
      this.$axios.put('productos/' + producto.id, { stock: producto.stock }).then(res => {
        this.productosGet()
        this.$alert.success('Stock actualizado')
      }).catch(error => {
        this.$alert.error(error.response.data.message)
      }).finally(() => {
        this.loading = false
      })
    },
    cambioPrecio(producto) {
      this.loading = true
      this.$axios.put('productos/' + producto.id, { precio: producto.precio }).then(res => {
        this.productosGet()
        this.$alert.success('Precio actualizado')
      }).catch(error => {
        this.$alert.error(error.response.data.message)
      }).finally(() => {
        this.loading = false
      })
    },
    exportExcel() {
      this.loading = true
      this.$axios.get('productosAll').then(res => {
        let data = [{
          columns: [
            {label: "Nombre", value: "nombre"},
            {label: "Descripción", value: "descripcion"},
            {label: "Unidad", value: "unidad"},
            {label: "Precio", value: "precio"},
            {label: "Stock", value: "stock"},
            {label: "Stock mínimo", value: "stock_minimo"},
            {label: "Stock máximo", value: "stock_maximo"},
          ],
          content: res.data
        }]
        Excel.export(data,'Productos')
      }).catch(error => {
        this.$alert.error(error.response.data.message)
      }).finally(() => {
        this.loading = false
      })
    },
    productoNew() {
      this.producto = {
        name: '',
        email: '',
        password: '',
        area_id: 1,
        productoname: '',
        cargo: '',
        role: 'Area',
      }
      this.actionPeriodo = 'Nuevo'
      this.productoDialog = true
    },
    productosGet() {
      this.loading = true
      this.$axios.get('productos', {
        params: {
          search: this.filter,
          page: this.pagination.page,
          per_page: this.pagination.rowsPerPage
        }
      }).then(res => {
        this.productos = res.data.data
        this.pagination.rowsNumber = res.data.total
      }).catch(error => {
        this.$alert.error(error.response?.data?.message || 'Error al cargar productos')
      }).finally(() => {
        this.loading = false
      })
    },
    gestionGet() {
      this.loading = true
      this.$axios.get('gestiones').then(res => {
        this.gestiones = res.data
        this.loading = false
      }).catch(error => {
        this.$alert.error(error.response.data.message)
        this.loading = false
      })
    },
    productoPost() {
      this.loading = true
      this.$axios.post('productos', this.producto).then(res => {
        this.productosGet()
        this.productoDialog = false
        this.$alert.success('Periodo creado')
      }).catch(error => {
        this.$alert.error(error.response.data.message)
      }).finally(() => {
        this.loading = false
      })
    },
    productoPut() {
      this.loading = true
      this.$axios.put('productos/' + this.producto.id, this.producto).then(res => {
        this.productosGet()
        this.productoDialog = false
        this.$alert.success('Periodo actualizado')
      }).catch(error => {
        this.$alert.error(error.response.data.message)
      }).finally(() => {
        this.loading = false
      })
    },
    productoEdit(producto) {
      this.producto = { ...producto }
      this.actionPeriodo = 'Editar'
      this.productoDialog = true
    },
    productoDelete(id) {
      this.$alert.dialog('¿Desea eliminar el producto?')
        .onOk(() => {
          this.loading = true
          this.$axios.delete('productos/' + id).then(res => {
            this.productosGet()
            this.$alert.success('Periodo eliminado')
          }).catch(error => {
            this.$alert.error(error.response.data.message)
          }).finally(() => {
            this.loading = false
          })
        })
    }
  }
}
</script>
