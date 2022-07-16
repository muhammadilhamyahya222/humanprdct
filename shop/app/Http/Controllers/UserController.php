<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use App\User;
use Auth;

class UserController extends Controller
{

  function __construct()
  {

  }

  public function get()
  {
    $user = [];
    foreach (User::all() as $u) {
      $item = [
        "id_user" => $u->id_user,
        "fullname" => $u->fullname,
        "username" => $u->username,
        "alamat" => $u->alamat,
        "email" => $u->email,
        "password" => Crypt::decrypt($u->password),
        "tmp_lahir" => $u->tmp_lahir,
        "tgl_lahir" => $u->tgl_lahir,
        "gender" => $u->gender,
        "role" => $u->role,
        "nohp" => $u->nohp,
        "image" => $u->image
      ];
      array_push($user, $item);
    }
    return response([
      "user" => $user
    ]);
  }

  public function find(Request $request)
  {
    $find = $request->find;
    $user = User::where("id_user","like","%$find%")->orWhere("username","like","%$find%")
    ->orWhere("email","like","%$find%")->orWhere("role","like","%$find%")->get();
    return response([
      "user" => $user
    ]);
  }

  public function save(Request $request)
  {
    $action = $request->action;
    if ($action == "insert") {
      try {

        $user = new User();
        $user->id_user = $request->id_user;
        $user->username = $request->username;
        $user->email= $request->email;
        $user->password = encrypt ($request->password);
        $user->role = $request->role;

  if($request->file('image')){
    $file = $request->file('image');
    $name = $file->getClientOriginalName();
    $file->move(\base_path() ."/public/images", $name);
    $user->image = $name;
  }

    $user->save();



        return response(["message" => "Data produk berhasil ditambahkan"]);
      } catch (\Exception $e) {
        return response(["message" => $e->getMessage()]);
      }
    }else if($action == "update"){
      try {
        $user = User::where("id_user", $request->id_user)->first();
        $user->id_user = $request->id_user;
        $user->username = $request->username;
        $user->email = $request->email;
        $user->password = $request->password;
        $user->role = $request->role;
        if($request->file('image')){
          $file = $request->file('image');
          $name = $file->getClientOriginalName();
          $file->move(\base_path() ."/public/images", $name);
          $user->image = $name;
        }
        $user->save();
        return response(["message" => "Data produk berhasil diubah"]);
      } catch (\Exception $e) {
        return response(["message" => $e->getMessage()]);
      }
    }
  }

  public function drop($id_user)
  {
    try {
      User::where("id_user", $id_user)->delete();
      return response(["message" => "Data produk berhasil dihapus"]);
    } catch (\Exception $e) {
      return response(["message" => $e->getMessage()]);
    }
  }

  public function register(Request $request)
  {
    try {
      $user = new User();
      $user->fullname = $request->fullname;
      $user->username = $request->username;
      $user->email = $request->email;
      $user->password = Crypt::encrypt($request->password);
      $user->nohp = $request->nohp;
      $user->role = "user";
      $user->save();

      return response(["message" => "Register berhasil"]);
    }
    catch (\Exception $e) {
      return response(["message" => $e->getMessage()]);
    }
  }

  public function data($id) {
    $user = User::where("id_user", $id)->get();
    return response([
      "user" => $user
    ]);
  }

  public function auth(Request $request)
  {
    $username = $request->username;
    $password = $request->password;

    $user = User::where("username", $username);
    if ($user->count() > 0) {
      $u = $user->first();
      if (Crypt::decrypt($u->password) == $password) {
        return response(["status" => true, "user" => $u, "role" => $u->role, "token" => Crypt::encrypt($u->id_user)]);
      } else {
        return response(["status" => false]);
      }
    } else {
      return response(["status" => false]);
    }
  }

  public function save_profil(Request $request)
  {
    $action = $request->action;
    if ($action == "update") {
      try {
        $user = User::where("id_user", $request->id_user)->first();
        $user->fullname = $request->fullname;
        $user->username = $request->username;
        $user->alamat = $request->alamat;
        $user->email = $request->email;
        $user->tmp_lahir = $request->tmp_lahir;
        $user->tgl_lahir = $request->tgl_lahir;
        $user->role = $request->role;
        $user->gender = $request->gender;
        $user->nohp = $request->nohp;
        if($request->file('image')){
          $file = $request->file('image');
          $name = $file->getClientOriginalName();
          $file->move(\base_path() ."/public/images", $name);
          $user->image = $name;
        }
        $user->save();

        return response(["message" => "Data user berhasil ditambahkan"]);
      } catch (\Exception $e) {
        return response(["message" => $e->getMessage()]);
      }
    }
  }
  public function getById($id_user){
    try{
      $user = User::where("id_user", $id_user)->get();
      return response(["user" => $user]);  
    } catch (\Exception $e) {
      return response(["message" => $e->getMessage]);
    }
  }

}

 ?>
