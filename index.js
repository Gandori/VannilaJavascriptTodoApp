var Todos;
var input;
var btn;

window.onload = () =>{
    addEventListener('keydown', e =>{
        if(e.key != 'Enter'){return;};
        if(document.activeElement.tagName != 'INPUT'){return;};
        main();
    });

    Todos = get_local_storage();
    Todos.forEach(todo =>{create_todo(todo)});
    input = document.getElementById('input');
    btn = document.getElementById('btn');
    btn.addEventListener('click', main);
};

function main()
{
    todo = input.value;
    
    if(!todo){return;};

    create_todo(todo);
    clear_input();
    push_todo(todo)
    set_local_storage(todo);
};

function create_todo(todo)
{
    var div = document.createElement('div');
    div.setAttribute('id', 'todo');

    var label = document.createElement('label');
    label.setAttribute('onclick', 'check(this)');
    label.innerHTML = todo;
    div.append(label);

    var btn = document.createElement('button');
    btn.innerHTML = 'X'
    btn.setAttribute('onclick', 'delete_todo(this)');
    div.append(btn);

    var container = document.getElementById('container');
    container.append(div);
};

function delete_todo(element)
{
    todo = element.parentElement.firstChild.innerHTML;
    element.parentElement.remove();
    delete_todo_from_Todos(todo);
    set_local_storage();
};

function delete_todo_from_Todos(todo)
{
    Todos.forEach(element =>{
        if(element == todo){
            let index = Todos.indexOf(todo)
            Todos.splice(index, 1);
        };
    });
};

function clear_input()
{
    input.value = '';
};

function check(element)
{
    var parent = element.parentElement;

    if(uncheck(element)){return;};

    var label = document.createElement('label');
    label.setAttribute('class','check')
    label.style.backgroundColor = 'var(--red)';
    label.style.height = '2px';
    label.style.position = 'absolute';
    label.style.top = '50%';
    label.style.left = '5px';
    label.style.width = 'calc(90% - 10px)';
    label.style.zIndex = '5';
    parent.append(label);
};

function uncheck(element)
{
    var parent = element.parentElement;
    var child = parent.lastChild;
    if(child.tagName == 'LABEL'){
        child.remove();
        return true;
    }
};

function push_todo(todo)
{
    Todos.push(todo);
};

function set_local_storage()
{
    localStorage.setItem('todos', Todos);
};

function get_local_storage()
{
    if(!localStorage.getItem('todos')){return [];};
    return localStorage.getItem('todos').split(',')
};

function clear_local_storage()
{
    localStorage.clear();
};