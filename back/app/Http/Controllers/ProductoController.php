<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;

class ProductoController extends Controller
{
    // App/Http/Controllers/CompraController.php
    public function historialComprasVentas($productoId)
    {
        $detalles = \App\Models\CompraDetalle::with(['compra' => function($q){
            $q->select('id','agencia');
        }])
            ->where('producto_id', $productoId)
            ->where('estado', 'Activo')
            ->whereNull('deleted_at')
            ->where('cantidad_venta', '>', 0)
            ->orderByRaw("CASE WHEN fecha_vencimiento IS NULL THEN 1 ELSE 0 END, fecha_vencimiento ASC") // primero los que vencen antes
            ->get(['id','compra_id','producto_id','lote','fecha_vencimiento','cantidad','cantidad_venta','precio','factor','precio_venta','nro_factura']);

        // Puedes calcular 'disponible' = cantidad_venta si tu flujo lo maneja así
        $response = $detalles->map(function($d){
            return [
                'id'               => $d->id,                 // compra_detalle_id (lote)
                'compra_id'        => $d->compra_id,
                'agencia'          => $d->compra?->agencia,
                'producto_id'      => $d->producto_id,
                'lote'             => $d->lote,
                'fecha_vencimiento'=> $d->fecha_vencimiento,
                'cantidad'         => (float)$d->cantidad,         // cantidad comprada
                'disponible'       => (float)$d->cantidad_venta,   // REMANENTE para vender
                'precio'           => (float)$d->precio,           // costo
                'factor'           => (float)$d->factor,
                'precio_venta'     => (float)$d->precio_venta,     // sugerido para venta
                'nro_factura'      => $d->nro_factura,
            ];
        });

        return response()->json($response);
    }
    function productosStock(Request $request)
    {
        $search = $request->search;
        $perPage = $request->per_page ?? 10;

        $productos = Producto::where(function ($query) use ($search) {
            $query->where('nombre', 'like', "%$search%")
                ->orWhere('descripcion', 'like', "%$search%")
                ->orWhere('barra', 'like', "%$search%");
        })
            ->orderBy('nombre')
//            ->with('comprasDetalles')
            ->paginate($perPage);
        $productosRes = [];
        foreach ($productos as $producto) {
            $productoCompra = $producto->comprasDetalles()
                ->where('estado', 'Activo')
                ->sum('cantidad_venta');
            if ($productoCompra > 0) {
                $producto->stock = $productoCompra;
                $productosRes[] = $producto;
            }
        }
//        retorna con paginacion
        return response()->json([
            'data' => $productosRes,
            'current_page' => $productos->currentPage(),
            'last_page' => $productos->lastPage(),
            'per_page' => $productos->perPage(),
            'total' => count($productosRes),
        ]);
    }

    function productosAll()
    {
        return Producto::orderBy('nombre')->get();
    }

    public function index(Request $request)
    {
        $search = $request->search;
        $perPage = $request->per_page ?? 10;

        $productos = Producto::where(function ($query) use ($search) {
            $query->where('nombre', 'like', "%$search%")
                ->orWhere('descripcion', 'like', "%$search%")
                ->orWhere('barra', 'like', "%$search%");
        })
            ->orderBy('nombre')
            ->paginate($perPage);

        return response()->json($productos);
    }

    function store(Request $request)
    {
        return Producto::create($request->all());
    }

    function update(Request $request, Producto $producto)
    {
        $producto->update($request->all());
        return $producto;
    }

    function destroy(Producto $producto)
    {
        $producto->delete();
        return response()->json(['success' => true]);
    }
}
