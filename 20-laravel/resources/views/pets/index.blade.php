@extends('layouts.dashboard')

@section('title', 'Module Pets: Larapets 🐶')

@section('content')

    <h1
        class="text-4xl flex gap-2 items-center justify-center pb-4 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-lg shadow-md border-2 border-gray-300">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256">
            <path
                d="M212,80a28,28,0,1,0,28,28A28,28,0,0,0,212,80Zm0,40a12,12,0,1,1,12-12A12,12,0,0,1,212,120ZM72,108a28,28,0,1,0-28,28A28,28,0,0,0,72,108ZM44,120a12,12,0,1,1,12-12A12,12,0,0,1,44,120ZM92,88A28,28,0,1,0,64,60,28,28,0,0,0,92,88Zm0-40A12,12,0,1,1,80,60,12,12,0,0,1,92,48Zm72,40a28,28,0,1,0-28-28A28,28,0,0,0,164,88Zm0-40a12,12,0,1,1-12,12A12,12,0,0,1,164,48Zm23.12,100.86a35.3,35.3,0,0,1-16.87-21.14,44,44,0,0,0-84.5,0A35.25,35.25,0,0,1,69,148.82,40,40,0,0,0,88,224a39.48,39.48,0,0,0,15.52-3.13,64.09,64.09,0,0,1,48.87,0,40,40,0,0,0,34.73-72ZM168,208a24,24,0,0,1-9.45-1.93,80.14,80.14,0,0,0-61.19,0,24,24,0,0,1-20.71-43.26,51.22,51.22,0,0,0,24.46-30.67,28,28,0,0,1,53.78,0,51.27,51.27,0,0,0,24.53,30.71A24,24,0,0,1,168,208Z">
            </path>
        </svg>

        module pets
    </h1>

    {{-- Options --}}
    <div class="flex flex-wrap items-center gap-3 mb-4">
        <a href="{{ url('pets/create') }}"
            class="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-teal-400 bg-white text-teal-600 shadow-sm hover:bg-teal-600 hover:text-white hover:shadow-md transition"
            href="{{ url('pets/create') }}">
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5v14m7-7H5" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>
            <span class="hidden md:inline">Add Pet</span>
        </a>

        <a href="{{ url('export/pets/pdf') }}"
            class="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-teal-400 bg-white text-teal-600 shadow-sm hover:bg-teal-600 hover:text-white hover:shadow-md transition">
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 2h9l5 5v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
            </svg>
            <span class="hidden md:inline">Export PDF</span>
        </a>

        <a href="{{ url('export/pets/excel') }}"
            class="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-yellow-400 bg-white text-yellow-600 shadow-sm hover:bg-yellow-500 hover:text-white hover:shadow-md transition">
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 3H5a2 2 0 0 0-2 2v14l4-4h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" />
            </svg>
            <span class="hidden md:inline">Export Excel</span>
        </a>
    </div>

    {{-- Search --}}
    <label class="input outline-none mb-10">
        <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
            </g>
        </svg>
        <input id="qsearch" type="search" placeholder="Search..." name="qsearch" />
    </label>

    @if (session('success'))
        <div role="alert" class="alert alert-success">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{{ session('success') }}</span>
        </div>
    @endif
    @if (session('error'))
        <div role="alert" class="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2 2 2m-2-2v6M12 8v.01" />
            </svg>
            <span>{{ session('error') }}</span>
        </div>
    @endif


    {{-- Table --}}
    <div class="overflow-x-auto rounded-box border text-white bg-[#0009]">
        <table class="table">
            <!-- head -->
            <thead>
                <tr class="text-white">
                    <th class="hidden md:table-cell">Id</th>
                    <th>Image</th>
                    <th>Kind</th>
                    <th>Name</th>
                    <th class="hidden md:table-cell">Breed</th>
                    <th class="hidden md:table-cell">Description</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody class="datalist">
                @foreach ($pets as $pet)
                    <tr @if ($pet->id % 2 == 0) class="bg-[#0006]" @endif>
                        <th class="hidden md:table-cell">{{ $pet->id }}</th>
                        <td>
                            <div class="avatar">
                                <div class="mask mask-squircle w-20 bg-white">
                                    <img src="{{ asset('images/' . $pet->image) }}" />
                                </div>
                            </div>
                        </td>
                        <td>
                            @if ($pet->kind == 'Dog')
                                <div class="badge badge-success">Dog</div>
                            @elseif ($pet->kind == 'Cat')
                                <div class="badge badge-primary">Cat</div>
                            @elseif ($pet->kind == 'Pig')
                                <div class="badge badge-secondary">Pig</div>
                            @elseif ($pet->kind == 'Bird')
                                <div class="badge badge-warning">Bird</div>
                            @else
                                <div class="badge">{{ $pet->kind }}</div>
                            @endif
                        </td>
                        <td>{{ $pet->name }}</td>
                        <td class="hidden md:table-cell">{{ $pet->breed }}</td>
                        <td class="hidden md:table-cell truncate max-w-xs" title="{{ $pet->description }}">{{ Str::limit($pet->description, 50) }}</td>
                        <td>
                            @if ($pet->status == 1)
                                <div class="badge badge-outline badge-success">Available</div>
                            @else
                                <div class="badge badge-outline badge-warning">Adopted</div>
                            @endif
                        </td>
                        <td>
                            <a class="btn btn-xs" href="{{ url('pets/' . $pet->id) }}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000"
                                    viewBox="0 0 256 256">
                                    <path
                                        d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z">
                                    </path>
                                </svg>
                            </a>
                            <a class="btn btn-xs" href="{{ url('pets/' . $pet->id . '/edit') }}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000"
                                    viewBox="0 0 256 256">
                                    <path
                                        d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM51.31,160,136,75.31,152.69,92,68,176.68ZM48,179.31,76.69,208H48Zm48,25.38L79.31,188,164,103.31,180.69,120Zm96-96L147.31,64l24-24L216,84.68Z">
                                    </path>
                                </svg>
                            </a>
                            <a class="btn btn-error btn-xs btn-delete" href="javascript:void(0);"
                                data-name="{{ $pet->name }}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff"
                                    viewBox="0 0 256 256">
                                    <path
                                        d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z">
                                    </path>
                                </svg>
                            </a>
                            <form class="hidden" method="POST" action="{{ url('pets/' . $pet->id) }}">
                                @csrf
                                @method('delete')
                            </form>
                        </td>
                    </tr>
                @endforeach
                <tr class="bg-[#0009]">
                    <td colspan="8">{{ $pets->links('layouts.pagination') }}</td>
                </tr>
            </tbody>
        </table>
    </div>

    <button class="btn hidden" onclick="modal_message.showModal()">open modal</button>
    <dialog id="modal_message" class="modal">
        <div class="modal-box bg-black text-white">
            <h3 class="text-lg font-bold">Congratulations!</h3>
            <div role="alert" class="alert alert-success">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{{ session('success') }}</span>
            </div>
        </div>
        <form method="dialog" class="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>

    <!-- Delete Modal -->
    <dialog id="modal_delete" class="modal">
        <div class="modal-box bg-red-50">
            <h3 class="text-lg font-bold text-red-700">Are you sure?</h3>
            <p class="py-4 text-gray-700">You are about to delete the pet: <strong class="name"></strong></p>
            <div class="modal-action">
                <form method="dialog">
                    <button class="btn">Cancel</button>
                </form>
                <button class="btn btn-error btn-confirm">Confirm Delete</button>
            </div>
        </div>
        <form method="dialog" class="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>
@endsection

@section('js')
    <script>
        $(document).ready(function() {
            //Modal
            const modal_message = document.getElementById('modal_message');
            @if (session('success'))
                modal_message.showModal();
            @endif
            //Delete
            $('table').on('click', '.btn-delete', function() {
                $name = $(this).data('name')
                $('.name').text($name)
                $frm = $(this).next()
                modal_delete.showModal()
            })
            $('.btn-confirm').click(function(e) {
                e.preventDefault()
                $frm.submit()
            })

            // Search
            function debounce(func, wait) {
                let timeout
                return function executedFunction(...args) {
                    const later = () => {
                        clearTimeout(timeout)
                        func(...args)
                    };
                    clearTimeout(timeout)
                    timeout = setTimeout(later, wait)
                }
            }
            const search = debounce(function(query) {

                $token = $('meta[name=csrf-token]').attr('content')

                $.post("{{ url('search/pets') }}", {
                        'qsearch': query,
                        '_token': $token
                    },
                    function(data) {
                        $('.datalist').html(data).hide().fadeIn(1000)
                    }
                )
            }, 500)
            $('body').on('input', '#qsearch', function(event) {
                event.preventDefault()
                const query = $(this).val()

                $('.datalist').html(`<tr>
                                        <td colspan="8" class="text-center py-18">
                                            <span class="loading loading-spinner text-warning"></span>
                                        </td>
                                    </tr>`)

                if (query != '') {
                    search(query)
                } else {
                    setTimeout(() => {
                        window.location.replace('pets')
                    }, 500)
                }
            })
        })
        //import
        $('.btn-import').click(function(e) {
            $('#file').click()
        })
        $('#file').change(function(e) {
            $(this).parent().submit()
        })
    </script>

@endsection



