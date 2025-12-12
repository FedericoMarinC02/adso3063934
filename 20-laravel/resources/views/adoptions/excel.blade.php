<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>All Adoptions</title>
    <style>
        table {
            border-collapse: collapse;
            width: 100%;
        }
        th {
            background-color: #4a5568;
            color: white;
            font-weight: bold;
            padding: 10px;
            text-align: center;
            border: 1px solid #000;
        }
        td {
            padding: 8px;
            border: 1px solid #ccc;
            text-align: center;
            vertical-align: middle;
        }
        img {
            width: 60px;
            height: 60px;
            object-fit: cover;
        }
        /* Column widths */
        col:nth-child(1) { width: 100px; } /* User Document */
        col:nth-child(2) { width: 150px; } /* User Fullname */
        col:nth-child(3) { width: 120px; } /* User Phone */
        col:nth-child(4) { width: 80px; }  /* User Photo */
        col:nth-child(5) { width: 120px; } /* Pet Name */
        col:nth-child(6) { width: 80px; }  /* Pet Kind */
        col:nth-child(7) { width: 150px; } /* Pet Breed */
        col:nth-child(8) { width: 150px; } /* Pet Location */
        col:nth-child(9) { width: 80px; }  /* Pet Image */
    </style>
</head>
<body>
    <table>
        <colgroup>
            <col style="width: 100px;">
            <col style="width: 150px;">
            <col style="width: 120px;">
            <col style="width: 80px;">
            <col style="width: 120px;">
            <col style="width: 80px;">
            <col style="width: 150px;">
            <col style="width: 150px;">
            <col style="width: 80px;">
        </colgroup>
        <thead>
            <tr>
                <th>User Document</th>
                <th>User Fullname</th>
                <th>User Phone</th>
                <th>User Photo</th>
                <th>Pet Name</th>
                <th>Pet Kind</th>
                <th>Pet Breed</th>
                <th>Pet Location</th>
                <th>Pet Image</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($adoptions as $adoption)
            <tr style="height: 80px;">
                <td>{{ $adoption->user?->document ?? 'N/A' }}</td>
                <td>{{ $adoption->user?->fullname ?? 'N/A' }}</td>
                <td>{{ $adoption->user?->phone ?? 'N/A' }}</td>
                <td>
                    <img src="{{ public_path('images/' . ($adoption->user?->photo ?? 'no-photo.png')) }}" width="60" height="60" alt="User Photo">
                </td>
                <td>{{ $adoption->pet?->name ?? 'N/A' }}</td>
                <td>{{ $adoption->pet?->kind ?? 'N/A' }}</td>
                <td>{{ $adoption->pet?->breed ?? 'N/A' }}</td>
                <td>{{ $adoption->pet?->location ?? 'N/A' }}</td>
                <td>
                    <img src="{{ public_path('images/' . ($adoption->pet?->image ?? 'no-image.png')) }}" width="60" height="60" alt="Pet Image">
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
