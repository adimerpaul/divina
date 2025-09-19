<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;

class ProductoController extends Controller{
    function productosAll(){
        return Producto::orderBy('nombre')->get();
    }
    public function index(Request $request) {
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
    function store(Request $request){
        return Producto::create($request->all());
    }
    function update(Request $request, Producto $producto){
        $producto->update($request->all());
        return $producto;
    }
    function destroy(Producto $producto){
        $producto->delete();
        return response()->json(['success' => true]);
    }
}
