$(function() {
 
    // Check localStorage
    if (localStorage.getItem('todolist') !=  null) {
        $('.list').html(localStorage.getItem('todolist'))
        countTasks()
        countRemains()
    } else {
        // Count Tasks & Remains
        countTasks()
        countRemains()
    }
 
    // Add Task
    $('footer').on('click', '#add', function() {
        if($('#input-task').val().length > 0) {
 
            $task = '<article> \
                        <input type="checkbox"> \
                        <p>'+$('#input-task').val()+'</p> \
                        <button>&times;</button> \
                     </article>'
            $('section.list').append($task)         
            $('#input-task').val('')
            countTasks()
            countRemains()
        } else {
            alert('Please! Enter a Task')
        }
    })
    // Reset Tasks
    $('body').on('click', '#reset', function() {
        localStorage.setItem('todolist', $('.list').html(''))
        countTasks()
        countRemains()
    })
    // Toggle Task (Remain/Done)
    $('body').on('click', 'input[type=checkbox]', function() {
        // If checked
        if ($(this).prop('checked')) {
            $(this).attr('checked', true)
            $(this).parent().addClass('checked')
        } else {
            $(this).attr('checked', false)
            $(this).parent().removeClass('checked')
        }
        countRemains()
    })
    // Remove Task
    $('body').on('click', 'article button', function() {
        $(this).closest('article').remove()
        countTasks()
        countRemains()
    })
 
})
// Count Tasks
function countTasks() {
    $('.num-tasks').text($('article').length)
    $('.title-tasks').text($('article').length >1?'Tasks':'Task')
}
// Count Remains
function countRemains() {
    $remain = Math.abs($('.checked').length - $('article').length)
    $('.num-remains').text($remain)
    $('.title-remains').text($remain >1?'Remains':'Remain')
    // Set localStorage
    localStorage.setItem('todolist', $('.list').html())
}