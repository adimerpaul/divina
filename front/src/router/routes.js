const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue'), meta: { requiresAuth: true } },
      { path: 'usuarios', component: () => import('pages/usuarios/Usuarios.vue'), meta: { requiresAuth: true } },
      { path: 'productos', name: 'productos', component: () => import('pages/productos/Productos.vue'), meta: { requiresAuth: true } },
      { path: 'venta', name: 'venta', component: () => import('pages/ventas/Ventas.vue'), meta: { requiresAuth: true } },
      { path: 'ventaNuevo', name: 'ventaNuevo', component: () => import('pages/ventas/VentaNew.vue'), meta: { requiresAuth: true } },
      { path: 'proveedores', name: 'proveedores', component: () => import('pages/proveedores/Proveedores.vue'), meta: { requiresAuth: true } },
      { path: 'compras', name: 'compras', component: () => import('pages/compras/Compras.vue'), meta: { requiresAuth: true } },
      { path: 'compras-create', name: 'compras-create', component: () => import('pages/compras/ComprasCreate.vue'), meta: { requiresAuth: true } },
      { path: 'productos-vencer', name: 'productos-vencer', component: () => import('pages/productos/ProductosVencer.vue'), meta: { requiresAuth: true } },
      { path: 'productos-vencidos', name: 'productos-vencidos', component: () => import('pages/productos/ProductosVencidos.vue'), meta: { requiresAuth: true } },
      // { title: 'Pedidos', icon: 'real_estate_agent', link: '/pedidos', can: ['Todos']},
      // { title: 'Pedidos Compra', icon: 'shopping_cart_checkout', link: '/pedidosCompra', can: ['Todos']},
      { path: 'pedidos', name: 'pedidos', component: () => import('pages/pedidos/Pedidos.vue'), meta: { requiresAuth: true } },
      { path: 'pedidosCompra', name: 'pedidosCompra', component: () => import('pages/pedidos/PedidosCompra.vue'), meta: { requiresAuth: true } },
    ]
  },
  {
    path: '/login',
    component: () => import('pages/Login.vue')
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
