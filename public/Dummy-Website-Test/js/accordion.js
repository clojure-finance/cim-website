class Accordion extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const summary = this.getAttribute('summary');

        const sumtag = document.createElement('button');
        sumtag.textContent = summary;
        sumtag.classList.add('accordion');

        const detailtag = document.createElement('div');
        detailtag.classList.add('panel');
        detailtag.innerHTML = this.innerHTML; 
        this.innerHTML = '';

        const btag = document.createElement('br');

        this.appendChild(sumtag);
        this.appendChild(detailtag);
        this.appendChild(btag);
    }
}

customElements.define('x-accordion', Accordion);

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("Accactive");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}
