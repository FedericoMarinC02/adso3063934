<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>All Pets</title>
    <style>
        table {
            border: 2px solid #aaa;
            border-collapse: collapse
        }
        table th, table td {
            font-family: sans-serif;
            font-size: 10px;
            border: 2px solid #ccc;
            padding: 4px;
        }
        table tr:nth-child(odd) {
            background-color: #eee;
        }
        table th {
            background-color: #666;
            color: #fff;
            text-align: center;
        }
    </style>
</head>
<body>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Kind</th>
                <th>Name</th>
                <th>Breed</th>
                <th>Age</th>
                <th>Weight</th>
                <th>Location</th>
                <th>Description</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($pets as $pet)
            <tr>
                <td>{{ $pet->id }}</td>
                <td>
                    @php
                        $filename = $pet->image ?? 'no-image.png';
                        $extension = pathinfo($filename, PATHINFO_EXTENSION);
                    @endphp
                    @if (in_array(strtolower($extension), ['jpg','jpeg','png','gif','webp']))
                        <img src="{{ public_path().'/images/'.$filename }}" width="96px">
                    @else
                        {{ strtoupper($extension) }}
                    @endif
                </td>
                <td>{{ $pet->kind }}</td>
                <td>{{ $pet->name }}</td>
                <td>{{ $pet->breed }}</td>
                <td>{{ $pet->age }}</td>
                <td>{{ $pet->weight }}</td>
                <td>{{ $pet->location }}</td>
                <td>{{ Str::limit($pet->description, 60) }}</td>
                <td>
                    @if ($pet->status == 1)
                        Available
                    @else
                        Adopted
                    @endif
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
