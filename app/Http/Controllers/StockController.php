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
        /* Attempt to store a stock if it doesn't exist, then attach it to the current user,
        If the stock already exists; attempt to update both itself and association
        */
        $user = User::find($request->user()->id);
        $stock = Stock::updateOrCreate(
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
        // TODO: to be used when data is (semi-) up-to-date and data can be accessed with our own back-end
        return new StockResource($stock);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStockRequest $request, Stock $stock)
    {
        // Currently not used since store already checks for update conditions
        // TODO: might implement whenever server-side TA is made available
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Stock $stock)
    {
        // Why -ever- delete our valuable data?
        // TODO: JK, needs to be implemented, most likely only possible with validated roles
    }
}
