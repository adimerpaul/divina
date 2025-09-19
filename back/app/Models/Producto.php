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
    protected $appends = [
        'stock',
    ];
    public function getStockAttribute(){
        return $this->stockAlmacen + $this->stockChallgua + $this->stockSocavon + $this->stockCatalina;
    }
}
