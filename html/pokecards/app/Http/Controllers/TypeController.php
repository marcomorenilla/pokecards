<?php

namespace App\Http\Controllers;

use App\Models\Type;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;

class TypeController extends Controller
{
    public function createTypes(Request $request)
    {
        @unlink(storage_path('logs/poke.log'));
        $typesArray = $request->input('types');
        Log::channel('custom')->info('types array count -  ' . count($typesArray));

        $typeIds =  collect($typesArray)->map(function ($typeName) {
            Log::channel('custom')->info('types names - ' . $typeName['type'] . ' - ' . $typeName['type_color']);
            return Type::firstOrCreate(['type' => $typeName['type']], ['type_color' => $typeName['type_color']]);
        });
    }
}
