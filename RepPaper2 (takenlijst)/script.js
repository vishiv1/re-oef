// Takenlijst — representatieve JS opgave
const setup = () => {
    const LS_KEY = 'exam_tasks_v1';
    const SS_FILTER_KEY = 'exam_tasks_filter_v1';
    const SS_SEARCH_KEY = 'exam_tasks_search_v1';

    let tasks = [];
    let filter = sessionStorage.getItem(SS_FILTER_KEY) || 'all';
    let search = sessionStorage.getItem(SS_SEARCH_KEY) || '';

    const $ = (sel, root=document) => root.querySelector(sel);
    const el = (tag, props={}, ...kids) => {
        const node = document.createElement(tag);
        Object.entries(props).forEach(([k,v])=>{
            if (k === 'class') node.className = v;
            else if (k in node) node[k] = v;
            else node.setAttribute(k, v);
        });
        kids.forEach(k => node.append(k));
        return node;
    };
    const fmt = (ms) => {
        const d = new Date(ms);
        const mstr = ['jan','feb','mrt','apr','mei','jun','jul','aug','sep','okt','nov','dec'][d.getMonth()];
        const hh = String(d.getHours()).padStart(2,'0');
        const mm = String(d.getMinutes()).padStart(2,'0');
        return `${d.getDate()} ${mstr} ${String(d.getFullYear()).slice(-2)} ${hh}:${mm}`;
    };

    function load(){
        try {
            const raw = localStorage.getItem(LS_KEY);
            tasks = raw ? JSON.parse(raw) : [];
            tasks.sort((a,b)=> b.createdAt - a.createdAt);
        } catch { tasks = []; }
    }
    function save(){
        localStorage.setItem(LS_KEY, JSON.stringify(tasks));
    }

    function addTask(title, category){
        const t = { id: crypto.randomUUID(), title: title.trim(), category, done:false, createdAt: Date.now() };
        tasks.unshift(t);
        save();
        $('#task-list').prepend(renderTask(t));
        updateCounterAndEmpty();
    }
    function toggleTask(id){
        const t = tasks.find(x=>x.id===id);
        if(!t) return;
        t.done = !t.done;
        save();
        renderAll();
    }
    function deleteTask(id){
        tasks = tasks.filter(t=>t.id!==id);
        save();
        renderAll();
    }
    function clearDone(){
        tasks = tasks.filter(t=>!t.done);
        save();
        renderAll();
    }
    function clearAll(){
        if(!tasks.length) return;
        if(!confirm('Alle taken wissen?')) return;
        tasks = [];
        save();
        renderAll();
    }

    function passesFilter(t){
        const term = search.trim().toLowerCase();
        const matchSearch = !term || t.title.toLowerCase().includes(term) || t.category.toLowerCase().includes(term);
        const matchFilter = filter==='all' ? true : filter==='active' ? !t.done : t.done;
        return matchSearch && matchFilter;
    }
    function renderAll(){
        const list = $('#task-list');
        list.textContent = '';
        const visible = tasks.filter(passesFilter);
        for(const t of visible) list.append(renderTask(t));
        updateCounterAndEmpty();
        updateFilterChips();
    }
    function renderTask(t){
        const root = el('article', { class: 'task' + (t.done ? ' done' : '') , dataset:{id:t.id} });
        const checkbox = el('input', { type:'checkbox', checked: t.done, onchange: ()=> toggleTask(t.id), title: 'Markeer als klaar' });
        const row = el('div', { class: 'row' },
            el('span', { class:'title' }, document.createTextNode(t.title)),
            el('span', { class:'meta' }, document.createTextNode(`${t.category} • ${fmt(t.createdAt)}`)),
        );
        const actions = el('div', { class:'actions' },
            el('button', { onclick: ()=> deleteTask(t.id), title:'Verwijderen' }, document.createTextNode('Verwijder'))
        );
        root.append(checkbox, row, actions);
        return root;
    }
    function updateCounterAndEmpty(){
        const visible = tasks.filter(passesFilter);
        $('#counter').textContent = `${visible.length} ${visible.length===1?'taak':'taken'}`;
        $('#empty').hidden = visible.length !== 0;
    }
    function updateFilterChips(){
        document.querySelectorAll('.filters .chip').forEach(btn=>{
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
    }

    function init(){
        $('#task-form').addEventListener('submit', (e)=>{
            e.preventDefault();
            const title = $('#task-input').value;
            const cat = $('#category').value;
            if(!title.trim()) return;
            addTask(title, cat);
            $('#task-input').value = '';
            $('#task-input').focus();
        });

        document.querySelectorAll('.filters .chip').forEach(btn=>{
            btn.addEventListener('click', ()=>{
                filter = btn.dataset.filter;
                sessionStorage.setItem(SS_FILTER_KEY, filter);
                renderAll();
            });
        });

        const searchInput = $('#search');
        searchInput.value = search;
        searchInput.addEventListener('input', (e)=>{
            search = e.target.value;
            sessionStorage.setItem(SS_SEARCH_KEY, search);
            renderAll();
        });

        $('#clear-done').addEventListener('click', clearDone);
        $('#clear-all').addEventListener('click', clearAll);

        load();
        renderAll();
    }

    init();
};

window.addEventListener('load', setup);

