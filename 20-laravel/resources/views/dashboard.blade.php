{{--<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Dashboard') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100">
                    {{ __("You're logged in!") }}
                </div>
            </div>
        </div>
    </div>
</x-app-layout>--}}

<h1>Dashboard</h1>
<h2>{{ Auth::user()->fullname }}</h2>
<h3>You´re Logged In!</h3>
<form method="POST" action="{{ route('logout')}}">
    @csrf
    <a href="javascript:;"
       onclick="event.preventDefault(); this.closest('form').submit();">
        Log Out
    </a>
</form>
