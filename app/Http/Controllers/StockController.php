<?php

namespace App\Http\Controllers;

use App\Http\Resources\StockResource;
use App\Models\User;
use App\Models\Stock;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreStockRequest;
use App\Http\Requests\UpdateStockRequest;
use Illuminate\Http\Request;

class StockController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Use the currently logged in user's ID to find all their stocks
        $user = User::find($request->user()->id);
        return StockResource::collection($user->stocks()->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStockRequest $request)
    {
        // Create a new stock from the validated data and write to DB, then attach (m2m) it to the current user
        $user = User::find($request->user()->id);
        $result = Stock::create($request->validated());
        $user->stocks()->attach($result->id);
        return new StockResource($result);
    }

    /**
     * Display the specified resource.
     */
    public function show(Stock $stock, Request $request)
    {
        $user = User::find($request->user()->id);
        return StockResource::collection($user->stocks()->get());
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStockRequest $request, Stock $stock)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Stock $stock)
    {
        //
    }
}
