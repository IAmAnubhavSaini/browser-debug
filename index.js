const main = document.querySelector('main');

function exec() {
    Object.keys(window).filter(k => typeof window[k] === 'string' || typeof window[k] === 'number')
        .map(k => ({k, v: window[k]}))
        .map(({k, v}) => {
            const d = document.createElement('div');
            d.innerText = `${k}: ${v}`;
            main.appendChild(d);

        });


}
