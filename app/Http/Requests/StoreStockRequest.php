<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreStockRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Currently like this for simplicity
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'ticker' => 'required|string',
            'name' => 'required|string|max:255',
            'currency' => 'string',
            'marketCapitalization' => 'numeric',
            'sharePrice' => 'numeric',
            'finnhubIndustry' => 'string',
        ];
    }
}
