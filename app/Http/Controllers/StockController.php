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
        // Attempt to store a stock if it doesn't exist, then attach it to the current user
        $user = User::find($request->user()->id);
        $stock = Stock::firstOrCreate(
            ['ticker' => request('ticker')],
            [
                'name' => $request->validated('name'),
                'currency' => $request->validated('currency'),
                'marketCapitalization' => $request->validated('marketCapitalization'),
                'sharePrice' => $request->validated('sharePrice'),
                'finnhubIndustry' => $request->validated('finnhubIndustry'),
            ]
        );

        // Add a stock to the user if a record of it doesn't exist, otherwise update
        $user->stocks()->syncWithoutDetaching($stock);
        $user->stocks()->updateExistingPivot($stock, ['amount'=>request('stockAmount')]);
        return new StockResource($stock);
    }

    /**
     * Display the specified resource.
     */
    public function show(Stock $stock)
    {
        return new StockResource($stock);
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
