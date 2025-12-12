@extends('layouts.home')

@section('tiitle', ' welcome: Larapets 🐕‍🦺')


@section('content')
<section class="bg-[#0004] p-8 flex flex-col gap-4 items-center justify-center w-[400px]">
    <img src="{{ asset('images/logo-larapets.png') }}" width="210px" alt="logo">
    <p class="text-white">
        Larapets es un hogar virtual lleno de amor, donde cada mascotita espera a alguien especial que quiera
        acompañarla en su camino. Aquí puedes conocer sus historias, apadrinarlas y brindarles el cariño y apoyo que
        necesitan. En Larapets, cada clic es una caricia y cada adopción virtual es una oportunidad para cambiar una
        vida.

    </p>

    <div class="flex gap-2  mt-8 text-white">
        @guest()
        <a class="btn btn-outline w-[160px]" href="{{ url('login') }}">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" viewBox="0 0 256 256">
                <path
                    d="M208,80H96V56a32,32,0,0,1,32-32c15.37,0,29.2,11,32.16,25.59a8,8,0,0,0,15.68-3.18C171.32,24.15,151.2,8,128,8A48.05,48.05,0,0,0,80,56V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80Zm0,128H48V96H208V208Zm-68-56a12,12,0,1,1-12-12A12,12,0,0,1,140,152Z">
                </path>
            </svg>
            <strong>Login</strong>
        </a>
        <a class="btn btn-outline w-[160px]" href="{{ url('register') }}">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" viewBox="0 0 256 256">
                <path
                    d="M256,136a8,8,0,0,1-8,8H232v16a8,8,0,0,1-16,0V144H200a8,8,0,0,1,0-16h16V112a8,8,0,0,1,16,0v16h16A8,8,0,0,1,256,136Zm-57.87,58.85a8,8,0,0,1-12.26,10.3C165.75,181.19,138.09,168,108,168s-57.75,13.19-77.87,37.15a8,8,0,0,1-12.25-10.3c14.94-17.78,33.52-30.41,54.17-37.17a68,68,0,1,1,71.9,0C164.6,164.44,183.18,177.07,198.13,194.85ZM108,152a52,52,0,1,0-52-52A52.06,52.06,0,0,0,108,152Z">
                </path>
            </svg>
            <strong>Register</strong>
        </a>
        @endguest
        @auth()
        <a class="btn btn-outline" href="{{ url('dashboard') }}">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" viewBox="0 0 256 256">
                <path
                    d="M128,112a28,28,0,0,0-8,54.83V184a8,8,0,0,0,16,0V166.83A28,28,0,0,0,128,112Zm0,40a12,12,0,1,1,12-12A12,12,0,0,1,128,152Zm80-72H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a32,32,0,0,1,64,0V80H96ZM208,208H48V96H208V208Z">
                </path>
            </svg>
            <strong>Dashboard</strong>
        </a>
        @endauth
    </div>
</section>
@endsection