@extends('layouts.home')
@section('title', 'Login: Larapets 🐶')
@section('content')
    <section class="bg-[#0004] text-white rounded-lg w-96 p-8 flex flex-col gap-4 items-center justify-center">
        <h1 class="flex gap-4 justify-center items-center text-4xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#fff" viewBox="0 0 256 256">
                <path
                    d="M128,112a28,28,0,0,0-8,54.83V184a8,8,0,0,0,16,0V166.83A28,28,0,0,0,128,112Zm0,40a12,12,0,1,1,12-12A12,12,0,0,1,128,152Zm80-72H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a32,32,0,0,1,64,0V80H96ZM208,208H48V96H208V208Z">
                </path>
            </svg>
            Login
        </h1>
        
        <div class="card w-full max-w-sm">
                <form method="POST" action="{{ route('login') }}" class="card-body">
                    @csrf
                    <label class="label">Email</label>
                    <input type="text" name="email" class="input bg-[#0006] w-full outline-0" required placeholder="Email" value="{{ old('email') }}" />
                    @error('email')
                        <small class="badge badge-error w-full mt-1 py-5">{{ $message }}</small>
                    @enderror

                    <label class="label">Password</label>
                    <input type="password" class="input bg-[#0006] w-full outline-0" name="password" placeholder="Password" />
                    @error('password')
                        <small class="badge badge-error w-full mt-1 py-4">{{ $message }}</small>
                    @enderror

                    <button class="btn btn-outline hover:bg-[#fff6] hover:text-white mt-4">Login</button>

                    <p class="text-sm text-center mt-4">
                        Don’t have an account?
                        <a href="{{ route('register') }}" class="link link-default">
                            Sign up
                        </a>
                    </p>
                    <p class="text-sm text-center mt-2">
                        <a class="link link-default" href="{{ route('password.request') }}">Forgot your password?</a>
                    </p>
                </form>
            </div>
    </section>

@endsection
