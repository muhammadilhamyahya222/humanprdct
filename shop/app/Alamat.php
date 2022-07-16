<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Alamat extends Model
{
    protected $table = "alamat";
    protected $primaryKey = "id_pengiriman";
    protected $fillable = ["id_pengiriman", "id_user", "receiver", "pos", "kecamatan", "kota", "jalan", "rt", "rw"];

    public function user()
    {
        return $this->belongsTo("App\User", "id_user", "id");
    }
}
