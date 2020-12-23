<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use Carbon\Carbon;

class MayorEdad implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        //  verifica que sea mayor de 18 años
        $fechaHoy = Carbon::now();
        $fechaNacimiento = Carbon::create($value);
        $edad = Carbon::parse($fechaNacimiento)->floatDiffInYears($fechaHoy);

        return $edad > 18;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'Usted no es mayor de edad. No puede registrarse.';
    }
}
