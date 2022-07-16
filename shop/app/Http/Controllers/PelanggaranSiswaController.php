<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\PelanggaranSiswa;
use App\Siswa;
use App\DetailPelanggaran;
use Auth;
class PelanggaranSiswaController extends Controller
{

  function __construct()
  {
    // code...
  }

  public function get()
  {
    $pelanggaran = [];
    foreach (PelanggaranSiswa::all() as $p) {
      $detail = [];
      foreach ($p->detail_pelanggaran as $d) {
        $itemDetail = [
          "id_pelanggaran_siswa" => $d->id_pelanggaran_siswa,
          "id_pelanggaran" => $d->id_pelanggaran,
          "nama_pelanggaran" => $d->pelanggaran->nama_pelanggaran,
          "poin" => $d->pelanggaran->poin
        ];
        array_push($detail, $itemDetail);
      }
      $item = [
        "id_pelanggaran_siswa" => $p->id_pelanggaran_siswa,
        "waktu" => $p->waktu,
        "id_siswa" => $p->id_siswa,
        "nama_siswa" => $p->siswa->nama_siswa,
        "id_user" => $p->id_user,
        "nama_user" => $p->user->nama_user,
        "detail_pelanggaran" => $detail
      ];
      array_push($pelanggaran,$item);
    }
    return response(["pelanggaran_siswa" => $pelanggaran]);
  }

  public function save(Request $request)
  {
    try {
      $pelanggaran = new PelanggaranSiswa();
      $pelanggaran->waktu = date("Y-m-d H:i:s");
      $pelanggaran->id_siswa = $request->id_siswa;
      $pelanggaran->id_user = $request->id_user;
      $pelanggaran->save();
      $detail_pelanggaran = json_decode($request->detail_pelanggaran);
      $detail = [];
      $siswa = Siswa::where("id_siswa", $request->id_siswa)->first();
      $poin = $siswa->poin;
      foreach ($detail_pelanggaran as $det) {
        // update poin
        $poin += $det->poin;
        $item = [
          "id_pelanggaran_siswa" => $pelanggaran->id_pelanggaran_siswa,
          "id_pelanggaran" => $det->id_pelanggaran
        ];
        array_push($detail, $item);
      }
      $siswa->poin = $poin;
      $siswa->save();
      DetailPelanggaran::insert($detail);
      return response(["message" => "Data pelanggaran siswa berhasil disimpan"]);
    } catch (\Exception $e) {
      return response(["message" => $e->getMessage()]);
    }
  }

  public function drop($id_pelanggaran_siswa)
  {
    try {
      PelanggaranSiswa::where("id_pelanggaran_siswa", $id_pelanggaran_siswa)->delete();
      DetailPelanggaran::where("id_pelanggaran_siswa", $id_pelanggaran_siswa)->delete();
      return response(["message" => "Data pelanggaran siswa berhasil dihapus"]);
    } catch (\Exception $e) {
      return response(["message" => $e->getMessage()]);
    }
  }
}
