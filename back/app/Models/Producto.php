<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Producto extends Model{
    use SoftDeletes;
    protected $fillable = [
        'nombre',
        'barra',
        'stockAlmacen',
        'stockChallgua',
        'stockSocavon',
        'stockCatalina',
//        'cantidadSucursal4',
        'costo',
        'precioAntes',
        'precio',
        'porcentaje',
        //'utilidad',
        'activo',
        'unidad',
        'registroSanitario',
        'paisOrigen',
        'nombreComun',
        'composicion',
        'marca',
        'distribuidora',
        'imagen',
        //'color',
        'descripcion',
        'categoria',
        'subcategoria'
    ];
    protected $hidden = [
        'created_at',
        'updated_at',
        'deleted_at'
    ];
    protected $appends = ['stock'];
//    protected $appends = [
//        'stock',
//    ];
//    public function getStockAttribute(){
//        $productoCompra = CompraDetalle::where('producto_id', $this->id)
//            ->where('estado', 'Activo')
//            ->sum('cantidad_venta');
//        return $productoCompra;
//    }


//    boot stock
//    protected static function booted()
//    {
//    }
    function comprasDetalles(){
        return $this->hasMany(CompraDetalle::class);
    }
    public function getStockAttribute($value)
    {
        if ($value !== null) {
            return (float) $value;
        }

        return (float) $this->comprasDetalles()
            ->where('estado', 'Activo')
            ->whereNull('compra_detalles.deleted_at')
            ->sum('cantidad_venta');
    }
}
