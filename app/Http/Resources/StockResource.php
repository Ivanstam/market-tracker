<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StockResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'symbol' =>$this->ticker,
            'description' => $this->name,
            'currency' => $this->currency,
            'marketCapitalization' => $this->marketCapitalization,
            'sharePrice' => $this->sharePrice,
            'type' => $this->finnhubIndustry,
            'shareAmount' => $this->users()->first()->pivot->amount,
        ];
    }
}
