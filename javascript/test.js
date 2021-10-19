const submitTask = async() => {
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
    const response = await fetch(baseUrl, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })
    console.log(response)
    const res = await response.json()
    console.log(res)
    let id = `${res[res.length -1]._id}`;
    console.log(id);

    let list = `
        <li id='${id}'>
            <input type="checkbox" name="addTask" id="check-task">
            <input type="text" name="Task" id="task" value='${res[res.length - 1].description}'>
            
            <img value='${id}' id="${id}" src="images/garbage.png" alt="garbage-bin">
                
        </li>
    `
    todoList.innerHTML += list;

    const garbageBin = document.getElementById(`${id}`);
    console.log(garbageBin.id)
    

    const removeListItem = async() => {
        let uniqueId = garbageBin.id;
        console.log(uniqueId)

        await fetch(`${baseUrl}${uniqueId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        })
        const listItem = document.getElementById(`${uniqueId}`);
        listItem.parentElement.removeChild(listItem)
    }
    garbageBin.addEventListener('click', removeListItem)

}




submitBtn.addEventListener('click', submitTask);