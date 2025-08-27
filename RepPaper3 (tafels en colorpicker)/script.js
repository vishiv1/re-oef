// Tafels + colorpicker — representatieve examenoplossing
const setup = () => {
    // Keys om keuzes te onthouden (optioneel maar netjes)
    const LS_KEY = 'exam_tables_settings_v1';

    // Hulpjes
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

    // Elementen
    const form = $('#form');
    const baseInput = $('#base');
    const rangeInput = $('#range');
    const highlightInput = $('#highlight');

    const headColor = $('#headColor');
    const oddColor  = $('#oddColor');
    const evenColor = $('#evenColor');
    const hitColor  = $('#hitColor');

    const buildBtn = $('#build');
    const clearBtn = $('#clear');
    const demoBtn  = $('#demo');

    const table = $('#table');
    const empty = $('#empty');

    // Instellingen laden
    function loadSettings(){
        try{
            const raw = localStorage.getItem(LS_KEY);
            if(!raw) return;
            const s = JSON.parse(raw);
            if(s.base) baseInput.value = s.base;
            if(s.range) rangeInput.value = s.range;
            if(s.highlight) highlightInput.value = s.highlight;
            if(s.headColor) headColor.value = s.headColor;
            if(s.oddColor) oddColor.value = s.oddColor;
            if(s.evenColor) evenColor.value = s.evenColor;
            if(s.hitColor) hitColor.value = s.hitColor;
        }catch{}
    }
    function saveSettings(){
        const s = {
            base: Number(baseInput.value),
            range: Number(rangeInput.value),
            highlight: Number(highlightInput.value),
            headColor: headColor.value,
            oddColor: oddColor.value,
            evenColor: evenColor.value,
            hitColor: hitColor.value,
        };
        localStorage.setItem(LS_KEY, JSON.stringify(s));
    }

    // Kleurtoepassing op de tabel
    function applyColors(){
        // Thead achtergrond
        const ths = table.querySelectorAll('thead th');
        ths.forEach(th => th.style.backgroundColor = headColor.value);

        // Rijkleuren
        table.querySelectorAll('tbody tr').forEach((tr, idx) => {
            tr.style.backgroundColor = (idx % 2 === 0) ? oddColor.value : evenColor.value;
        });

        // Highlight veelvouden
        const m = Number(highlightInput.value);
        if(m && m > 0){
            table.querySelectorAll('tbody tr').forEach(tr => {
                const resultCell = tr.querySelector('td:last-child');
                const val = Number(resultCell?.dataset?.value || 0);
                tr.classList.toggle('hit', val % m === 0);
                if (val % m === 0) tr.style.backgroundColor = hitColor.value;
            });
        }
    }

    // Tabel genereren
    function buildTable(){
        const base = Number(baseInput.value);
        const count = Number(rangeInput.value);
        const m = Number(highlightInput.value) || 0;

        if(!Number.isInteger(base) || base < 1) { alert('Geef een geldig positief getal voor "Tafel van".'); return; }
        if(!Number.isInteger(count) || count < 1 || count > 25) { alert('Aantal rijen moet tussen 1 en 25 liggen.'); return; }

        table.textContent = ''; // leegmaken

        // Thead
        const thead = el('thead', {},
            el('tr', {},
                el('th', {}, document.createTextNode('n')),
                el('th', {}, document.createTextNode('x')),
                el('th', {}, document.createTextNode(base)),
                el('th', {}, document.createTextNode('=')),
                el('th', {}, document.createTextNode('resultaat'))
            )
        );

        // Tbody
        const tbody = el('tbody');
        for(let n = 1; n <= count; n++){
            const result = n * base;
            const tr = el('tr', {},
                el('td', {}, document.createTextNode(n)),
                el('td', {}, document.createTextNode('×')),
                el('td', {}, document.createTextNode(base)),
                el('td', {}, document.createTextNode('=')),
                el('td', { dataset: { value: result } }, document.createTextNode(result))
            );
            // highlight class (kleur zelf in applyColors, zodat kleurkiezers werken)
            if (m && result % m === 0) tr.classList.add('hit');
            tbody.append(tr);
        }

        table.append(thead, tbody);
        empty.textContent = '';
        empty.classList.add('hidden');
        empty.style.display = 'none';

        applyColors();
        saveSettings();
    }

    // Demo-voorbeeld
    function fillDemo(){
        baseInput.value = 12;
        rangeInput.value = 15;
        highlightInput.value = 4;
        headColor.value = '#0ea5e9';
        oddColor.value  = '#f1f5f9';
        evenColor.value = '#e2e8f0';
        hitColor.value  = '#fca5a5';
    }

    // Wissen
    function clearTable(){
        table.textContent = '';
        empty.textContent = 'Nog geen tabel. Vul de instellingen in en klik op Genereer.';
        empty.style.display = 'block';
        // instellingen laten staan (handig), maar je kan ook localStorage clearen:
        // localStorage.removeItem(LS_KEY);
    }

    // Live-updates bij kleur veranderen (als er al een tabel is)
    [headColor, oddColor, evenColor, hitColor].forEach(inp=>{
        inp.addEventListener('input', () => {
            if(table.querySelector('tbody tr')) {
                applyColors();
                saveSettings();
            }
        });
    });

    // Events
    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        buildTable();
    });
    buildBtn.addEventListener('click', buildTable);
    clearBtn.addEventListener('click', clearTable);
    demoBtn.addEventListener('click', ()=>{ fillDemo(); buildTable(); });

    // Init
    loadSettings();
    // Optioneel: meteen renderen met laatste instellingen
    if(localStorage.getItem(LS_KEY)) buildTable();
};

window.addEventListener('load', setup);
