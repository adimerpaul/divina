<?php

namespace App\Http\Controllers;

use App\Models\Cui;
use Illuminate\Http\Request;

class ImpuestoController extends Controller{
    public function generarCUI(){
        $codigoPuntoVenta = 0;
        $codigoSucursal = 0;
        $token=env('TOKEN');
//        error_log("Token: ".$token);
        if (Cui::where('codigoPuntoVenta', $codigoPuntoVenta)->where('codigoSucursal', $codigoSucursal)->where('fechaVigencia','>=', now())->count()>=1){
            return response()->json(['message' => 'El CUI ya existe'], 400);
        }else{
            $client = new \SoapClient(env("URL_SIAT")."FacturacionCodigos?WSDL",  [
                'stream_context' => stream_context_create([
                    'http' => [
                        'header' => "apikey: TokenApi ".$token,
                    ]
                ]),
                'cache_wsdl' => WSDL_CACHE_NONE,
                'compression' => SOAP_COMPRESSION_ACCEPT | SOAP_COMPRESSION_GZIP | SOAP_COMPRESSION_DEFLATE,
                'trace' => 1,
                'use' => SOAP_LITERAL,
                'style' => SOAP_DOCUMENT,
            ]);
            $result= $client->cuis([
                "SolicitudCuis"=>[
                    "codigoAmbiente"=>env('AMBIENTE'),
                    "codigoModalidad"=>env('MODALIDAD'),
                    "codigoPuntoVenta"=>$codigoPuntoVenta,
                    "codigoSistema"=>env('CODIGO_SISTEMA'),
                    "codigoSucursal"=>$codigoSucursal,
                    "nit"=>env('NIT'),
                ]
            ]);
            $cui = new Cui();
            $cui->codigo = $result->RespuestaCuis->codigo;
            $cui->fechaVigencia =  date('Y-m-d H:i:s', strtotime($result->RespuestaCuis->fechaVigencia));
            $cui->codigoPuntoVenta = $codigoPuntoVenta;
            $cui->codigoSucursal = $codigoSucursal;
            $cui->fechaCreacion= date('Y-m-d H:i:s');
            $cui->save();
            return response()->json(['success' => 'CUI creado correctamente'], 200);
        }
    }
}
