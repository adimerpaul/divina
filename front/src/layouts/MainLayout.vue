<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-black" bordered >
      <q-toolbar>
        <!--        keyboard_double_arrow_left-->
        <q-btn
          dense
          rounded
          color="primary"
          :icon="leftDrawerOpen ? 'keyboard_double_arrow_left' : 'keyboard_double_arrow_right'"
          aria-label="Menu"
          size="10px"
          @click="toggleLeftDrawer"
          unelevated
        />
        <span class="q-pa-xs text-bold">{{version}}</span>
        <q-toolbar-title>
        </q-toolbar-title>
        <div>
          <q-btn-dropdown flat unelevated  no-caps dropdownIcon="expand_more">
            <template v-slot:label>
              <q-avatar rounded>
                <q-img :src="$url+ '../images/' + $store.user.avatar" v-if="$store.user.avatar" />
              </q-avatar>
              <div class="text-center" style="line-height: 1">
                <div style="width: 100px; white-space: normal; overflow-wrap: break-word;">
                  {{ $store.user.name }} <br>
                  <q-chip :color="$store.user.agencia=='Ayacucho'?'green':'blue'" dense size="xs" class="text-white">{{$store.user.agencia}}</q-chip>
                </div>
                <!--                <pre>{{$store.user}}</pre>-->
              </div>
            </template>
            <q-item clickable v-ripple @click="logout" v-close-popup>
              <q-item-section avatar>
                <q-icon name="logout" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Salir</q-item-label>
              </q-item-section>
            </q-item>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      show-if-above
      :width="200"
      :breakpoint="500"
      class="bg-primary text-white"
    >
      <q-list>
        <q-item-label
          header
          class="text-center"
        >
          <q-img src="/logo.png" width="100px" />
        </q-item-label>

        <!--        <EssentialLink-->
        <!--          v-for="link in linksList"-->
        <!--          :key="link.title"-->
        <!--          v-bind="link"-->
        <!--        />-->
        <template v-for="link in linksList" :key="link.title">
          <!--          v-if="link.can === 'Todos' || $store.permissions.some(permission => permission.name === link.can)"-->
          <q-item  clickable :to="link.link" exact
                   class="text-black"
                   active-class="menu"
                   dense
                   v-close-popup
                   v-if="link && $store.user && (link.can.includes($store.user.role) || link.can.includes('Todos'))"
          >
            <q-item-section avatar>
              <q-icon :name="$route.path === link.link ? 'o_' + link.icon : link.icon"
                      :class="$route.path === link.link ? 'text-black' : ''"/>
            </q-item-section>
            <q-item-section>
              <q-item-label :class="$route.path === link.link ? `text-black text-bold ${link.color}` : ''">
                {{ link.title }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </template>
        <q-item clickable class="text-black" @click="logout" v-close-popup>
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Salir</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container class="bg-grey-3">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import {getCurrentInstance, onMounted, ref} from 'vue'
// import EssentialLink from 'components/EssentialLink.vue'
const {proxy} = getCurrentInstance()
const linksList = ref([])


const leftDrawerOpen = ref(false)

const version =import.meta.env.VITE_API_VERSION

onMounted(() => {
  const user = JSON.parse(localStorage.getItem('user')) || {}

  const baseLinks = [
    { title: 'Principal', icon: 'home', link: '/', can: 'Todos' },
    { title: 'Usuarios', icon: 'people', link: '/usuarios', can: 'Admin' },
    { title: 'Impuestos', icon: 'percent', link: '/impuestos', can: 'Admin' },
    { title: 'Productos', icon: 'shopping_cart', link: '/productos', can: 'Todos' },
    { title: 'Ventas', icon: 'shopping_bag', link: '/venta', can: 'Todos' },
    { title: 'Nueva Venta', icon: 'add_shopping_cart', link: '/ventaNuevo', can: 'Todos' },
    { title: 'Proveedores', icon: 'manage_accounts', link: '/proveedores', can: ['Todos']},
    { title: 'Compras', icon: 'storefront', link: '/compras', can: ['Todos']},
    { title: 'Compras Nueva', icon: 'shopping_basket', link: '/compras-create', can: ['Todos']},
    { title: 'Productos por vencer', icon: 'warning', link: '/productos-vencer', can: ['Todos']},
    { title: 'Productos vencidos', icon: 'do_not_touch', link: '/productos-vencidos', can: ['Todos']},
    { title: 'Pedidos', icon: 'real_estate_agent', link: '/pedidos', can: ['Todos']},
    { title: 'Realizar pedido', icon: 'shopping_cart_checkout', link: '/pedidosCompra', can: ['Todos']},
  ]
  linksList.value = baseLinks

  // const sucursalLinks = {
  //   'Ayacucho': { title: 'Ayacucho', icon: 'event', link: '/reservas', can: 'Todos', color: 'text-green' },
  //   'Oquendo': { title: 'Oquendo', icon: 'event', link: '/reservasOquendo', can: 'Todos', color: 'text-blue' },
  // }
  //
  // const altSucursal = user.sucursal === 'Ayacucho' ? 'Oquendo' : 'Ayacucho'
  //
  // linksList.value = [
  //   ...baseLinks.slice(0, 2),
  //   sucursalLinks[user.sucursal],
  //   ...baseLinks.slice(2),
  //   sucursalLinks[altSucursal]
  // ]
})

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
function logout() {
  proxy.$alert.dialog('¿Desea salir del sistema?')
    .onOk(() => {
      // proxy.$store.isLogged = false
      // proxy.$store.user = {}
      // localStorage.removeItem('tokenProvidencia')
      // proxy.$router.push('/login')
      proxy.$axios.post('/logout')
        .then(() => {
          proxy.$store.isLogged = false
          proxy.$store.user = {}
          localStorage.removeItem('tokenProvidencia')
          localStorage.removeItem('user')
          proxy.$alert.success('Sesión cerrada', 'Éxito')
          proxy.$router.push('/login')
        })
        .catch(() => {
          proxy.$store.isLogged = false
          proxy.$store.user = {}
          localStorage.removeItem('tokenProvidencia')
          localStorage.removeItem('user')
          proxy.$alert.success('Sesión cerrada', 'Éxito')
          proxy.$router.push('/login')
        })
    })
}
</script>
<style>
.menu{
  background-color: #fff;
  color: #000 !important;
  border-radius: 10px;
  margin: 5px;
  padding: 5px
}
</style>
