<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index()
    {
        return response()->json(
            Order::with([
                'items.menu',
                'table'
            ])
            ->latest()
            ->get()
        );
    }

    public function store(Request $request)
    {
        $request->validate([
            'customer_name' => 'required',
            'phone' => 'required',
            'table_id' => 'required|exists:restaurant_tables,id',
            'items' => 'required|array|min:1'
        ]);

        return DB::transaction(function () use ($request) {

            $grandTotal = 0;

            foreach ($request->items as $item) {

                $menu = Menu::findOrFail($item['menu_id']);

                $grandTotal += $menu->price * $item['qty'];
            }

            $order = Order::create([
                'order_number' => 'ORD-' . now()->timestamp,
                'customer_name' => $request->customer_name,
                'phone' => $request->phone,
                'table_id' => $request->table_id,
                'grand_total' => $grandTotal,
                'status' => 'pending'
            ]);

            foreach ($request->items as $item) {

                $menu = Menu::findOrFail($item['menu_id']);

                OrderItem::create([
                    'order_id' => $order->id,
                    'menu_id' => $menu->id,
                    'qty' => $item['qty'],
                    'price' => $menu->price,
                    'subtotal' => $menu->price * $item['qty']
                ]);
            }

            return response()->json([
                'message' => 'Order created',
                'order_id' => $order->id,
                'order_number' => $order->order_number,
                'grand_total' => $grandTotal
            ], 201);
        });
    }

    public function show(Order $order)
    {
        return $order->load('items.menu', 'table');
    }

    public function update(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'required'
        ]);

        $order->update([
            'status' => $request->status
        ]);

        return response()->json([
            'message' => 'Order updated',
            'data' => $order
        ]);
    }
}