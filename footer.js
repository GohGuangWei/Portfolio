class Footer extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        this.innerHTML= `
            <div class="footer">
                <p> Created by Goh Guang Wei</p>
            </div>
        `;
    }
}

customElements.define('footer-component', Footer);
