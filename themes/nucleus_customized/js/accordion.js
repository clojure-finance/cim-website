class Accordion extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const summary = this.getAttribute('summary');
        const summaryStyle = this.getAttribute('summary-style');
        const detailStyle = this.getAttribute('detail-style');
        const selfStyle = this.getAttribute('self-style');

        const sumtag = document.createElement('button');
        sumtag.textContent = summary;
        sumtag.style = summaryStyle;
        sumtag.classList.add('accordion');

        const detailtag = document.createElement('div');
        detailtag.classList.add('panel');
        detailtag.style = detailStyle;
        detailtag.innerHTML = this.innerHTML; 
        this.innerHTML = '';

        this.appendChild(sumtag);
        this.appendChild(detailtag);
        this.style = selfStyle;
    }
}

customElements.define('x-accordion', Accordion);

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("Accactive");
    var panel = this.nextElementSibling;
    panel.classList.toggle("Accative");
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}
