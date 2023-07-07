<?php

namespace App\Http\Controllers;

use App\Http\Resources\CandleResource;
use App\Models\Candle;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCandleRequest;
use App\Http\Requests\UpdateCandleRequest;
use App\Models\Stock;
use Illuminate\Http\Request;

class CandleController extends Controller
{
    //    Index, store, show (not needed since we always need all the data), update, destroy
    public function index(Request $request)
    {
        // Return candle data from the currently browsed stock
        $stock = Stock::find($request->validated('ticker'));
        return CandleResource::collection($stock->candles()->get());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCandleRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Candle $candle)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Candle $candle)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCandleRequest $request, Candle $candle)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Candle $candle)
    {
        //
    }
}
