<!-- link to inbox -->
<a href="{{ route('emails.inbox') }}">Inbox</a>
<!-- link to inbox -->
<a href="{{ route('emails.sent') }}">Sent Messages</a>

<!-- form for sending emails -->
<form action="{{ route('send.email') }}" method="POST">
    @csrf
    <label for="address">Email address: </label>
    <input type="text" name="address" id="address">

    <label for="subject">Subject: </label>
    <input type="text" name="subject" id="subject">

    <label for="text">Message: </label>
    <textarea name="text" id="text" placeholder="Enter some text here"></textarea>

    <button>Send message</button>
</form>