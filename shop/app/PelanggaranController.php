<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Pelanggaran;
use Auth;

class PelanggaranController extends Controller
{

  function __construct()
  { }

  public function get()
  {
    return response([
      "pelanggaran" => Pelanggaran::all()
    ]);
  }

  public function find(Request $request)
  {
    $find = $request->find;
    $pelanggaran = Pelanggaran::where("nama_pelanggaran", "like", "%$find%")->get();
    return response([
      "pelanggaran" => $pelanggaran
    ]);
  }

  public function save(Request $request)
  {
    $action = $request->action;
    if ($action == "insert") {
      try {
        $pelanggaran = new Pelanggaran();
        $pelanggaran->nama_pelanggaran = $request->nama_pelanggaran;
        $pelanggaran->kategori = $request->kategori;
        $pelanggaran->poin = $request->poin;
        $pelanggaran->save();
        return response(["message" => "Data pelanggaran berhasil ditambahkan"]);
      } catch (\Exception $e) {
        return response(["message" => $e->getMessage()]);
      }
    } else if ($action == "update") {
      try {
        $pelanggaran = Pelanggaran::where("id_pelanggaran", $request->id_pelanggaran)->first();
        $pelanggaran->nama_pelanggaran = $request->nama_pelanggaran;
        $pelanggaran->kategori = $request->kategori;
        $pelanggaran->poin = $request->poin;
        $pelanggaran->save();
        return response(["message" => "Data pelanggaran berhasil diubah"]);
      } catch (\Exception $e) {
        return response(["message" => $e->getMessage()]);
      }
    }
  }

  public function drop($id_pelanggaran)
  {
    try {
      Pelanggaran::where("id_pelanggaran", $id_pelanggaran)->delete();
      return response(["message" => "Data pelanggaran berhasil dihapus"]);
    } catch (\Exception $e) {
      return response(["message" => $e->getMessage()]);
    }
  }
}
