<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title')</title>
    <link href="https://cdn.jsdelivr.net/npm/daisyui@5" rel="stylesheet" type="text/css" />
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
</head>
@php
    if (Auth::user()->role == 'Administrator') {
        $image = 'images/dashboard_admin2.webp';
    } else {
        $image = 'images/wallpaper.jpg';
    }
@endphp

<body
    class="min-h-[100dvh] bg-[url({{ asset($image) }})] bg-cover w-full bg-fixed flex flex-col gap-4 items-center justify-center p-8  pt-20">
    @include('layouts.navbar')
    @yield('content')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"
        integrity="sha512-v2CJ7UaYy4JwqLDIrZUI/4hqeoQieOmAZNXBeQyjo21dadnwR+8ZaIJVT8EE2iyI61OV8e6M8PP2/4hpQINQ/g=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    @yield('js')

    <dialog id="modal_message" class="modal">
        <div class="modal-box bg-red-50">
            <h3 class="text-lg font-bold text-red-700">
                Sorry!
            </h3>
            <div role="alert" class="alert alert-error">
                <form method="dialog">
                    <button class="btn">Cancel</button>
                </form>
            </div>
        </div>
        <form method="dialog" class="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>

    @section('js')
        <script>
            $(document).ready(function() {
                const modal_message = document.getElementById('modal-message');
                @if(session('error'))
                    modal_message.showModal();
                @endif
            })
        </script>
    @endsection
</body>

</html>
