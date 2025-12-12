<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Adoptions Report - LaraPets</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: Arial, sans-serif;
            font-size: 10px;
            padding: 20px;
        }
        h1 {
            text-align: center;
            color: #333;
            margin-bottom: 20px;
            font-size: 18px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }
        th {
            background-color: #4a5568;
            color: white;
            padding: 8px 4px;
            text-align: left;
            font-size: 9px;
            border: 1px solid #2d3748;
        }
        td {
            padding: 6px 4px;
            border: 1px solid #cbd5e0;
            font-size: 8px;
        }
        tr:nth-child(even) {
            background-color: #f7fafc;
        }
        img {
            max-width: 40px;
            max-height: 40px;
            object-fit: cover;
            border-radius: 4px;
        }
        .text-center {
            text-align: center;
        }
        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 8px;
            color: #718096;
        }
    </style>
</head>
<body>
    <h1>🐾 LaraPets - Adoptions Report</h1>
    
    <table>
        <thead>
            <tr>
                <th>User Document</th>
                <th>User Fullname</th>
                <th>User Phone</th>
                <th class="text-center">User Photo</th>
                <th>Pet Name</th>
                <th>Pet Kind</th>
                <th>Pet Breed</th>
                <th>Pet Location</th>
                <th class="text-center">Pet Image</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($adoptions as $adoption)
                <tr>
                    <td>{{ $adoption->user?->document ?? 'N/A' }}</td>
                    <td>{{ $adoption->user?->fullname ?? 'N/A' }}</td>
                    <td>{{ $adoption->user?->phone ?? 'N/A' }}</td>
                    <td class="text-center">
                        @if($adoption->user?->photo)
                            <img src="{{ public_path('images/' . $adoption->user->photo) }}" alt="User Photo">
                        @else
                            <img src="{{ public_path('images/no-photo.png') }}" alt="No Photo">
                        @endif
                    </td>
                    <td>{{ $adoption->pet?->name ?? 'N/A' }}</td>
                    <td>{{ $adoption->pet?->kind ?? 'N/A' }}</td>
                    <td>{{ $adoption->pet?->breed ?? 'N/A' }}</td>
                    <td>{{ $adoption->pet?->location ?? 'N/A' }}</td>
                    <td class="text-center">
                        @if($adoption->pet?->image)
                            <img src="{{ public_path('images/' . $adoption->pet->image) }}" alt="Pet Image">
                        @else
                            <img src="{{ public_path('images/no-image.png') }}" alt="No Image">
                        @endif
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <div class="footer">
        <p>Generated on {{ date('Y-m-d H:i:s') }} | Total Adoptions: {{ $adoptions->count() }}</p>
    </div>
</body>
</html>
