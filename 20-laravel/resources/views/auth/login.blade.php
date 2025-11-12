
@extends('layouts.home')

@section('title', 'Login: Larapets 🐶')

@section('content')
<section class="bg-[#0006] text-white rounded-lg w-96 gap-2 p-8 flex flex-col items-center justify-center">
    <h1 class="flex gap-2 justify-center items-center text-4xl">
        <svg xmlns="http://www.w3.org/2000/svg" class="size-12" fill="currentColor" viewBox="0 0 256 256">
            <path
                d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z">
            </path>
        </svg>
        Login
    </h1>
    <form method="POST" action="{{ route('login') }}" class="card-body">
        @csrf
        <label class="label ">Email</label>
        <input type="text" name="email" class="input bg-[#0006] w-full mt-1 outline-0" required placeholder="Email" />
        @error('email')
        <small class="badge badge-outline badge-error w-full mt-1 py-5">{{ $message }}</small>
        @enderror

        <label class="label">Password</label>
        <input type="password" name="password" class="input bg-[#0006] w-full mt-1 outline-0" placeholder="Password" />
        @error('password')
        <small class="badge badge-outline badge-error w-full mt-1">{{ $message }}</small>
        @enderror

        <button class="btn btn-outline hover:bg-[#fff6] hover:text-white mt-4">Login</button>

        <p class="text-sm text-center mt-4">
            Don’t have an account?
            <a href="{{ route('register') }}" class="link link-default">
                Sign up
            </a>
        </p>
        <p class="text-sm text-center mt-2">
            <a class="link link-default" href="{{ route('password.request') }}">
                Forgot your password?
            </a>
        </p>
                 
    </form>
            </div>
    </form>
</section>
@endsection