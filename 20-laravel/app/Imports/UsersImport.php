<?php

namespace App\Imports;
use App\Models\User;
use Maatwebsite\Excel\Concerns\ToModel;
use Illuminate\Support\Facades\Hash;

class UsersImport implements ToModel
{
	public function model(array $row)
	{
		// Use updateOrCreate to avoid duplicate key violations and to keep data in sync.
		$document = $row[0] ?? null;
		$email = isset($row[5]) ? trim($row[5]) : null;
		if (!$email && !$document) {
			// Without a unique identifier, skip
			return null;
		}

		// Try to find existing user by email or document to avoid unique constraint errors
		$user = User::where(function ($query) use ($email, $document) {
			if ($email) $query->orWhere('email', $email);
			if ($document) $query->orWhere('document', $document);
		})->first();

		$data = [
			'document'  => $document,
			'fullname'  => $row[1] ?? null,
			'gender'    => $row[2] ?? null,
			'birthdate' => $row[3] ?? null,
			'phone'     => $row[4] ?? null,
			'email'     => $email,
			'password'  => Hash::make($row[6] ?? 'password'),
		];

		if ($user) {
			$user->update($data);
			return $user;
		}

		return User::create($data);
	}
}