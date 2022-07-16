<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PelanggaranSiswa extends Model
{
    protected $table = "pelanggaran_siswa";
    protected $primaryKey = "id_pelanggaran_siswa";
    protected $fillable = ["id_pelanggaran_siswa","waktu","id_siswa","id_user"];

    public function siswa()
    {
      return $this->belongsTo("App\Siswa","id_siswa");
    }

    public function user()
    {
      return $this->belongsTo("App\User","id_user");
    }

    public function detail_pelanggaran()
    {
      return $this->hasMany("App\DetailPelanggaran","id_pelanggaran_siswa","id_pelanggaran_siswa");
    }
}
