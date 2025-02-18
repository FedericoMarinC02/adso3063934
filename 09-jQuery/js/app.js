//Count Task & Remains
countTasks()
countRemains()
//add Task
$(function () {
    $('footer').on('click', '#add', function () {
        if ($('#input-task').val().length > 0) {

            $task = ' <article> \
                <input type="checkbox"> \
                <p>'+ $('#input-task').val() + '</p> \
                <button>&times;</button> \
            </article>'
            $('section.list').append($task)
            $('#input-task').val('')
            countTasks()
            countRemains()
        } else {
            alert('please! Enter a task!')
        }
    })
    //Toggle Task (Remain/Done)

    $('body').on('click', 'input[type=checkbox]', function () {
        //if checked
        if ($(this).prop('checked')) {
            $(this).parent().addClass('checked')
        } else {
            $(this).parent().removeClass('checked')
        }
        countRemains()
    })

    //Remove Task
    $('body').on('click', 'article button', function(){
        $(this).closest('article').remove()
        countTasks()
        countRemains()
    })

})
//Count Tasks
function countTasks() {
    $('.num-tasks').text($('article').length)
    $('title-tasks').text($('article').length >1?'Tasks':'Task')
}

//Count Remains
function countRemains() {
    $remain = Math.abs($('.checked').length - $('article').length)
    $('.num-remains').text($remain)
    $('.title-remains').text($remain >1?'Remains':'Remain')
}