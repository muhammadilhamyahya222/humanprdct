<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Alamat;
use Auth;

class AlamatController extends Controller
{

  function __construct()
  {

  }

  public function get($id_user)
  {
    return response([
      "alamat" => Alamat::where("id_user", $id_user)->get()
    ]);
  }

  public function save(Request $request)
  {
    $action = $request->action;
    if ($action == "insert") {
      try {

        $Alamat = new Alamat();
        $alamat->id_user = $request->id_user;
        $alamat->receiver = $request->receiver;
        $alamat->pos= $request->pos;
        $alamat->kecamatan = $request->kecamatan;
        $alamat->kota = $request->kota;
        $alamat->jalan = $request->jalan;
        $alamat->rt = $request->rt;
        $alamat->rw = $request->rw;
        $alamat->save();

        return response(["message" => "Alamat Pengiriman berhasil ditambahkan"]);
      } catch (\Exception $e) {
        return response(["message" => $e->getMessage()]);
      }
    }else if($action == "update"){
      try {
        $alamat = Alamat::where("id_pengiriman", $request->id_pengiriman)->first();
        $alamat->id_user = $request->id_user;
        $alamat->receiver = $request->receiver;
        $alamat->pos= $request->pos;
        $alamat->kecamatan = $request->kecamatan;
        $alamat->kota = $request->kota;
        $alamat->jalan = $request->jalan;
        $alamat->rt = $request->rt;
        $alamat->rw = $request->rw;
        $alamat->save();

        return response(["message" => "Data Pengiriman berhasil diubah"]);
      } catch (\Exception $e) {
        return response(["message" => $e->getMessage()]);
      }
    }
  }

  public function drop($id_pengiriman)
  {
    try {
      Alamat::where("id_pengiriman", $id_pengiriman)->delete();
      return response(["message" => "Data Pengiriman berhasil dihapus"]);
    } catch (\Exception $e) {
      return response(["message" => $e->getMessage()]);
    }
  }
  public function getByUser($id_user)
  {
    $alamat = Alamat::where("id_user", $id_user)->get();
    return response([
      "alamat" => $alamat
    ]);
  }

}

 ?>
