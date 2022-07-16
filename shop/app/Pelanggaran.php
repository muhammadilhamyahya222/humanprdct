<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pelanggaran extends Model
{
    protected $table = "pelanggaran";
    protected $primaryKey = "id_pelanggaran";
    protected $fillable = ["id_pelanggaran", "nama_pelanggaran", "kategori", "poin"];
}
