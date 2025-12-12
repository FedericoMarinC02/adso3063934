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
    <div class="text-center py-12 w-full">
        <p class="text-gray-600 text-lg">No adoptions found matching your search.</p>
    </div>
@endforelse