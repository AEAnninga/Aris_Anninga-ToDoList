const baseUrl = "http://localhost:3000/";

const submitBtn = document.getElementById('btn-submit-task');
const taskInput = document.getElementById('add-task');
const todoList = document.getElementById('todo-list');

// toevoegen taak aan database
const postTask = async() => {
    try {
        await fetch(baseUrl, {
            method: 'POST', 
            cors: 'no-cors',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                description: `${taskInput.value}`,
                done: false
            })
        })
    } catch (err) {
        console.log(err)
    }
}

// opvragen hele database
const getTask = async() => {
    try {
        const response = await fetch(baseUrl, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
        return response
    } catch (err) {
        console.log(err)
    }
}

// aanpassen taak in database en in de DOM
const changeTask = async(task) => {
    try {
        let newTask = task.value
        let id = task.parentElement.id
        await fetch(`${baseUrl}${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                description: newTask
            })
        })
        // ook de innerHTML moet aangepast worden met newTask, anders verandert dit weer terug zodra je nieuwe taak toevoegt
        let listItem = `
            <input type="checkbox" name="checkTask" class="check">
            <input type="text" name="Task" class="task" value='${newTask}'>
            <img value='${id}'  src="images/garbage.png" alt="garbage-bin">
        `
        task.parentElement.innerHTML = listItem
        // en dan ook weer eventListeners, anders werkt dat ook niet meer
        addEventListeners()
        // onderstaande puur om te checken of de body is bijgewerkt
        let res = await fetch(`${baseUrl}${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
        let res2 = await res.json()
        console.log(res2)
    } catch(err) {
        console.log(err)
    }
}

const doneTask = async(checkbox) => {
    try {
        let task = checkbox.parentElement.children[1]
        let id = task.parentElement.id
        if (checkbox.checked == true) {
            await fetch(`${baseUrl}${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    done: true
                })
            })
            task.classList.add('stripe')
            // onderstaande puur om te checken of de body is bijgewerkt
            let res = await fetch(`${baseUrl}${id}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            })
            let res2 = await res.json()
            console.log(res2)
        } else {
            await fetch(`${baseUrl}${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    done: false
                })
            })
            task.classList.remove('stripe')
            // onderstaande puur om te checken of de body is bijgewerkt
            let res = await fetch(`${baseUrl}${id}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            })
            let res2 = await res.json()
            console.log(res2)
        }
    } catch (err) {
        console.log(err)
    }
}

const removeListItem = async(uniqueId) => {
    try {
        await fetch(`${baseUrl}${uniqueId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        })
        let listItem = document.getElementById(`${uniqueId}`);
        listItem.parentElement.removeChild(listItem)
    } catch (err) {
        console.log(err)
    }
}