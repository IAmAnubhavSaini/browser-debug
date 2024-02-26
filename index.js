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

document.addEventListener('DOMContentLoaded', () => {
    const special = [
        'Enter',
        'Space',
        'Backspace',
        'Shift',
        'Ctrl',
        'Alt',
        'Meta',
    ];

    // Listen for keydown events
    document.addEventListener('keydown', function(event) {
        // Prevent repeating actions if key is held down
        if (event.repeat) return;


        switch (event.key) {
            case "Shift":
                document.querySelector('.key[data-key="SHIFT"]').classList.add('pressed');
                break;
            case "Control":
                document.querySelector('.key[data-key="CONTROL"]').classList.add('pressed');
                break;
            case "Alt":
                document.querySelector('.key[data-key="ALT"]').classList.add('pressed');
                break;
            case "Meta":
                document.querySelector('.key[data-key="META"]').classList.add('pressed');
                break;
            case "Backspace":
                document.querySelector('.key[data-key="BACKSPACE"]').classList.add('pressed');
                break;
            case "Enter":
                document.querySelector('.key[data-key="ENTER"]').classList.add('pressed');
                break;
            case " ":
                document.querySelector('.key[data-key="SPACE"]').classList.add('pressed');
                break;
            case "Escape":
                document.querySelector('.key[data-key="ESCAPE"]').classList.add('pressed');
                break;
            default:
                const keyElement = document.querySelector(`.key[data-key="${event.key.toUpperCase()}"]`);
                if (keyElement) keyElement.classList.add('pressed');
                return; // Quit when this doesn't handle the key event.
        }

    });

    // Listen for keyup events
    document.addEventListener('keyup', function(event) {
        document.querySelector('.key.pressed').classList.remove('pressed');
    });
});


window.addEventListener('resize', exec);
window.addEventListener('mousemove', printMouse);

