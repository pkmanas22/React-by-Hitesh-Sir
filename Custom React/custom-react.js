
function customReactFunction(elem, container) {
    const newElement = document.createElement(elem.type)
    newElement.innerHTML = elem.children;
    for (const prop in elem.props) {
        newElement.setAttribute(prop, elem.props[prop]);
    }
    container.appendChild(newElement)
}


const customElement = {
    type: 'a',
    props: {
        href: 'https://google.com',
        target: '_blank',
    },
    children: 'Click to visit Google'
}

const mainContainer = document.querySelector('#container');

customReactFunction(customElement, mainContainer);
