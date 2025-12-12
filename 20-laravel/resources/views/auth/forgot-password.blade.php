@extends('layouts.home')
@section('title', 'Forgot your password: Larapets 🐶')
@section('content')
    <section class="bg-[#0007] text-white rounded-lg w-5/12 p-8 flex flex-col gap-3 items-center justify-center">
        <h1 class="flex gap-4 justify-center items-center text-4xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#fff" viewBox="0 0 256 256"><path d="M48,56V200a8,8,0,0,1-16,0V56a8,8,0,0,1,16,0Zm92,54.5L120,117V96a8,8,0,0,0-16,0v21L84,110.5a8,8,0,0,0-5,15.22l20,6.49-12.34,17a8,8,0,1,0,12.94,9.4l12.34-17,12.34,17a8,8,0,1,0,12.94-9.4l-12.34-17,20-6.49A8,8,0,0,0,140,110.5ZM246,115.64A8,8,0,0,0,236,110.5L216,117V96a8,8,0,0,0-16,0v21l-20-6.49a8,8,0,0,0-4.95,15.22l20,6.49-12.34,17a8,8,0,1,0,12.94,9.4l12.34-17,12.34,17a8,8,0,1,0,12.94-9.4l-12.34-17,20-6.49A8,8,0,0,0,246,115.64Z">
            </path>
        </svg>
            Forgot your password?
        </h1>
        <div class="divider divider-neutral p-[0] m-[0]"></div>

        <p>Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one</p>
        <div class="card w-full max-w-sm ">
            <form method="POST" action="{{ route('password.email') }}" class="card-body ">
                @csrf
                <label class="label ">Email</label>
                <input type="text" name="email" class="input bg-[#0006] w-full mt-1 outline-0" required
                    placeholder="Email" />
                @error('email')
                    <small class="badge badge-outline badge-error w-full mt-1">{{ $message }}</small>
                @enderror
                
                <button class="btn btn-outline hover:bg-[#fff6] hover:text-white mt-4">Submit</button>

                <a href="{{ route('login') }}" class="btn btn-outline hover:bg-[#fff6] hover:text-white mt-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#fff" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-88a8,8,0,0,1-8,8H107.31l18.35,18.34a8,8,0,0,1-11.32,11.32l-32-32a8,8,0,0,1,0-11.32l32-32a8,8,0,0,1,11.32,11.32L107.31,120H168A8,8,0,0,1,176,128Z">
                        </path>
                    </svg>
                    Back
                </a>

                
                </p>
            </form>
        </div>
    </section>

@endsection
