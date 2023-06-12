<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Stock extends Model
{
    use HasFactory;

    protected $fillable = ['ticker', 'name', 'currency', 'marketCapitalization', 'finnhubIndustry'];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_stock');
    }
}
