const addEventListeners = async() => {
    try {
        // event listener voor verwijderen
        let list = document.querySelectorAll('#todo-list li img')
        Array.from(list).forEach(item => {
            let itemId = item.parentElement.id
            item.addEventListener('click', removeListItem.bind('click', itemId));  
        })
        // event listener voor checkbox
        let checkItems = document.querySelectorAll('#todo-list li input[name=checkTask]')
        Array.from(checkItems).forEach(checkbox => {
            checkbox.addEventListener('change', doneTask.bind('change', checkbox))
        })
        //event listener voor veranderen taak
        let taskItems = document.querySelectorAll('#todo-list li input[name=Task')
        Array.from(taskItems).forEach(task => {
            task.addEventListener('change', changeTask.bind('change', task))
        })
    } catch (err) {
        console.log(err)
    }
}

const addTaskToList = async() => {
    try {
        await postTask()
        const response = await getTask()
        const res = await response.json()
        // hele database, ook om veranderingen te checken
        console.log(res)
        // met postTask komt de taak aan het einde vd database, dat wordt de id die het nieuwe listItem meekrijgt
        let id = `${res[res.length -1]._id}`;
        console.log(id);
    
        let listItem = `
            <li id='${id}'>
                <input type="checkbox" name="checkTask" class="check">
                <input type="text" name="Task" class="task" value='${res[res.length - 1].description}'>
                <img value='${id}' src="images/garbage.png" alt="garbage-bin">
            </li>
        `
        todoList.innerHTML += listItem;
        addEventListeners()
    } catch (err) {
        console.log(err)
    } 
}

taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTaskToList()
    }
})
submitBtn.addEventListener('click', addTaskToList);