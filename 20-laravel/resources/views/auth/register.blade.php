{{-- <x-guest-layout>
    <form method="POST" action="{{ route('register') }}">
        @csrf

        <!-- Name -->
        <div>
            <x-input-label for="name" :value="('Name')" />
            <x-text-input id="name" class="block mt-1 w-full" type="text" name="name" :value="old('name')" required autofocus autocomplete="name" />
            <x-input-error :messages="$errors->get('name')" class="mt-2" />
        </div>

        <!-- Email Address -->
        <div class="mt-4">
            <x-input-label for="email" :value="('Email')" />
            <x-text-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')" required autocomplete="username" />
            <x-input-error :messages="$errors->get('email')" class="mt-2" />
        </div>

        <!-- Password -->
        <div class="mt-4">
            <x-input-label for="password" :value="('Password')" />

            <x-text-input id="password" class="block mt-1 w-full"
                            type="password"
                            name="password"
                            required autocomplete="new-password" />

            <x-input-error :messages="$errors->get('password')" class="mt-2" />
        </div>

        <!-- Confirm Password -->
        <div class="mt-4">
            <x-input-label for="password_confirmation" :value="('Confirm Password')" />

            <x-text-input id="password_confirmation" class="block mt-1 w-full"
                            type="password"
                            name="password_confirmation" required autocomplete="new-password" />

            <x-input-error :messages="$errors->get('password_confirmation')" class="mt-2" />
        </div>

        <div class="flex items-center justify-end mt-4">
            <a class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" href="{{ route('login') }}">
                {{ __('Already registered?') }}
            </a>

            <x-primary-button class="ms-4">
                {{ __('Register') }}
            </x-primary-button>
        </div>
    </form>
</x-guest-layout> --}}


@extends('layouts.home')

@section('title', 'Register: Larapets 🐶')
@section('content')

    <section class="bg-[#0004] text-white rounded-lg md:w-[640px] w-[360px] p-8 flex flex-col gap-4 items-center justify-center">
        <h1 class="flex gap-4 justify-center items-center text-4xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#fff" viewBox="0 0 256 256"><path d="M256,136a8,8,0,0,1-8,8H232v16a8,8,0,0,1-16,0V144H200a8,8,0,0,1,0-16h16V112a8,8,0,0,1,16,0v16h16A8,8,0,0,1,256,136Zm-57.87,58.85a8,8,0,0,1-12.26,10.3C165.75,181.19,138.09,168,108,168s-57.75,13.19-77.87,37.15a8,8,0,0,1-12.25-10.3c14.94-17.78,33.52-30.41,54.17-37.17a68,68,0,1,1,71.9,0C164.6,164.44,183.18,177.07,198.13,194.85ZM108,152a52,52,0,1,0-52-52A52.06,52.06,0,0,0,108,152Z">                
            </path>
            </svg>
            Register
        </h1>
            <div class="card w-full ">
                <form method="POST" action="{{ route('register') }}" class="flex flex-col gap-4 card-body">
                    @csrf
                    
                    <!-- Dos columnas -->
                    <div class="flex flex-col md:flex-row gap-4">
                        <div class="w-full md:w-1/2">
                            {{-- Document --}}
                            <label class="label">Document</label>
                            <input type="text" class="input bg-[#0006] w-full mt-1 outline-0" name="document" placeholder="753921345" value="{{ old('document') }}"/>
                            @error('document')
                            <small class="badge badge-outline badge-error w-full mt-1 text-xs py-4">{{ $message }}</small>
                            @enderror
                            
                            {{-- FullName --}}
                            <label class="label">FullName</label>
                            <input type="text" class="input bg-[#0006] w-full mt-1 outline-0" name="fullname" placeholder="John Doe" value="{{ old('fullname') }}"/>
                            @error('fullname')
                            <small class="badge badge-outline badge-error w-full mt-1 text-xs py-4">{{ $message }}</small>
                            @enderror
                            
                            {{-- Gender --}}
                            <label class="label">Gender</label>
                            <select name="gender" class="select bg-[#0009] w-full outline-0">
                                <option value="">Select...</option>
                                <option value="male" @if(old('gender') == 'male') selected @endif>Male</option>
                                <option value="female" @if(old('gender') == 'female') selected @endif>Female</option>
                            </select>
                            @error('gender')
                            <small class="badge badge-outline badge-error w-full mt-1 text-xs py-4">{{ $message }}</small>
                            @enderror

                            {{-- Birthdate --}}
                            <label class="label">Birthdate</label>
                            <input type="date" class="input bg-[#0006] w-full mt-1 outline-0" name="birthdate" placeholder="1999-10-29" value="{{ old('birthdate') }}"/>
                            @error('birthdate')
                            <small class="badge badge-outline badge-error w-full mt-1 text-xs py-4">{{ $message }}</small>
                            @enderror
                        </div>

                        <div class="w-full md:w-1/2">
                            {{-- Phone --}}
                            <label class="label">Phone</label>
                            <input type="text" class="input bg-[#0006] w-full mt-1 outline-0" name="phone" placeholder="123-456-7890" value="{{ old('phone') }}"/>
                            @error('phone')
                            <small class="badge badge-outline badge-error w-full mt-1 text-xs py-4">{{ $message }}</small>
                            @enderror

                            {{-- Email --}}
                            <label class="label">Email</label>
                            <input type="text" name="email" class="input bg-[#0006] w-full outline-0" required placeholder="Email" value="{{ old('email') }}" />
                            @error('email')
                                <small class="badge badge-error w-full mt-1 py-3">{{ $message }}</small>
                            @enderror

                            {{-- Password --}}
                            <label class="label">Password</label>
                            <input type="password" class="input bg-[#0006] w-full outline-0" name="password" placeholder="Password" />
                            @error('password')
                                <small class="badge badge-error w-full mt-1 py-3">{{ $message }}</small>
                            @enderror

                            {{-- Confirm Password --}}
                            <label class="label">Confirm Password</label>
                            <input type="password" class="input bg-[#0006] w-full outline-0" name="password_confirmation" placeholder="Password" />
                        </div>
                    </div>

                    <!-- Botón debajo de las dos columnas -->
                    <button class="btn btn-outline hover:bg-[#fff6] hover:text-white mt-4">Register</button>

                    <p class="text-sm text-center">
                        <a class="link link-default" href="{{route('login')}}">
                           Already have an account? Login 
                        </a>
                    </p>
                    
                </form>
            </div>
    </section>

@endsection