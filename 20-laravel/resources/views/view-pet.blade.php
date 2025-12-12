<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>List All Pets 😙</title>
    <link href="https://cdn.jsdelivr.net/npm/daisyui@5" rel="stylesheet" type="text/css" />
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
</head>

<body class="bg-teal-900 p-10 min-h-[100dvh]">
    <h1 class="text-white text-center text-4xl border-b-2 pb-4">List All Pets 🐣</h1>
    <section class="p-10 flex gap-4 flex-wrap justify-center flex-col">
        <div style=' background-color: #007bff; max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #07b82e; border-radius: 8px;'>
            <h2 style='color: #333; text-align: center;'>Detalles del Animal</h2>

            <div class=" hero bg-base-150 min-h-50dvh">
                
                <div class="hero-content flex-col lg:flex-row-reverse">
                    <img src="{{ asset('images/' . $pet->image) }}" alt="{{ $pet->name }}"
                        class="max-w-sm rounded-lg shadow-2xl" />
                    <div style='margin: 20px 0;'>
                        <p><strong>Name:</strong> {{ $pet->name }}</p>
                        <p><strong>Type:</strong> {{ $pet->kind }}</p>
                        <p><strong>age:</strong> {{ $pet->age }}</p>
                        <p><strong>Breed:</strong> {{ $pet->breed }}</p>
                        <p><strong>Fecha de registro:</strong> {$pet->created_at->format('Y-m-d')}</p>
                    </div>
                </div>
            </div>

        </div>
        <div style='text-align: center;'>
            <a href="{{ url('view/pets/') }}"
                style='background: #007bff; 

                      color: white; 
                      padding: 10px 20px; 
                      text-decoration: none; 
                      border-radius: 5px;'>
                Volver a la lista
            </a>
        </div>
    </section>
</body>

</html>
