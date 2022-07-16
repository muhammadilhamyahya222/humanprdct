<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $table = "user";
    protected $primaryKey = "id_user";
    protected $fillable = ["fullname" ,"username", "alamat", "email" ,"password" ,"tmp_lahir", "tgl_lahir", "gender", "role", "nohp", "image"];
}