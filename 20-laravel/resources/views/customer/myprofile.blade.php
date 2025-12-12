@extends('layouts.dashboard')

@section('title', 'Edit User:Larapets🐶')

@section('content')
    <h1
        class="text-4xl flex gap-2 items-center justify-center pb-4 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-lg shadow-md border-2 border-gray-300 mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" class="size-12" fill="#000" viewBox="0 0 256 256">
            <path
                d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM51.31,160,136,75.31,152.69,92,68,176.68ZM48,179.31,76.69,208H48Zm48,25.38L79.31,188,164,103.31,180.69,120Zm96-96L147.31,64l24-24L216,84.68Z">
            </path>
        </svg>
        My profile
    </h1>

    <div class="breadcrumbs text-sm bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 text-gray-800 mb-6">
        <ul>
            <li>
                <a href="{{ url('dashboard') }}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256">
                        <path
                            d="M207.06,72.67A111.24,111.24,0,0,0,128,40h-.4C66.07,40.21,16,91,16,153.13V176a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V152A111.25,111.25,0,0,0,207.06,72.67ZM224,176H119.71l54.76-75.3a8,8,0,0,0-12.94-9.42L99.92,176H32V153.13c0-3.08.15-6.12.43-9.13H56a8,8,0,0,0,0-16H35.27c10.32-38.86,44-68.24,84.73-71.66V80a8,8,0,0,0,16,0V56.33A96.14,96.14,0,0,1,221,128H200a8,8,0,0,0,0,16h23.67c.21,2.65.33,5.31.33,8Z">
                        </path>
                    </svg>
                    Dashboard
                </a>
            </li>
            <li>
                <a href="{{ url('users') }}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000"
                        viewBox="0 0 256 256">
                        <path
                            d="M75.19,198.4a8,8,0,0,0,11.21-1.6,52,52,0,0,1,83.2,0,8,8,0,1,0,12.8-9.6A67.88,67.88,0,0,0,155,165.51a40,40,0,1,0-53.94,0A67.88,67.88,0,0,0,73.6,187.2,8,8,0,0,0,75.19,198.4ZM128,112a24,24,0,1,1-24,24A24,24,0,0,1,128,112Zm72-88H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V40A16,16,0,0,0,200,24Zm0,192H56V40H200ZM88,64a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H96A8,8,0,0,1,88,64Z">
                        </path>
                    </svg>
                    My Profile
                </a>
            </li>
        </ul>
    </div>

    <section
        class="bg-[#0004] text-white rounded-lg md:w-[720px] w-[360px] p-8 flex flex-col gap-4 items-center justify-center">

        <div class="card w-full ">
            <form method="POST" action="{{ URL('myprofile/' . $user->id) }}" class="flex flex-col gap-4 card-body"
                enctype="multipart/form-data">
                @csrf
                @method('PUT')
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="w-full md:w-1/2">
                        <div
                            class="avatar flex flex-col items-center justify-center gap-2 cursor-pointer hover:scale-110 transition ease-in">
                            <div id="upload" class="mask mask-squircle w-48">
                                <img id="preview" src="{{ asset('images/' . $user->photo) }}" />
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
                            <option value="Male" @if (old('gender', $user->gender) == 'Male') selected @endif>Male</option>
                            <option value="Female" @if (old('gender', $user->gender) == 'Female') selected @endif>Female</option>
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
        $(document).ready(function() {
            $('#upload').click(function(e) {
                e.preventDefault()
                $('#photo').click()
            })
            $('#photo').change(function(e) {
                e.preventDefault()
                $('#preview').attr('src', window.URL.createObjectURL($(this).prop('files')[0]))
            })
        })
    </script>

@endsection