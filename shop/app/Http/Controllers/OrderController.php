<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Order;
use App\DetailOrder;
use App\Alamat;
use App\User;
use App\Products;
use Auth;

class OrderController extends Controller
{

  function __construct()
  {

  }

  public function get()
  {
    $order = [];
    foreach (Order::all() as $o) {
      $detail = [];
      foreach ($o->detail_order as $d) {
        $itemDetail = [
          "id_order" => $d->id_order,
          "id_product" => $d->id_product,
          "quantity" => $d->quantity
        ];
        array_push($detail, $itemDetail);
      }
      $item = [
        "id_order" => $o->id,
        "id_user" => $o->id_user,
        "fullname" => $o->fullname,
        "id_alamat" => $o->id_alamat,
        "jalan" => $o->jalan,
        "total" => $o->total,
        "bukti" => $o->bukti,
        "status" => $o->status,
        "detail" => $detail

      ];
      array_push($order, $item);
    }
    return response(["order" => $order]);
  }

  public function accept($id)
  {
    $o = Order::where("id", $id)->first();
    $o->status = "dikirim";
    $o->save();
  }
  
  public function decline($id) 
  {
    try {
      $o = Order::where("id", $id)->first();
      $o->status = "dibatalkan";
      $o->save();
      return response(["message" => "Pesanan berhasil dibatalkan"]);
    } catch (\Exception $e) {
      return response(["message" => $e->getMessage()]);
    }
  }

  public function save(Request $request)
  {
      try {
        $order = new Order();
        $order->id_user = $request->id_user;
        $order->id_alamat = $request->id_alamat;
        $order->total = $request->total;
        $order->status = "dipesan";
        $order->save();

        $detail = json_decode($request->products);
        $detail_order = [];
        $o = Order::where("id_user", $request->id_user)->latest()->first();
        foreach($detail as $det)
        {
          $item = [
            "id_order" => $o->id,
            "id_product" => $det->id,
            "quantity" => $det->qty,
          ];
          array_push($detail_order, $item);
        }
        DetailOrder::insert($detail_order);
        return response(["message" => "Data Order berhasil ditambahkan"]);
      } catch (\Exception $e) {
        return response(["message" => $e->getMessage()]);
      }
  }

  public function getOrdered($id_user)
  {
    $order = [];
    foreach (Order::where("id_user", $id_user)->where("status", "dipesan")->get() as $o) {
      $detail = [];
      foreach ($o->detail_order as $d) {
        $itemDetail = [
          "id_order" => $d->id_order,
          "id_product" => $d->id_product,
          "nama_product" => $d->product->name,
          "image" => $d->product->image,
          "quantity" => $d->quantity,
          "subtotal" => $d->subtotal
        ];
        array_push($detail, $itemDetail);
      }
      $item = [
        "id_order" => $o->id,
        "id_user" => $o->id_user,
        "nama_user" => $o->user->name,
        "id_alamat" => $o->id_alamat,
        "jalan" => $o->alamat->jalan,
        "kecamatan" => $o->alamat->kecamatan,
        "kota" => $o->alamat->kota,
        "zip_code" => $o->alamat->zip_code,
        "total" => $o->total,
        "bukti" => $o->bukti,
        "status" => $o->status,
        "tanggal" => $o->created_at,
        "detail" => $detail
      ];
       array_push($order,$item);
    }
    return response(["order" => $order]);
  }

  public function pay(Request $request)
  {
    try {
      $o = Order::where("id", $request->id_order)->first();
      $file = $request->file('image');
      $name = $file->getClientOriginalName();
      $file->move(\base_path() ."/public/images", $name);
      $o->bukti = $name;
      $o->status = "dibayar";
      $o->save();
      return response(["message" => "Pesanan berhasil dibayar"]);
    } catch (\Exception $e) {
      return response(["message" => $e->getMessage()]);
    }
  }


}

 ?>
