<div>
    <h2>Sent Messages</h2>
    <table>
        <thead>
            <tr>
                <th>Recipient</th>
                <th>Subject</th>
                <th>Body</th>
                <th>Sent At</th>
            </tr>
        </thead>
        <tbody>
            @foreach($sentEmails as $email)
            <tr>
                <td>{{ $email->recipient }}</td>
                <td>{{ $email->subject }}</td>
                <td>{{ $email->body }}</td>
                <td>{{ $email->created_at }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>