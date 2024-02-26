const main = document.querySelector('div.page');
const mouse_text = document.querySelector('div.mouse .text');

function exec() {
    main.innerText = '';
    Object.keys(window).filter(k => typeof window[k] === 'string' || typeof window[k] === 'number')
        .map(k => ({k, v: window[k]}))
        .map(({k, v}) => {
            const d = document.createElement('div');
            d.classList.add('item', 'page');
            d.innerText = `${k}: ${v}`;
            main.appendChild(d);
        });
}

function printMouse(e) {
    mouse_text.innerText = '';
    for(const x in e) {
        const keys = ['altKey', 'ctrlKey', 'metaKey', 'shiftKey', 'x', 'y'];
        if(keys.includes(x)) {
            const d = document.createElement('div');
            d.classList.add('item', 'mouse');
            d.innerText = `${x}: ${e[x]}`;
            mouse_text.appendChild(d);
        }
    }
}

window.addEventListener('resize', exec);
window.addEventListener('mousemove', printMouse);

