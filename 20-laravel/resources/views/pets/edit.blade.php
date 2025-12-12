@extends('layouts.dashboard')

@section('title', 'Edit Pet:Larapets🐶')

@section('content')
    <h1
        class="text-4xl flex gap-2 items-center justify-center pb-4 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-lg shadow-md border-2 border-gray-300 mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" class="size-12" fill="#000" viewBox="0 0 256 256">
            <path
                d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM51.31,160,136,75.31,152.69,92,68,176.68ZM48,179.31,76.69,208H48Zm48,25.38L79.31,188,164,103.31,180.69,120Zm96-96L147.31,64l24-24L216,84.68Z">
            </path>
        </svg>
        Edit Pet
    </h1>

    <div class="breadcrumbs text-sm bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 text-gray-800 mb-6">
        <ul>
            <li>
                <a href="{{ url('dashboard') }}">
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-4" fill="currentColor" viewBox="0 0 256 256">
                        <path
                            d="M104,40H56A16,16,0,0,0,40,56v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,104,40Zm0,64H56V56h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,64H152V56h48v48Zm-96,32H56a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,104,136Zm0,64H56V152h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,200,136Zm0,64H152V152h48v48Z">
                        </path>
                    </svg>
                    Dashboard
                </a>
            </li>
            <li>
                <a href="{{ url('pets') }}">
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-4" fill="currentColor" viewBox="0 0 256 256"
                        viewBox="0 0 256 256">
                        <path
                            d="M212,80a28,28,0,1,0,28,28A28,28,0,0,0,212,80Zm0,40a12,12,0,1,1,12-12A12,12,0,0,1,212,120ZM72,108a28,28,0,1,0-28,28A28,28,0,0,0,72,108ZM44,120a12,12,0,1,1,12-12A12,12,0,0,1,44,120ZM92,88A28,28,0,1,0,64,60,28,28,0,0,0,92,88Zm0-40A12,12,0,1,1,80,60,12,12,0,0,1,92,48Zm72,40a28,28,0,1,0-28-28A28,28,0,0,0,164,88Zm0-40a12,12,0,1,1-12,12A12,12,0,0,1,164,48Zm23.12,100.86a35.3,35.3,0,0,1-16.87-21.14,44,44,0,0,0-84.5,0A35.25,35.25,0,0,1,69,148.82,40,40,0,0,0,88,224a39.48,39.48,0,0,0,15.52-3.13,64.09,64.09,0,0,1,48.87,0,40,40,0,0,0,34.73-72ZM168,208a24,24,0,0,1-9.45-1.93,80.14,80.14,0,0,0-61.19,0,24,24,0,0,1-20.71-43.26,51.22,51.22,0,0,0,24.46-30.67,28,28,0,0,1,53.78,0,51.27,51.27,0,0,0,24.53,30.71A24,24,0,0,1,168,208Z">
                        </path>
                    </svg>
                    Pets Module
                </a>
            </li>
            <li>
                <span class="inline-flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-4" fill="currentColor" viewBox="0 0 256 256">
                        <path
                            d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-88a8,8,0,0,1-8,8H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32A8,8,0,0,1,176,128Z">
                        </path>
                    </svg>
                    Add Pet
                </span>
            </li>
        </ul>
    </div>

    <section
        class="bg-[#0004] text-white rounded-lg md:w-[720px] w-[360px] p-8 flex flex-col gap-4 items-center justify-center">

        <div class="card w-full ">
            <form method="POST" action="{{ url('pets/' . $pet->id) }}" class="flex flex-col gap-4 card-body"
                enctype="multipart/form-data">
                @csrf
                @method('PUT')
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="w-full md:w-1/2">
                        <div
                            class="avatar flex flex-col items-center justify-center gap-2 cursor-pointer hover:scale-110 transition ease-in">
                            <div id="upload" class="mask mask-squircle w-48">
                                <img id="preview" src="{{ asset('images/' . $pet->image) }}" />
                            </div>
                            <small class="pb-0 border-white border-b flex gap-1 items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="size-5" fill="#fff" viewBox="0 0 256 256">
                                    <path
                                        d="M208,40H48A24,24,0,0,0,24,64V176a24,24,0,0,0,24,24H208a24,24,0,0,0,24-24V64A24,24,0,0,0,208,40Zm8,136a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V64a8,8,0,0,1,8-8H208a8,8,0,0,1,8,8Zm-48,48a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,224ZM157.66,106.34a8,8,0,0,1-11.32,11.32L136,107.31V152a8,8,0,0,1-16,0V107.31l-10.34,10.35a8,8,0,0,1-11.32-11.32l24-24a8,8,0,0,1,11.32,0Z">
                                    </path>
                                </svg>
                                Upload Photo
                            </small>
                            @error('image')
                                <small class="badge badge-error w-full mt-1 py-4">{{ $message }}</small>
                            @enderror
                        </div>
                        <input type="file" id="image" name="image" class="hidden" accept="image/*">
                        <input type="hidden" name="originimage" value="{{ $pet->image }}">
                    </div>
                    <div class="w-full md:w-1/2">
                        {{-- Name --}}
                        <label class="label">Name</label>
                        <input type="text" class="input bg-[#0006] w-full mt-1 outline-0" name="name"
                            placeholder="Fido" value="{{ old('name', $pet->name) }}" />
                        @error('name')
                            <small class="badge badge-error w-full mt-1 py-4">{{ $message }}</small>
                        @enderror

                        {{-- Kind --}}
                        <label class="label">Kind</label>
                        <select name="kind" class="select bg-[#0009] w-full outline-0">
                            <option value="">Select...</option>
                            <option value="Dog" @if (old('kind', $pet->kind) == 'Dog') selected @endif>Dog</option>
                            <option value="Cat" @if (old('kind', $pet->kind) == 'Cat') selected @endif>Cat</option>
                            <option value="Pig" @if (old('kind', $pet->kind) == 'Pig') selected @endif>Pig</option>
                            <option value="Bird" @if (old('kind', $pet->kind) == 'Bird') selected @endif>Bird</option>
                        </select>
                        @error('kind')
                            <small class="badge badge-error w-full mt-1 py-4">{{ $message }}</small>
                        @enderror

                    </div>

                    <div class="w-full md:w-1/2">
                        {{-- Breed --}}
                        <label class="label">Breed</label>
                        <input type="text" class="input bg-[#0006] w-full mt-1 outline-0" name="breed"
                            placeholder="Labrador" value="{{ old('breed', $pet->breed) }}" />
                        @error('breed')
                            <small class="badge badge-error w-full mt-1 py-4">{{ $message }}</small>
                        @enderror

                        {{-- Weight --}}
                        <label class="label">Weight (kg)</label>
                        <input type="number" step="0.1" class="input bg-[#0006] w-full mt-1 outline-0" name="weight"
                            placeholder="12.5" value="{{ old('weight', $pet->weight) }}" />
                        @error('weight')
                            <small class="badge badge-error w-full mt-1 py-4">{{ $message }}</small>
                        @enderror

                        {{-- Age --}}
                        <label class="label">Age (years)</label>
                        <input type="number" class="input bg-[#0006] w-full mt-1 outline-0" name="age" placeholder="3"
                            value="{{ old('age', $pet->age) }}" />
                        @error('age')
                            <small class="badge badge-error w-full mt-1 py-4">{{ $message }}</small>
                        @enderror

                        {{-- Location --}}
                        <label class="label">Location</label>
                        <input type="text" class="input bg-[#0006] w-full mt-1 outline-0" name="location"
                            placeholder="City / Shelter" value="{{ old('location', $pet->location) }}" />
                        @error('location')
                            <small class="badge badge-error w-full mt-1 py-4">{{ $message }}</small>
                        @enderror

                        {{-- Description --}}
                        <label class="label">Description</label>
                        <textarea name="description" class="textarea bg-[#0006] w-full mt-1 outline-0" rows="3"
                            placeholder="Short description">{{ old('description', $pet->description) }}</textarea>
                        @error('description')
                            <small class="badge badge-error w-full mt-1 py-4">{{ $message }}</small>
                        @enderror

                        {{-- Active --}}
                        <label class="label">Active</label>
                        <select name="active" class="select bg-[#0009] w-full outline-0">
                            <option value="1" @if (old('active', $pet->active) == 1) selected @endif>Active</option>
                            <option value="0" @if (old('active', $pet->active) == 0) selected @endif>Inactive</option>
                        </select>
                        @error('active')
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
            $('#image').click()
        })
        $('#image').change(function(e) {
            e.preventDefault()
            $('#preview').attr('src', window.URL.createObjectURL($(this).prop('files')[0]))
        })
    })
</script>@endsection
