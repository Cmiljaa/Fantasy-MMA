<?php

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class UserService {

	public function deleteUser(Request $request, User $user): JsonResponse
	{
		Auth::logout();
		$request->session()->invalidate();
		$request->session()->regenerateToken();

		$user->delete();

		return response()->json([
			"success" => true,
			"message" => "User successfully deleted."
		]);
	}
}
