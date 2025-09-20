<?php

namespace App\Http\Controllers;

use App\Models\Cufd;
use App\Models\Cui;
use App\Models\EventoSignificativo;
use App\Models\Venta;
use Illuminate\Http\Request;

class ImpuestoController extends Controller{
    function eventoSignificativo(Request $request){
        $cui=Cui::where('codigoPuntoVenta',0)->where('codigoSucursal',0)->where('fechaVigencia','>=', now());
        if ($cui->count()==0){
            return response()->json(['message' => 'El CUI no existe'], 400);
        }
        $cufd=Cufd::where('codigoPuntoVenta',0)->where('codigoSucursal',0)->where('fechaVigencia','>=', now());
        if ($cufd->count()==0){
            return response()->json(['message' => 'El CUFD no existe'], 400);
        }
        $codigoPuntoVenta =0;
        $codigoSucursal =0;

        $cui=Cui::where('codigoPuntoVenta', $codigoPuntoVenta)->where('codigoSucursal', $codigoSucursal)->where('fechaVigencia','>=', now())->first();
        $cufd=Cufd::where('codigoPuntoVenta', $codigoPuntoVenta)->where('codigoSucursal', $codigoSucursal)->where('fechaVigencia','>=', now())->first();
        $venta = Venta::find($request->venta_id);
        $fecha = $venta->fecha;
        $hora = $venta->hora;
        $fechaInicio = date('Y-m-d\TH:i:s', strtotime($fecha.' '.$hora.' -1 second'));
        $fechaFin = date('Y-m-d\TH:i:s', strtotime($fecha.' '.$hora.' +1 second'));
        $fechaInicio = date('Y-m-d\TH:i:s.000', strtotime($fechaInicio));
        $fechaFin = date('Y-m-d\TH:i:s.000', strtotime($fechaFin));

        $client = new \SoapClient(env('URL_SIAT')."FacturacionOperaciones?WSDL",  [
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
        try {
            $result= $client->registroEventoSignificativo([
                "SolicitudEventoSignificativo"=>[
                    "codigoAmbiente"=>env('AMBIENTE'),
                    "codigoMotivoEvento"=>$request->codigoMotivoEvento,
                    "codigoPuntoVenta"=>0,
                    "codigoSistema"=>env('CODIGO_SISTEMA'),
                    "codigoSucursal"=>0,
                    "cufd"=>$cufd->codigo,
                    "cufdEvento"=>$venta->cufd,
                    "cuis"=>$cui->codigo,
                    "descripcion"=>$request->descripcion,
                    "fechaHoraFinEvento"=>$fechaFin,
                    "fechaHoraInicioEvento"=>$fechaInicio,
                    "nit"=>env('NIT'),
                ]
            ]);
            error_log("result: ".json_encode($result));

            if ($result->RespuestaListaEventos->transaccion){
                $eventoSignificativo = new EventoSignificativo();
                $eventoSignificativo->codigoPuntoVenta=$codigoPuntoVenta;
                $eventoSignificativo->codigoSucursal=$codigoSucursal;
                $eventoSignificativo->fechaHoraFinEvento=date('Y-m-d H:i:s', strtotime($fecha .' '.$hora.' +1 second'));
                $eventoSignificativo->fechaHoraInicioEvento=date('Y-m-d H:i:s', strtotime($fecha .' '.$hora.' -1 second'));
                $eventoSignificativo->codigoMotivoEvento=$request->codigoMotivoEvento;
                $eventoSignificativo->descripcion=$request->descripcion;
                $eventoSignificativo->cufd=$cufd->codigo;
                $eventoSignificativo->cufdEvento=$venta->cuf;
                $eventoSignificativo->cufd_id=$cufd->id;
                $eventoSignificativo->codigoRecepcionEventoSignificativo=$result->RespuestaListaEventos->codigoRecepcionEventoSignificativo;
                $eventoSignificativo->save();
                return response()->json(['message' => 'Evento Significativo registrado correctamente!!'], 200);
            }else{
                return response()->json(['message' => json_encode($result->RespuestaListaEventos->mensajesList) ], 500);
            }
        }catch (\Exception $e){
            return response()->json(['message' => $e->getMessage()], 500);
        }


    }
    function anularImpuestos($cuf){
        $cui=Cui::where('codigoPuntoVenta',0)->where('codigoSucursal',0)->where('fechaVigencia','>=', now());
        if ($cui->count()==0){
            return response()->json(['message' => 'El CUI no existe'], 400);
        }
        $cufd=Cufd::where('codigoPuntoVenta',0)->where('codigoSucursal',0)->where('fechaVigencia','>=', now());
        if ($cufd->count()==0){
            return response()->json(['message' => 'El CUFD no existe'], 400);
        }
        $client = new \SoapClient(env("URL_SIAT")."ServicioFacturacionCompraVenta?WSDL",  [
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
        $result= $client->anulacionFactura([
            "SolicitudServicioAnulacionFactura"=>[
                "codigoAmbiente"=>env('AMBIENTE'),
                "codigoDocumentoSector"=>1,
                "codigoEmision"=>1,
                "codigoModalidad"=>env('MODALIDAD'),
                "codigoPuntoVenta"=>0,
                "codigoSistema"=>env('CODIGO_SISTEMA'),
                "codigoSucursal"=>0,
                "cufd"=>Cufd::where('codigoPuntoVenta',0)->where('codigoSucursal',0)->where('fechaVigencia','>=', now())->orderBy('id','desc')->first()->codigo,
                "cuis"=>Cui::where('codigoPuntoVenta',0)->where('codigoSucursal',0)->where('fechaVigencia','>=', now())->orderBy('id','desc')->first()->codigo,
                "nit"=>env('NIT'),
                "tipoFacturaDocumento"=>1,
                "codigoMotivo"=>1,
                "cuf"=>$cuf,
            ]
        ]);
        return response()->json($result, 200);
    }
    function verificarImpuestos($cuf){
        $cui=Cui::where('codigoPuntoVenta',0)->where('codigoSucursal',0)->where('fechaVigencia','>=', now());
        if ($cui->count()==0){
            return response()->json(['message' => 'El CUI no existe'], 400);
        }
        $cufd=Cufd::where('codigoPuntoVenta',0)->where('codigoSucursal',0)->where('fechaVigencia','>=', now());
        if ($cufd->count()==0){
            return response()->json(['message' => 'El CUFD no existe'], 400);
        }
        $client = new \SoapClient(env("URL_SIAT")."ServicioFacturacionCompraVenta?WSDL",  [
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
        $result= $client->verificacionEstadoFactura([
            "SolicitudServicioVerificacionEstadoFactura"=>[
                "codigoAmbiente"=>env('AMBIENTE'),
                "codigoDocumentoSector"=>1,
                "codigoEmision"=>1,
                "codigoModalidad"=>env('MODALIDAD'),
                "codigoPuntoVenta"=>0,
                "codigoSistema"=>env('CODIGO_SISTEMA'),
                "codigoSucursal"=>0,
                "cufd"=>Cufd::where('codigoPuntoVenta',0)->where('codigoSucursal',0)->where('fechaVigencia','>=', now())->orderBy('id','desc')->first()->codigo,
                "cuis"=>Cui::where('codigoPuntoVenta',0)->where('codigoSucursal',0)->where('fechaVigencia','>=', now())->orderBy('id','desc')->first()->codigo,
                "nit"=>env('NIT'),
                "tipoFacturaDocumento"=>1,
                "cuf"=>$cuf,
            ]
        ]);
        return response()->json($result, 200);
    }
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
