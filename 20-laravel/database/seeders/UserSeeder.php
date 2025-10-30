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
        $user->document = 75000001;
        $user->fullname = 'John Wick';
        $user->gender = 'Male';
        $user->birthdate = '1964-09-12';
        $user->phone = '3100000001';
        $user->email = 'johnw@mail.com';
        $user->password = bcrypt('admin');
        $user->role = 'Administrator'; 
        $user->save();
        
        //insert -> array
        DB::table('users')->insert([
            [
                'document' => 75000002,
                'fullname' => 'Lara Croft', 
                'gender' => 'Female',
                'birthdate' => '1990-02-14',
                'phone' => '3100000002',
                'email' => 'larac@email.com',
                'password' => Hash::make('12345'),
                'created_at' => now()
            ]
        ]);
    }
}
