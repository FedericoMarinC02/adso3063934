$(function(){
    $('footer').on('click', '#add', function() {
        if($('#input-task').val().length > 0 ) {

            $task = ' <article> \
                <input type="checkbox"> \
                <p>'+$('#input-task').val()+'</p> \
                <button>&times;</button> \
            </article>'
        $('section.list').append($task)
        $('#input-task').val('')
        } else {
            alert('please! Enter a task!')
        }
    })
})