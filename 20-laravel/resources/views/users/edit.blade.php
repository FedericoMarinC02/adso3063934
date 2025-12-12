@extends('layouts.dashboard')

@section('title', 'Edit User:Larapets🐶')

@section('content')
    <h1 class="text-4xl flex gap-2 items-center justify-center pb-4 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-lg shadow-md border-2 border-gray-300 mb-6"  >
        <svg xmlns="http://www.w3.org/2000/svg" class="size-12" fill="#000" viewBox="0 0 256 256">
            <path
                d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM51.31,160,136,75.31,152.69,92,68,176.68ZM48,179.31,76.69,208H48Zm48,25.38L79.31,188,164,103.31,180.69,120Zm96-96L147.31,64l24-24L216,84.68Z">
            </path>
        </svg>
        Edit User
    </h1>

    <div class="breadcrumbs text-sm">
        <ul>
            <li>
                <a href="{{ url('dashboard') }}">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-4 w-4 stroke-current">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                    </svg>
                    Dashboard
                </a>
            </li>
            <li>
                <a href="{{ url('users') }}">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-4 w-4 stroke-current">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                    </svg>
                    User Module
                </a>
            </li>
            <li>
                <span class="inline-flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-4 w-4 stroke-current">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                        </path>
                    </svg>
                    Add User
                </span>
            </li>
        </ul>
    </div>

    <section
        class="bg-[#0004] text-white rounded-lg md:w-[720px] w-[360px] p-8 flex flex-col gap-4 items-center justify-center">

        <div class="card w-full ">
            <form method="POST" action="{{ URL('users/'.$user->id) }}" class="flex flex-col gap-4 card-body"
                enctype="multipart/form-data">
                @csrf
                @method('PUT')
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="w-full md:w-1/2">
                        <div
                            class="avatar flex flex-col items-center justify-center gap-2 cursor-pointer hover:scale-110 transition ease-in">
                            <div id="upload" class="mask mask-squircle w-48">
                                <img id="preview" src="{{asset('images/'.$user->photo)}}" />
                            </div>
                            <small class="pb-0 border-white border-b flex gap-1 items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="size-5" fill="#fff" viewBox="0 0 256 256">
                                    <path
                                        d="M208,40H48A24,24,0,0,0,24,64V176a24,24,0,0,0,24,24H208a24,24,0,0,0,24-24V64A24,24,0,0,0,208,40Zm8,136a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V64a8,8,0,0,1,8-8H208a8,8,0,0,1,8,8Zm-48,48a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,224ZM157.66,106.34a8,8,0,0,1-11.32,11.32L136,107.31V152a8,8,0,0,1-16,0V107.31l-10.34,10.35a8,8,0,0,1-11.32-11.32l24-24a8,8,0,0,1,11.32,0Z">
                                    </path>
                                </svg>
                                Upload Photo
                            </small>
                            @error('photo')
                                <small class="badge badge-error w-full mt-1 py-4">{{ $message }}</small>
                            @enderror
                        </div>
                        <input type="file" id="photo" name="photo" class="hidden" accept="image/*">
                        <input type="hidden" name="originphoto" value="{{ $user->photo }}">
                    </div>
                    <div class="w-full md:w-1/2">
                        {{-- Document --}}
                        <label class="label">Document</label>
                        <input type="text" class="input bg-[#0006] w-full mt-1 outline-0" name="document"
                            placeholder="753921345" value="{{ old('document', $user->document) }}" />
                        @error('document')
                            <small class="badge badge-error w-full mt-1 py-4">{{ $message }}</small>
                        @enderror

                        {{-- FullName --}}
                        <label class="label">FullName</label>
                        <input type="text" class="input bg-[#0006] w-full mt-1 outline-0" name="fullname"
                            placeholder="John Doe" value="{{ old('fullname', $user->fullname) }}" />
                        @error('fullname')
                            <small class="badge badge-error w-full mt-1 py-4">{{ $message }}</small>
                        @enderror

                        {{-- Gender --}}
                        <label class="label">Gender</label>
                        <select name="gender" class="select bg-[#0009] w-full outline-0">
                            <option value="">Select...</option>
                            <option value="Male" @if(old('gender', $user->gender) == 'Male') selected @endif>Male</option>
                            <option value="Female" @if(old('gender', $user->gender) == 'Female') selected @endif>Female</option>
                        </select>
                        @error('gender')
                            <small class="badge badge-error w-full mt-1 py-4">{{ $message }}</small>
                        @enderror

                        
                    </div>

                    <div class="w-full md:w-1/2">
                        {{-- Birthdate --}}
                        <label class="label">Birthdate</label>
                        <input type="date" class="input bg-[#0006] w-full mt-1 outline-0" name="birthdate"
                            placeholder="1999-10-29" value="{{ old('birthdate', $user->birthdate) }}" />
                        @error('birthdate')
                            <small class="badge badge-error w-full mt-1 py-4">{{ $message }}</small>
                        @enderror
                        {{-- Phone --}}
                        <label class="label">Phone</label>
                        <input type="text" class="input bg-[#0006] w-full mt-1 outline-0" name="phone"
                            placeholder="123-456-7890" value="{{ old('phone', $user->phone) }}" />
                        @error('phone')
                            <small class="badge badge-error w-full mt-1 py-4">{{ $message }}</small>
                        @enderror

                        {{-- Email --}}
                        <label class="label">Email</label>
                        <input type="text" name="email" class="input bg-[#0006] w-full outline-0" required
                            placeholder="Email" value="{{ old('email', $user->email) }}" />
                        @error('email')
                            <small class="badge badge-error w-full mt-1 py-4">{{ $message }}</small>
                        @enderror
                    </div>
                </div>

                <!-- Botón debajo de las dos columnas -->
                <button class="btn btn-outline hover:bg-[#fff6] hover:text-white mt-4">Edit</button>

            </form>
        </div>
    </section>

@endsection

@section('js')
    <script>
        $(document).ready(function () {
            $('#upload').click(function (e) {
                e.preventDefault()
                $('#photo').click()
            })
            $('#photo').change(function (e) {
                e.preventDefault()
                $('#preview').attr('src', window.URL.createObjectURL($(this).prop('files')[0]))
            })
        })
    </script>

@endsection