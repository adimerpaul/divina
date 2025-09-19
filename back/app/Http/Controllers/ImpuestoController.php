<?php

namespace App\Http\Controllers;

use App\Models\Cufd;
use App\Models\Cui;
use Illuminate\Http\Request;

class ImpuestoController extends Controller{
    public function generarCUI(){
        $codigoPuntoVenta = 0;
        $codigoSucursal = 0;
        $token=env('TOKEN');
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
    function listCUFD(){
        $cufd = Cufd::orderBy('id', 'desc')->get();
        return response()->json($cufd, 200);
    }
    function generarCUFD(){
        $codigoPuntoVenta = 0;
        $codigoSucursal = 0;
        if (Cufd::where('codigoPuntoVenta', $codigoPuntoVenta)->where('codigoSucursal', $codigoSucursal)->where('fechaVigencia','>=', now())->count()>=1){
            return response()->json(['message' => 'El CUFD ya existe'], 400);
        }else{
            $cui=Cui::where('codigoPuntoVenta', $codigoPuntoVenta)->where('codigoSucursal', $codigoSucursal)->where('fechaVigencia','>=', now());
            if ($cui->count()==0){
                return response()->json(['message' => 'El CUI no existe'], 400);
            }
            $client = new \SoapClient(env("URL_SIAT")."FacturacionCodigos?WSDL",  [
                'stream_context' => stream_context_create([
                    'http' => [
                        'header' => "apikey: TokenApi ".env('TOKEN'),
                    ]
                ]),
                'cache_wsdl' => WSDL_CACHE_NONE,
                'compression' => SOAP_COMPRESSION_ACCEPT | SOAP_COMPRESSION_GZIP | SOAP_COMPRESSION_DEFLATE,
                'trace' => 1,
                'use' => SOAP_LITERAL,
                'style' => SOAP_DOCUMENT,
            ]);
            $result= $client->cufd([
                "SolicitudCufd"=>[
                    "codigoAmbiente"=>env('AMBIENTE'),
                    "codigoModalidad"=>env('MODALIDAD'),
                    "codigoPuntoVenta"=>$codigoPuntoVenta,
                    "codigoSistema"=>env('CODIGO_SISTEMA'),
                    "codigoSucursal"=>$codigoSucursal,
                    "cuis"=> $cui->first()->codigo,
                    "nit"=>env('NIT'),
                ]
            ]);
            error_log("result: ".json_encode($result));

            $cufd = new Cufd();
            $cufd->codigo = $result->RespuestaCufd->codigo;
            $cufd->codigoControl = $result->RespuestaCufd->codigoControl;
//            $cufd->fechaVigencia =  date('Y-m-d H:i:s', strtotime($result->RespuestaCufd->fechaVigencia));
            $cufd->fechaVigencia =  date('Y-m-d H:i:s', strtotime (date('Y-m-d 23:59:59')));
            $cufd->fechaCreacion =  date('Y-m-d H:i:s');
            $cufd->codigoPuntoVenta = $codigoPuntoVenta;
            $cufd->codigoSucursal = $codigoSucursal;
            $cufd->save();
            return response()->json(['success' => 'CUFD creado correctamente'], 200);
        }
    }
}
