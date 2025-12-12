@extends('layouts.dashboard')

@section('title', 'My Adoptions: Larapets 🐶')

@section('content')

    <h1
        class="text-4xl flex gap-2 items-center justify-center pb-4 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-lg shadow-md border-2 border-gray-300">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256">
            <path
                d="M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z">
            </path>
        </svg>

        My Adoptions
    </h1>

    {{-- Search --}}
    <label class="input outline-none mb-10">
        <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
            </g>
        </svg>
        <input id="qsearch" type="search" placeholder="Search by pet name, breed..." name="qsearch" />
    </label>

    @csrf
    <div class="datalist flex flex-col gap-3 items-center justify-center">
        {{-- Adoption Records --}}
        @forelse ($adoptions as $adoption)
            <div class="avatar">
                <div class="w-32 rounded-full">
                    @php
                        $imgPath = public_path('images/' . ($adoption->pet->image ?? ''));
                        $imgUrl = file_exists($imgPath) && !empty($adoption->pet->image) ? asset('images/' . $adoption->pet->image) : asset('images/image.png');
                    @endphp
                    <img src="{{ $imgUrl }}" alt="pet-{{ $adoption->pet->id }}" />
                </div>
            </div>

            <h4 class="bg-white/90 backdrop-blur-sm rounded-lg shadow-md border border-gray-300 px-6 py-3 mb-4 text-gray-900 text-lg font-semibold text-center inline-block">
                <span class="text-teal-600 underline font-bold">{{ $adoption->pet->name }}</span>
                <span class="text-gray-800">({{ $adoption->pet->kind }})</span>
                <br>
                <span class="text-gray-600 text-sm font-normal">Adopted {{ $adoption->created_at->diffForHumans() }}</span>
            </h4>

            <a href="{{ url('adoptions/' . $adoption->id) }}" class="btn btn-info mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000" viewBox="0 0 256 256">
                    <path
                        d="M152,112a8,8,0,0,1-8,8H120v24a8,8,0,0,1-16,0V120H80a8,8,0,0,1,0-16h24V80a8,8,0,0,1,16,0v24h24A8,8,0,0,1,152,112Zm77.66,117.66a8,8,0,0,1-11.32,0l-50.06-50.07a88.11,88.11,0,1,1,11.31-11.31l50.07,50.06A8,8,0,0,1,229.66,229.66ZM112,184a72,72,0,1,0-72-72A72.08,72.08,0,0,0,112,184Z">
                    </path>
                </svg>
                More info
            </a>

            <span class="border-b-1 border-dashed mt-8 border-[#fff6] h2 w-4/12"></span>
        @empty
            <div class="text-center py-12">
                <p class="text-gray-600 text-lg font-semibold">You haven't adopted any pets yet.</p>
                <a href="{{ url('pets') }}" class="btn btn-primary mt-4">Browse Pets</a>
            </div>
        @endforelse
    </div>

@endsection

@section('js')
    <script>
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

            $.post("{{ url('search/my-adoptions') }}", {
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

            $('.datalist').html(`<div class="text-center py-18">
                <span class="loading loading-spinner text-warning"></span>
            </div>`)

            if (query != '') {
                search(query)
            } else {
                setTimeout(() => {
                    window.location.replace('{{ url("adoptions/my") }}')
                }, 500)
            }
        })
    </script>

@endsection