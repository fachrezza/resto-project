<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    public function index()
    {
        return Reservation::latest()->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'phone' => 'required',
            'email' => 'required|email',
            'guest_count' => 'required|integer|min:1',
            'reservation_date' => 'required|date',
            'reservation_time' => 'required'
        ]);

        $reservation = Reservation::create([
            ...$validated,
            'status' => 'pending'
        ]);

        return response()->json([
            'message' => 'Reservation created',
            'data' => $reservation
        ], 201);
    }

    public function show(Reservation $reservation)
    {
        return $reservation->load('table');
    }

    public function update(Request $request, Reservation $reservation)
    {
        $request->validate([
            'status' => 'required|in:pending,confirmed,cancelled'
        ]);

        $reservation->update([
            'status' => $request->status
        ]);

        return response()->json([
            'message' => 'Reservation updated',
            'data' => $reservation
        ]);
    }
}