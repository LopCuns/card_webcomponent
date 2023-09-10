"use strict";
const $template = document.createElement('template');
$template.innerHTML =
    `
<div class="user">
  <div class="user__close">x</div>
    <div class="user__pre">
      <img class="user__img" alt="user profile picture" draggable="false">
      <p class="user__name"></p>
    </div>
    <div class="user__info">
      <p class="user__info__id">User id: <span id="userId"></span></p>
      <p class="user__info__phone">User phone : <span id="userPhone"></span></p>
      <p class="user__info__email">User email : <span id="userEmail">/span></p>
    </div>
</div>
`;
class OpenCard extends HTMLElement {
    constructor() {
        var _a;
        super();
        this.openInfo = () => {
            // Abrir la información de usuario
            this.getFromContent('.user').setAttribute('data-opened', '');
            // Añadir el listener para poder cerrarla
            this.getFromContent('.user__close').addEventListener('click', this.closeInfo, { once: true });
            // Evitar el scroll del body
            document.body.style.cssText = 'overflow: hidden;';
        };
        this.closeInfo = () => {
            // Cerrar la información de usuario
            this.getFromContent('.user').removeAttribute('data-opened');
            // Añadir el listener para poder abrirla
            this.addEventListener('click', this.openInfo, { once: true, capture: true });
            // Permitir de vuelta el scroll en el body
            // Evitar el scroll del body
            document.body.removeAttribute('style');
        };
        this.$content = $template.content.cloneNode(true);
        this.stylesheet = '*,::after,::before{box-sizing:border-box}.user{padding:2rem;border-radius:10px;text-align:center;background-color:#bbf8e7;transition:transform .3s;cursor:pointer}.user__img{clip-path:polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);background-color:#db96e2}.user__name{font-size:2rem}.user__info{display:none;text-align:start}.user__close{position:absolute;top:1rem;right:2rem;display:none;font-size:4rem;cursor:pointer;}.user:not([data-opened]):hover{transform:scale(0.9)}.user[data-opened]{position:fixed;top:0;left:0;width:100vw;height:100vh;display:flex;flex-flow:row wrap;justify-content:center;gap:5rem;align-items:center;transition: none;z-index:10;cursor:default;}.user[data-opened]>.user__info{display:inline-block}.user[data-opened]>.user__close{display:inline-block;}';
        this.attachShadow({ mode: 'open' });
        // Incorporar el contenido del shadowDOM
        (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.appendChild(this.$content);
    }
    static get observedAttributes() {
        return ['data-img', 'data-name', 'data-id', 'data-phone', 'data-email'];
    }
    connectedCallback() {
        var _a;
        // Incorporar los estilos al shadowDOM
        const $style = document.createElement('style');
        $style.textContent = this.stylesheet;
        (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.appendChild($style);
        // Abrir el listener para abrir la información de usuario
        this.addEventListener('click', this.openInfo, { once: true, capture: true });
    }
    getFromContent(query) {
        var _a;
        const $ = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector(query);
        if (!$)
            throw new Error(`Elemento con el query ${query} no encontrado`);
        return $;
    }
    changeImg(query, newValue) {
        try {
            const $img = this.getFromContent(query);
            if (!($img instanceof HTMLImageElement))
                throw new Error('El elemento seleccionado no es una imagen');
            $img.src = newValue;
        }
        catch (err) {
            console.error(err);
        }
    }
    changeText(query, content) {
        try {
            const $ = this.getFromContent(query);
            $.textContent = content;
        }
        catch (err) {
            console.error(err);
        }
    }
    attributeChangedCallback(attr, oldValue, newValue) {
        const actions = {
            'data-img': () => this.changeImg('.user__img', newValue),
            'data-name': () => this.changeText('.user__name', newValue),
            'data-id': () => this.changeText('#userId', newValue),
            'data-phone': () => this.changeText('#userPhone', newValue),
            'data-email': () => this.changeText('#userEmail', newValue),
        };
        if (actions[attr])
            actions[attr]();
    }
}
customElements.define('jl-opencard', OpenCard);
