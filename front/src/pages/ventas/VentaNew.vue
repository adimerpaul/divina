<template>
  <q-page class="q-pa-xs">
    <q-card flat bordered >
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Ventas</div>
        <q-btn flat round dense icon="arrow_back" @click="$router.go(-1)" />
        <q-btn flat round dense icon="refresh" @click="productosGet" :loading="loading" />
        <q-space />
      </q-card-section>

      <q-card-section class="q-pa-none">
        <q-form @submit="clickDialogVenta">
          <div class="row">
            <!-- LISTA PRODUCTOS -->
            <div class="col-12 col-md-7 q-pa-xs">
              <q-input
                ref="inputBuscarProducto"
                v-model="productosSearch"
                outlined
                clearable
                label="Buscar producto"
                dense
                debounce="300"
                @update:modelValue="productosGet"
              >
                <template #append>
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

              <div class="row">
                <template v-for="producto in productos" :key="producto.id">
                  <div class="col-6 col-md-2">
                    <q-card
                      flat
                      bordered
                      class="cursor-pointer"
                      @click="openLoteDialog(producto)"
                    >
                      <q-img
                        :src="`${$url}../images/${producto.imagen}`"
                        class="q-mb-xs"
                        style="height: 120px;"
                      >
                        <div class="absolute-bottom text-center" style="padding: 0;margin: 0;">
                          <div style="max-width: 190px;line-height: 0.9;">
                            {{ $filters.textUpper(producto.nombre) }}
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
            </div>

            <!-- CARRITO / DETALLE DE VENTA -->
            <div class="col-12 col-md-5 q-pa-xs">
              <div class="text-right flex items-center">
                <q-space />
                <q-btn
                  icon="delete"
                  size="10px"
                  color="red"
                  dense flat no-caps
                  label="Limpiar"
                  @click="productosVentas = []; receta_id = null"
                />
              </div>

              <q-markup-table dense wrap-cells flat bordered>
                <thead>
                <tr>
                  <th>Producto</th>
                  <th>Lote</th>
                  <th>Vence</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Subtotal</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in productosVentas" :key="index">
                  <td style="padding:0;margin:0;display:flex;align-items:center;">
                    <q-img
                      :src="`${$url}../images/${item.producto?.imagen}`"
                      class="q-mb-xs"
                      style="height: 35px;width: 35px;"
                    />
                    <div style="max-width:190px;overflow:hidden;text-overflow:ellipsis;line-height:.9;">
                      <q-icon
                        name="delete"
                        color="red"
                        class="cursor-pointer"
                        @click="productosVentas.splice(index, 1)"
                      />
                      {{ $filters.textUpper(item.producto?.nombre) }}
                    </div>
                  </td>
                  <td>{{ item.lote || '—' }}</td>
                  <td>{{ item.fecha_vencimiento || '—' }}</td>
                  <td style="padding:0;margin:0;">
                    <input v-model.number="item.cantidad" type="number" style="width:60px;" min="1" />
                  </td>
                  <td style="padding:0;margin:0;">
                    <input v-model.number="item.precio" type="number" style="width:70px;" step="0.01" />
                  </td>
                  <td class="text-right">
                    {{ (Number(item.cantidad) * Number(item.precio)).toFixed(2) }} Bs
                  </td>
                </tr>
                </tbody>
                <tfoot>
                <tr>
                  <td colspan="5" class="text-right text-bold">Total</td>
                  <td class="text-right text-bold">
                    {{ totalVenta.toFixed(2) }} Bs
                  </td>
                </tr>
                </tfoot>
              </q-markup-table>

              <q-btn
                label="Realizar venta"
                color="positive"
                class="full-width"
                no-caps
                :loading="loading"
                type="submit"
                icon="add_circle_outline"
              />
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>

    <!-- DIALOGO CONFIRMAR VENTA -->
    <q-dialog v-model="ventaDialog">
      <q-card style="max-width: 750px; width: 90vw">
        <q-card-section class="q-pb-none row items-center">
          <div class="text-h6">Nueva venta</div>
          <q-space />
          <q-btn flat round dense icon="close" @click="ventaDialog = false" />
        </q-card-section>

        <q-card-section>
          <q-form @submit="submitVenta">
            <div class="row">
              <div class="col-12 col-md-3 q-pa-xs">
                <q-input v-model="venta.nit" outlined dense label="CI/NIT" @update:modelValue="searchCliente" :debounce="500"/>
              </div>
              <div class="col-12 col-md-3 q-pa-xs">
                <q-input v-model="venta.nombre" outlined dense label="Nombre" />
              </div>
              <div class="col-12 col-md-3 q-pa-xs">
                <q-input v-model="venta.email" outlined dense label="Email" />
              </div>
<!--              <div class="col-12 complemtno-->
              <div class="col-12 col-md-3 q-pa-xs">
                <q-input v-model="venta.complemento" outlined dense label="Complemento" />
              </div>
              <div class="col-12 col-md-3 q-pa-xs">
                <q-select v-model="venta.tipo_pago" outlined dense label="Tipo de pago" :options="['Efectivo', 'QR']"/>
              </div>
              <div class="col-12 col-md-6 q-pa-xs">
                <q-select
                  v-model="venta.codigoTipoDocumentoIdentidad"
                  outlined dense label="Tipo de documento"
                  :options="codigoTipoDocumentoIdentidades"
                  emit-value
                  map-options
                />
              </div>

              <div class="col-12 q-pa-xs">
                <q-markup-table dense wrap-cells flat bordered>
                  <thead>
                  <tr>
                    <th>ID</th>
                    <th>Producto</th>
                    <th>Lote</th>
                    <th>Vence</th>
                    <th>Cant.</th>
                    <th>Precio</th>
                    <th>Subtotal</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(item, index) in productosVentas" :key="'prev-'+index">
                    <td>{{ item.producto_id }}</td>
                    <td style="padding:0;margin:0;">
                      <div style="max-width:190px;overflow:hidden;text-overflow:ellipsis;line-height:.9;">
                        {{ $filters.textUpper(item.producto?.nombre || '') }}
                      </div>
                    </td>
                    <td>{{ item.lote || '—' }}</td>
                    <td>{{ item.fecha_vencimiento || '—' }}</td>
                    <td>{{ item.cantidad }}</td>
                    <td>{{ Number(item.precio).toFixed(2) }} Bs</td>
                    <td class="text-right">
                      {{ (Number(item.cantidad) * Number(item.precio)).toFixed(2) }} Bs
                    </td>
                  </tr>
                  </tbody>
                  <tfoot>
                  <tr>
                    <td colspan="6" class="text-right text-bold">Total</td>
                    <td class="text-right text-bold">{{ totalVenta.toFixed(2) }} Bs</td>
                  </tr>
                  <tr>
                    <td colspan="6" class="text-right text-bold">Efectivo</td>
                    <td class="text-right">
                      <input v-model.number="efectivo" type="number" step="0.01" style="width: 100px" />
                    </td>
                  </tr>
                  <tr>
                    <td colspan="6" class="text-right text-bold">Cambio</td>
                    <td class="text-right">{{ cambio }}</td>
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

    <!-- DIALOGO SELECCIONAR LOTE -->
    <q-dialog v-model="loteDialog" persistent>
      <q-card style="max-width: 700px; width: 90vw">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Seleccionar lote</div>
          <q-space />
          <q-btn flat round dense icon="close" @click="loteDialog = false" />
        </q-card-section>

        <q-card-section>
          <div class="q-mb-sm text-subtitle2">
            Producto: <b>{{ $filters.textUpper(loteProducto?.nombre || '') }}</b>
          </div>

          <q-markup-table dense flat bordered wrap-cells>
            <thead>
            <tr>
              <th>#</th>
              <th>Lote</th>
              <th>Vencimiento</th>
              <th>Disponible</th>
              <th>Precio venta</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            <tr v-if="lotesLoading">
              <td colspan="6" class="text-center">Cargando…</td>
            </tr>
            <tr v-for="(l, i) in lotes" :key="l.id">
              <td>{{ i+1 }}</td>
              <td>{{ l.lote || '—' }}</td>
              <td>{{ l.fecha_vencimiento || '—' }}</td>
              <td class="text-right">{{ l.disponible }}</td>
              <td class="text-right">{{ Number(l.precio_venta || 0).toFixed(2) }} Bs</td>
              <td>
                <q-btn size="xs" color="primary" flat no-caps label="Elegir" @click="onPickLote(l)" />
              </td>
            </tr>
            <tr v-if="!lotesLoading && lotes.length === 0">
              <td colspan="6" class="text-center text-negative">Sin lotes disponibles</td>
            </tr>
            </tbody>
          </q-markup-table>

          <div v-if="loteSelected" class="row q-col-gutter-sm q-mt-sm">
            <div class="col-12 col-md-4">
              <q-input
                v-model.number="loteCantidad"
                type="number"
                dense outlined
                label="Cantidad a vender"
                :min="1"
                :max="Number(loteSelected.disponible || 0)"
              />
            </div>
            <div class="col-12 col-md-4">
              <q-input
                v-model.number="lotePrecio"
                type="number"
                step="0.01"
                dense outlined
                label="Precio (editable)"
              />
            </div>
            <div class="col-12 col-md-4 flex items-end">
              <q-btn
                color="primary"
                icon="add_shopping_cart"
                label="Agregar a venta"
                no-caps
                @click="confirmarLote"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <div id="myElement" class="hidden"></div>
  </q-page>
</template>

<script>
import { Imprimir } from "src/addons/Imprimir";

export default {
  name: "VentasNew",
  data() {
    return {
      codigoTipoDocumentoIdentidades : [
        { value: 1, label: 'CI - CEDULA DE IDENTIDAD' },
        { value: 2, label: 'CEX - CED ULA DE IDENTIDAD DE EXTRANJERO' },
        { value: 5, label: 'NIT - NÚMERO DE IDENTIFICACIÓN TRIBUTARIA' },
        { value: 3, label: 'PAS - PASAPORTE' },
        { value: 4, label: 'OD - OTRO DOCUMENTO DE IDENTIDAD' },
      ],
      loading: false,
      ventaDialog: false,
      efectivo: '',
      venta: {
        nit: "0",
        nombre: "SN",
        codigoTipoDocumentoIdentidad: 1,
        tipo_venta: "Interno",
        tipo_pago: "Efectivo",
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

      // Lotes
      loteDialog: false,
      lotesLoading: false,
      lotes: [],
      loteSelected: null,
      loteCantidad: 1,
      lotePrecio: 0,
      loteProducto: null,
    };
  },

  mounted() {
    this.$nextTick(() => {
      this.$refs.inputBuscarProducto?.focus();
    });
    this.productosGet();

    // (Opcional) Voz
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.lang = "es-ES";
      this.recognition.interimResults = false;
      this.recognition.continuous = false;
      this.recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        if (this.activeField) this.venta[this.activeField] += text;
      };
      this.recognition.onerror = (event) => {
        console.error("Error en reconocimiento de voz:", event.error);
      };
    }
  },

  methods: {
    // ==== LOTES ====
    async openLoteDialog(producto) {
      this.loteProducto = producto;
      this.loteDialog = true;
      this.lotes = [];
      this.lotesLoading = true;
      try {
        const res = await this.$axios.get(`productos/${producto.id}/historial-compras-ventas`);
        this.lotes = res.data || [];
        // Si hay 1 solo lote, lo pre-seleccionamos:
        if (this.lotes.length === 1) {
          this.onPickLote(this.lotes[0]);
        }
      } catch (e) {
        console.error(e);
        this.$alert?.error?.('No se pudieron cargar los lotes') || this.$q.notify({ type:'negative', message:'No se pudieron cargar los lotes' });
        this.loteDialog = false;
      } finally {
        this.lotesLoading = false;
      }
    },

    onPickLote(lote) {
      this.loteSelected = lote;
      // precio por defecto: precio_venta del lote o, si no hay, el del producto
      this.lotePrecio = Number(lote?.precio_venta ?? this.loteProducto?.precio ?? 0);
      this.loteCantidad = 1;
    },

    confirmarLote() {
      if (!this.loteSelected) {
        this.$alert?.error?.('Selecciona un lote') || this.$q.notify({ type:'negative', message:'Selecciona un lote' });
        return;
      }
      const disp = Number(this.loteSelected.disponible || 0);
      const cant = Number(this.loteCantidad || 0);
      if (cant <= 0 || cant > disp) {
        this.$alert?.error?.('Cantidad inválida para el lote') || this.$q.notify({ type:'negative', message:'Cantidad inválida para el lote' });
        return;
      }
      const precio = Number(this.lotePrecio || 0);

      // Añadir línea con compra_detalle_id (lote)
      this.productosVentas.push({
        producto_id: this.loteProducto.id,
        cantidad: cant,
        precio: precio,
        producto: this.loteProducto,
        compra_detalle_id: this.loteSelected.id,
        lote: this.loteSelected.lote,
        fecha_vencimiento: this.loteSelected.fecha_vencimiento,
      });

      // Cerrar y limpiar
      this.loteDialog = false;
      this.loteSelected = null;
      this.loteProducto = null;
      this.loteCantidad = 1;
      this.lotePrecio = 0;
    },

    // ==== CLIENTE & FLUJO VENTA ====
    searchCliente() {
      this.loading = true;
      this.$axios.post("searchCliente", { nit: this.venta.nit })
        .then((res) => {
          this.venta.nombre = "SN";
          this.venta.email = "";
          this.venta.codigoTipoDocumentoIdentidad = 1;
          if (res.data.nombre) this.venta.nombre = res.data.nombre;
          if (res.data.email) this.venta.email = res.data.email;
          if (res.data.codigoTipoDocumentoIdentidad) this.venta.codigoTipoDocumentoIdentidad =  parseInt(res.data.codigoTipoDocumentoIdentidad);
          if (res.data.complemento) this.venta.complemento = res.data.complemento;
        })
        .catch((error) => console.error(error))
        .finally(() => (this.loading = false));
    },

    clickDialogVenta() {
      if (this.productosVentas.length === 0) {
        this.$alert?.error?.("Debe agregar al menos un producto a la venta")
        || this.$q.notify({ type: 'negative', message: 'Debe agregar al menos un producto a la venta' });
        return;
      }
      this.ventaDialog = true;
      // reset efectivo
      this.efectivo = '';
    },

    productosGet() {
      this.loading = true;
      this.$axios.get("productosStock", {
        params: {
          search: this.productosSearch,
          page: this.pagination.page,
          per_page: this.pagination.rowsPerPage,
        },
      }).then((res) => {
        this.productos = res.data.data;
        this.pagination.rowsNumber = res.data.total;
        this.pagination.page = res.data.current_page;
        // escaneo por barra
        if (this.productos.length === 1 && this.productos[0].barra === this.productosSearch) {
          // flujo: abrir diálogo de lote directamente
          this.openLoteDialog(this.productos[0]);
          this.productosSearch = "";
        }
      }).catch((error) => {
        console.error(error);
      }).finally(() => {
        this.loading = false;
      });
    },

    submitVenta() {
      this.loading = true;
      this.$axios.post("ventas", {
        ci: this.venta.nit,
        nombre: this.venta.nombre,
        email: this.venta.email,
        codigoTipoDocumentoIdentidad: this.venta.codigoTipoDocumentoIdentidad,
        complemento: this.venta.complemento,
        productos: this.productosVentas, // incluye compra_detalle_id por línea
        tipo_venta: this.venta.tipo_venta,
        tipo_pago: this.venta.tipo_pago,
        receta_id: this.receta_id,
      }).then((res) => {
        this.ventaDialog = false;
        this.$alert?.success?.("Venta realizada con éxito");
        this.productosVentas = [];

        this.venta = {
          nit: "0",
          nombre: "SN",
          codigoTipoDocumentoIdentidad: 1,
          tipo_venta: "Interno",
          tipo_pago: "Efectivo",
        };
        Imprimir.printFactura(res.data);
        this.receta_id = null;
        this.$nextTick(() => this.$refs.inputBuscarProducto?.focus());
        this.productosGet();
      }).catch((error) => {
        console.error(error);
        this.$alert?.error?.(error?.response?.data?.message || "No se pudo realizar la venta")
        // || this.$q.notify({ type:'negative', message: error?.response?.data?.message || 'No se pudo realizar la venta' });
      }).finally(() => {
        this.loading = false;
      });
    },

    // (Opcional) Voz
    startRecognition(field) {
      if (this.recognition) {
        this.activeField = field;
        this.recognition.start();
      } else {
        this.$q.notify({ color: "negative", message: "El reconocimiento de voz no está soportado en este navegador" });
      }
    },
  },

  computed: {
    totalVenta() {
      return this.productosVentas.reduce(
        (acc, it) => acc + (Number(it.cantidad) * Number(it.precio)), 0
      );
    },
    cambio() {
      let cambio = Number(this.efectivo || 0) - this.totalVenta;
      if (cambio < 0) cambio = 0;
      return cambio.toFixed(2);
    },
  },
};
</script>
