<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
	public function __construct(protected readonly UserService $userService) {}

    public function show(User $user): JsonResponse
    {
        return response()->json($user);
    }

    public function update(Request $request, User $user)
    {
        //
    }

    public function destroy(Request $request, User $user): JsonResponse
    {
        return $this->userService->deleteUser($request, $user);
    }
}
