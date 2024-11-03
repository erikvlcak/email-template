<div>
    <h2>Inbox</h2>
    <table>
        <thead>
            <tr>
                <th>From</th>
                <th>Subject</th>
                <th>Body</th>
                <th>Received</th>
            </tr>
        </thead>
        <tbody>
            @foreach($emails as $email)
            <tr>
                <td>{{ $email->from }}</td>
                <td>{{ $email->subject }}</td>
                <td>{{ $email->body }}</td>
                <td>{{ $email->created_at }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>