<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Menu;
use App\Models\Reservation;
use App\Models\Order;

class DashboardController extends Controller
{
    public function index()
    {
        return response()->json([
            'total_orders' => Order::count(),
            'total_reservations' => Reservation::count(),

            'today_orders' => Order::whereDate(
                'created_at',
                today()
            )->count(),

            'today_reservations' => Reservation::whereDate(
                'created_at',
                today()
            )->count(),

            'revenue' => Order::sum(
                'grand_total'
            )
        ]);
    }
}
