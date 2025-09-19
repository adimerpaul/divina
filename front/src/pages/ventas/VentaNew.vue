<template>
  <q-page class="q-pa-xs">
    <q-card flat bordered >
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Ventas</div>
<!--        btn volver a tras-->
        <q-btn flat round dense icon="arrow_back" @click="$router.go(-1)" />
      </q-card-section>
      <q-card-section class="q-pa-none">
        <q-form @submit="clickDialogVenta">
          <div class="row">
            <div class="col-12 col-md-7 q-pa-xs">
              <q-input ref="inputBuscarProducto" v-model="productosSearch" outlined clearable label="Buscar producto" dense debounce="300" @update:modelValue="productosGet">
                <template v-slot:append>
                  <q-btn flat round dense icon="search" />
                </template>
              </q-input>
              <div class="flex flex-center">
                <q-pagination
                  size="xs"
                  v-model="pagination.page"
                  :max="Math.ceil(pagination.rowsNumber / pagination.rowsPerPage)"
                  color="primary"
                  @update:modelValue="productosGet"
                  boundary-numbers
                  max-pages="5"
                />
              </div>
<!--              <q-markup-table dense wrap-cells flat bordered>-->
<!--                <thead>-->
<!--                <tr>-->
<!--                  <th>ID</th>-->
<!--                  <th>Nombres</th>-->
<!--                  <th>Unidad</th>-->
<!--                  <th>Precio</th>-->
<!--                </tr>-->
<!--                </thead>-->
<!--                <tbody>-->
<!--                <tr v-for="(producto, index) in productos" :key="index" @click="addProducto(producto)">-->
<!--                  <td>-->
<!--                    {{ producto.id }}-->
<!--                  </td>-->
<!--                  <td style="padding: 0;margin: 0;" class="cursor-pointer">-->
<!--                    <div style="max-width: 190px;overflow: hidden;text-overflow: ellipsis;line-height: 0.9;">-->
<!--                      {{ $filters.textUpper( producto.nombre ) }}-->
<!--                    </div>-->
<!--                  </td>-->
<!--                  <td style="padding: 0;margin: 0;" class="cursor-pointer">-->
<!--                    <div style="max-width: 190px;overflow: hidden;text-overflow: ellipsis;line-height: 0.9;">-->
<!--                      {{ $filters.textUpper( producto.unidad ) }}-->
<!--                    </div>-->
<!--                  </td>-->
<!--                  <td class="cursor-pointer">-->
<!--                    <div style="max-width: 190px;overflow: hidden;text-overflow: ellipsis;line-height: 0.9;" class="text-right">-->
<!--                      {{( producto.precio ) }} Bs-->
<!--                    </div>-->
<!--                  </td>-->
<!--                </tr>-->
<!--                </tbody>-->
<!--              </q-markup-table>-->
              <div class="row">
                <template v-for="producto in productos">
                  <div class="col-6 col-md-2">
                    <q-card flat bordered class="cursor-pointer" @click="addProducto(producto)">
                      <q-img
                        :src="`${$url}../images/${producto.imagen}`"
                        class="q-mb-xs"
                        style="height: 120px;"
                        >
                        <div class="absolute-bottom text-center" style="padding: 0;margin: 0;">
                          <div style="max-width: 190px;line-height: 0.9;">
                            {{ $filters.textUpper( producto.nombre ) }}
                          </div>
                          <div style="display: flex;justify-content: space-between;">
                            <span>{{ producto.stock }}</span>
                            <span class="text-bold bg-orange text-black border">{{ producto.precio }} Bs</span>
                          </div>
                        </div>
                      </q-img>
                    </q-card>
                  </div>
                </template>
              </div>
<!--              <pre>{{productos}}</pre>-->
<!--              [-->
<!--              {-->
<!--              "id": 3284,-->
<!--              "nombre": "3-A OFTENO 0,1 % 5 ML",-->
<!--              "descripcion": "Antiinflamatorio no esteroideo",-->
<!--              "unidad": "SOLUCION OFTALMICA",-->
<!--              "precio": "1.00",-->
<!--              "stock": 10,-->
<!--              "stock_minimo": null,-->
<!--              "stock_maximo": null,-->
<!--              "imagen": "1706022402ALGIFEO GOTAS.jpg"-->
<!--              },-->
            </div>
            <div class="col-12 col-md-5 q-pa-xs">
              <div class="text-right flex items-center">
<!--                <q-btn icon="add_circle_outline" size="10px" @click="recoveryReceta" color="green" dense no-caps label="Recuperar receta" />-->
                <q-space />
                <q-btn icon="delete" size="10px" color="red" dense flat no-caps label="limpiar" @click="productosVentas = [];this.receta_id = null" />
              </div>
              <q-markup-table dense wrap-cells flat bordered>
                <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Subtotal</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(producto, index) in productosVentas" :key="index">
                  <td style="padding: 0;margin: 0;display: flex;align-items: center;">
                    <q-img :src="`${$url}../images/${producto.producto?.imagen}`" class="q-mb-xs" style="height: 35px;width: 35px;" />
                    <div style="max-width: 190px;overflow: hidden;text-overflow: ellipsis;line-height: 0.9;">
                      <q-icon name="delete" color="red" class="cursor-pointer" @click="productosVentas.splice(index, 1)" />
<!--                      {{producto.producto_id}}-->
                      {{ $filters.textUpper( producto.producto?.nombre ) }}
                    </div>
                  </td>
                  <td style="padding: 0;margin: 0;">
                    <input v-model="producto.cantidad" type="number" style="width: 50px;" />
                  </td>
                  <td style="padding: 0;margin: 0;">
                    <input v-model="producto.precio" type="number" style="width: 50px;" step="0.01">
                  </td>
                  <td  class="text-right">
                    {{ (producto.cantidad * producto.precio) }} Bs
                  </td>
                </tr>
                </tbody>
                <tfoot>
                <tr>
                  <td colspan="3" class="text-right">Total</td>
                  <td class="text-right text-bold">{{ (productosVentas.reduce((acc, producto) => acc + (producto.cantidad * producto.precio), 0)).toFixed(2) }} Bs</td>
                </tr>
                </tfoot>
              </q-markup-table>
<!--              btn realizar venta-->
              <q-btn label="Realizar venta" color="positive" class="full-width" no-caps :loading="loading" type="submit" icon="add_circle_outline" />
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
    <q-dialog v-model="ventaDialog">
      <q-card style="width: 650px;margin: 0 auto">
        <q-card-section class="q-pb-none row items-center">
          <div class="text-h6">Nueva venta</div>
          <q-space />
          <q-btn flat round dense icon="close" @click="ventaDialog = false" />
        </q-card-section>
        <q-card-section>
          <q-form @submit="submitVenta">
            <div class="row">
              <div class="col-12 col-md-3 q-pa-xs">
                <q-input v-model="venta.nit" outlined dense label="CI/NIT" @update:modelValue="searchCliente" />
              </div>
              <div class="col-12 col-md-3 q-pa-xs">
                <q-input v-model="venta.nombre" outlined dense label="Nombre" />
              </div>
              <div class="col-12 col-md-3 q-pa-xs">
<!--                <q-select v-model="venta.tipo_venta" outlined dense label="Tipo de venta" :options="['Interno', 'Externo']" />-->
              </div>
              <div class="col-12 col-md-3 q-pa-xs">
                <q-select v-model="venta.tipo_pago" outlined dense label="Tipo de pago" :options="['Efectivo', 'QR']" />
              </div>
              <div class="col-12 q-pa-xs">
                <q-markup-table dense wrap-cells flat bordered>
                  <thead>
                  <tr>
                    <th>ID</th>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Subtotal</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(producto, index) in productosVentas" >
                    <td>
                        {{ producto.producto_id }}
                    </td>
                    <td style="padding: 0;margin: 0;">
                      <div style="max-width: 190px;overflow: hidden;text-overflow: ellipsis;line-height: 0.9;">
                        {{ $filters.textUpper( producto.producto.nombre ) }}
                      </div>
                    </td>
                    <td style="padding: 0;margin: 0;">
                      {{ producto.cantidad }}
                    </td>
                    <td style="padding: 0;margin: 0;">
                      {{ producto.precio }} Bs
                    </td>
                    <td  class="text-right">
                      {{ (producto.cantidad * producto.precio) }} Bs
                    </td>
                  </tr>
                  </tbody>
                  <tfoot>
                  <tr>
                    <td colspan="3" class="text-right text-bold">Total</td>
                    <td class="text-right text-bold">{{ (productosVentas.reduce((acc, producto) => acc + (producto.cantidad * producto.precio), 0)).toFixed(2) }} Bs</td>
                  </tr>
                  <tr>
                    <td style="padding: 0;margin: 0;" colspan="3" class="text-right text-bold">Efectivo</td>
                    <td style="padding: 0;margin: 0;">
                      <div class="text-right">
                        <input v-model="efectivo" outlined dense label="Efectivo" style="width: 100px" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 0;margin: 0;" colspan="3" class="text-right text-bold">Cambio</td>
                    <td style="padding: 0;margin: 0;" class="text-right">
                      {{ cambio }}
                    </td>
                  </tr>
                  </tfoot>
                </q-markup-table>
              </div>
              <div class="col-12 q-pa-xs">
                <q-btn label="Realizar venta" color="positive" class="full-width" no-caps :loading="loading" type="submit" />
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <div id="myElement" class="hidden"></div>
  </q-page>
</template>

<script>
import {Imprimir} from "src/addons/Imprimir";

export default {
  name: "VentasNew",
  props: {
  },
  emits: ["pacienteGet"],
  data() {
    return {
      loading: false,
      paciente: {},
      ventaDialog: false,
      efectivo : '',
      venta: {
        nit: "0",
        nombre: "SN",
      },
      pagination: {
        page: 1,
        rowsPerPage: 24,
        rowsNumber: 0,
      },
      receta_id: null,
      recognition: null,
      activeField: null,
      productos: [],
      productosSearch: "",
      productosVentas: [],
      unidades: ['', 'capsulas', 'comprimidos', 'pastillas', 'ml', 'mg', 'otro'],
      vias: ['', 'oral', 'intramuscular', 'intravenosa', 'subcutánea', 'tópica', 'oftálmica', 'ótica', 'nasal', 'rectal', 'vaginal'],
      frecuencias: ['', 'cada 8 horas', 'cada 12 horas', 'cada 24 horas', 'cada 48 horas', 'cada 72 horas', 'cada 96 horas', 'cada 120 horas', 'cada 144 horas', 'cada 168 horas'],
      duraciones: ['', '3 dias', '5 dias', '7 dias', '10 dias', '14 dias', '21 dias', '28 dias', '30 dias', '60 dias', '90 dias', '120 dias', '180 dias', '240 dias', '365 dias'],
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.inputBuscarProducto?.focus();
    });
    this.productosGet();
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.lang = "es-ES"; // Idioma español
      this.recognition.interimResults = false;
      this.recognition.continuous = false;

      this.recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        if (this.activeField) {
          this.venta[this.activeField] += text; // Agrega texto al campo activo
        }
      };

      this.recognition.onerror = (event) => {
        console.error("Error en reconocimiento de voz:", event.error);
      };
    } else {
      console.error("El reconocimiento de voz no está soportado en este navegador");
    }
  },
  methods: {
    searchCliente() {
      this.loading = true;
      this.$axios.post("searchCliente", {
        nit: this.venta.nit,
      }).then((res) => {
        this.loading = false;
        if (res.data.nombre) {
          this.venta.nombre = res.data.nombre;
        }
      }).catch((error) => {
        this.loading = false;
        console.error(error);
      });
    },
    clickDialogVenta() {
      // veiritica  que haya productos en la venta
      if (this.productosVentas.length === 0) {
        this.$alert.error("Debe agregar al menos un producto a la venta");
        return;
      }
      this.ventaDialog = true;
      this.venta = {
        nit: "0",
        nombre: "SN",
        tipo_venta: "Interno",
        tipo_pago: "Efectivo",
      };
      this.efectivo = '';
    },
    recoveryReceta() {
      this.$alert.dialogPrompt('Numero de receta ', {
        title: 'Recuperar receta',
        cancel: true,
        persistent: true,
      }).onOk((data) => {
        this.receta_id = data;
        this.loading = true;
        this.$axios.get("receta/" + data).then((res) => {
          // console.log(res.data);
          const receta_detalles = res.data.receta_detalles;
          if (receta_detalles.length === 0) {
            this.$alert.error("Receta vacía");
            return;
          }
          this.productosVentas = receta_detalles
            .filter((receta_detalle) => receta_detalle.producto_id) // Filtra los elementos que tienen producto_id no vacío
            .map((receta_detalle) => {
              // console.log(receta_detalle);
              return {
                producto_id: receta_detalle.producto_id,
                cantidad: receta_detalle.cantidad,
                precio: receta_detalle.producto.precio,
                producto: receta_detalle.producto,
              };
            });
        }).catch((error) => {
          this.$alert.error("Receta no encontrada");
        }).finally(() => {
          this.loading = false;
        });
      });
    },
    addProducto(producto) {
      const find = this.productosVentas.find((p) => p.producto_id === producto.id);
      if (find) {
        find.cantidad += 1;
        return;
      }
      this.productosVentas.push({
        producto_id: producto.id,
        cantidad: 1,
        precio: producto.precio,
        producto,
      });
    },
    productosGet() {
      this.loading = true;
      this.$axios.get("productos", {
        params: {
          search: this.productosSearch,
          page: this.pagination.page,
          per_page: this.pagination.rowsPerPage,
        },
      }).then((res) => {
        this.productos = res.data.data;
        this.pagination.rowsNumber = res.data.total;
        this.pagination.page = res.data.current_page;
        this.loading = false;
        if (this.productos.length === 1 && this.productos[0].barra === this.productosSearch) {
          this.addProducto(this.productos[0]);
          this.productosSearch = "";
        }
      }).catch((error) => {
        this.loading = false;
        console.error(error);
      });
    },
    submitVenta() {
      this.loading = true;
      this.$axios.post("ventas", {
        ci: this.venta.nit,
        nombre: this.venta.nombre,
        productos: this.productosVentas,
        tipo_venta: this.venta.tipo_venta,
        tipo_pago: this.venta.tipo_pago,
        receta_id: this.receta_id,
      }).then((res) => {
        this.ventaDialog = false;
        this.loading = false;
        this.$alert.success("Venta realizada con éxito");
        this.productosVentas = [];
        Imprimir.nota(res.data);
        this.receta_id = null;
        this.$nextTick(() => {
          this.$refs.inputBuscarProducto?.focus();
        });
        this.productosGet()
      }).catch((error) => {
        this.loading = false;
        console.error(error);
      });
    },
    addVenta() {
      this.venta = {
        indicaciones: "",
        observaciones: "",
      };
      this.ventaDialog = true;
      this.productosVentas = [];
    },
    sendWhatsapp(venta) {
      const pdfUrl = `${this.$url}/../venta/${venta.id}/pdf`;
      const url = `https://api.whatsapp.com/send?phone=${this.paciente.telefono}&text=Hola ${this.paciente.nombre}, aquí tienes tu venta: ${pdfUrl}`;
      window
        .open(url, "_blank")
        .focus(); // Abre la conversación de WhatsApp en una nueva pestaña
    },
    printVenta(venta) {
      const pdfUrl = `${this.$url}/../venta/${venta.id}/pdf`;
      window.open(pdfUrl, '_blank'); // Abre el archivo PDF en una nueva pestaña
    },
    startRecognition(field) {
      if (this.recognition) {
        this.activeField = field; // Guarda el campo activo
        this.recognition.start(); // Inicia el reconocimiento de voz
      } else {
        this.$q.notify({
          color: "negative",
          message: "El reconocimiento de voz no está soportado en este navegador",
        });
      }
    },
  },
  computed: {
    cambio() {
      let cambio = this.efectivo - this.productosVentas.reduce((acc, producto) => acc + (producto.cantidad * producto.precio), 0);
      if (cambio < 0) {
        cambio = 0;
      }
      return cambio.toFixed(2);
    },
  },
};
</script>
