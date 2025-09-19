<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TestController extends Controller
{
    function index(){
        $token = env('TOKEN');
        $nit = env('NIT');
        $codigoSucursal = 0;
        $codigoModalidad = env('MODALIDAD');
        $codigoEmision=1;
        $cdf=1; // 1 con credito fiscal 2 sin credito fiscal 3 nota credito debito
        $codigoDocumentoSector=1; //1 compra venta, 13 servicios basicos, 24 nota credito debito, 29 nota conciliacion
        $nf =1; // numero de factura
        $codigoPuntoVenta=0;
//        return $token;
//        $miliSegundo=str_pad($i, 3, '0', STR_PAD_LEFT);
        $miliSegundo='001';
//        $fechaEnvio=date("Y-m-d\TH:i:s").".$miliSegundo";
        $cuf = new CUF();
        $cuf = $cuf->obtenerCUF(
            $nit,
            date("YmdHis$miliSegundo"),
            $codigoSucursal,
            $codigoModalidad,
            $codigoEmision,
            $cdf,
            $codigoDocumentoSector,
            $nf,
            $codigoPuntoVenta
        );
        return $cuf;
    }
}
