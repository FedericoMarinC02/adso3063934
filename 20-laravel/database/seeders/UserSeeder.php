<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //ORM -> Eloquent
        $user = new User;
        $user->document  = 75000001;
        $user->fullname  = 'Jhon Wick';
        $user->gender    = 'Male';
        $user->birthdate = '1964-09-12';
        $user->phone     = '310000001';
        $user->email     = 'jhonwick@gmail.com';
        $user->password  = bcrypt('admin');
        $user->role      = 'Administrador';
        $user->save();

        // Insert ->Array
        DB::table('users')->insert([
            'document' => 750000002,
            'fullname' => 'Lara Croft',
            'gender' => 'Female',
            'birthdate' => '1992-02-14',
            'phone' => '31200001',
            'email' => 'lara@mail.com',
            'password'=> Hash::make('12345'),
            'created_at'=> now()
        ]);
    }
}