'use strict';

window.customElements.define('th-map',
  class ThMap extends HTMLElement{
    constructor(){
      super();
      this.windowDiv = undefined;
      this.baseLayer = undefined;
      this.dragging = false;
      this.mouseStart = undefined;
      this.mapStart = undefined;
      this.mapWindow = undefined;
    }

    connectedCallback(){
      let shadowRoot = this.attachShadow({mode: 'open'});
      shadowRoot.appendChild(this.styleBlock);
      shadowRoot.appendChild(this.bodyBlock);

      this.windowDiv = shadowRoot.querySelector('.map-window');
      this.baseLayer = this.windowDiv.querySelector('.base-layer');

      this.baseLayer.addEventListener('mousedown', event => this.mapMoveStart(event));
      this.baseLayer.addEventListener('mousemove', event => this.mapMove(event));
      this.baseLayer.addEventListener('mouseup', event => this.mapMoveEnd(event));
    }

    get styleBlock(){
      let styleBlock = document.createElement('style');
      styleBlock.innerHTML = `
        .base-layer{
          width: 2048px;
          height: 1024px;
          font-size: 0;

          position: relative;
          top: 0px;
          left: 0px;
        }

        .map-window{
          width: 75vw;
          height: 50vh;
          overflow: hidden;
          border: 1px solid black;
        }

        .dragging {
          cursor: -moz-grabbing;
          cursor: -webkit-grabbing;
          cursor: grabbing;
        }
      `;
      return styleBlock;
    }

    get bodyBlock(){
      let bodyBlock = document.createElement('div');
      bodyBlock.classList.add('map-window');
      bodyBlock.innerHTML = `
        <div class="base-layer">
          <img src="img/tiles/tile-0.jpg" alt="Earth Tile 0">
          <img src="img/tiles/tile-1.jpg" alt="Earth Tile 1">
          <img src="img/tiles/tile-2.jpg" alt="Earth Tile 2">
          <img src="img/tiles/tile-3.jpg" alt="Earth Tile 3">
          <img src="img/tiles/tile-4.jpg" alt="Earth Tile 4">
          <img src="img/tiles/tile-5.jpg" alt="Earth Tile 5">
          <img src="img/tiles/tile-6.jpg" alt="Earth Tile 6">
          <img src="img/tiles/tile-7.jpg" alt="Earth Tile 7">
          <img src="img/tiles/tile-8.jpg" alt="Earth Tile 8">
          <img src="img/tiles/tile-9.jpg" alt="Earth Tile 9">
          <img src="img/tiles/tile-10.jpg" alt="Earth Tile 10">
          <img src="img/tiles/tile-11.jpg" alt="Earth Tile 11">
          <img src="img/tiles/tile-12.jpg" alt="Earth Tile 12">
          <img src="img/tiles/tile-13.jpg" alt="Earth Tile 13">
          <img src="img/tiles/tile-14.jpg" alt="Earth Tile 14">
          <img src="img/tiles/tile-15.jpg" alt="Earth Tile 15">
          <img src="img/tiles/tile-16.jpg" alt="Earth Tile 16">
          <img src="img/tiles/tile-17.jpg" alt="Earth Tile 17">
          <img src="img/tiles/tile-18.jpg" alt="Earth Tile 18">
          <img src="img/tiles/tile-19.jpg" alt="Earth Tile 19">
          <img src="img/tiles/tile-20.jpg" alt="Earth Tile 20">
          <img src="img/tiles/tile-21.jpg" alt="Earth Tile 21">
          <img src="img/tiles/tile-22.jpg" alt="Earth Tile 22">
          <img src="img/tiles/tile-23.jpg" alt="Earth Tile 23">
          <img src="img/tiles/tile-24.jpg" alt="Earth Tile 24">
          <img src="img/tiles/tile-25.jpg" alt="Earth Tile 25">
          <img src="img/tiles/tile-26.jpg" alt="Earth Tile 26">
          <img src="img/tiles/tile-27.jpg" alt="Earth Tile 27">
          <img src="img/tiles/tile-28.jpg" alt="Earth Tile 28">
          <img src="img/tiles/tile-29.jpg" alt="Earth Tile 29">
          <img src="img/tiles/tile-30.jpg" alt="Earth Tile 30">
          <img src="img/tiles/tile-31.jpg" alt="Earth Tile 31">
        </div>
      `;
      return bodyBlock;
    }

    mapMoveStart(event){
      event.preventDefault();
      this.dragging = true;
      this.mouseStart = {
        clientX: event.clientX,
        clientY: event.clientY
      };

      let mapComputedStyle = window.getComputedStyle(this.baseLayer);
      this.mapStart = {
        left: Number.parseInt(mapComputedStyle.left, 10),
        top: Number.parseInt(mapComputedStyle.top, 10),
        width: Number.parseInt(mapComputedStyle.width, 10),
        height: Number.parseInt(mapComputedStyle.height, 10)
      }

      let windowDivComputedStyle = window.getComputedStyle(this.windowDiv);
      this.mapWindow = {
        height: this.windowDiv.clientHeight,
        width: this.windowDiv.clientWidth
      }

      this.baseLayer.classList.add('dragging');
    }

    mapMove(event){
      if(this.dragging){
        let deltaX = event.clientX - this.mouseStart.clientX;
        let mapLeft = this.mapStart.left + deltaX;
        let maxMapLeft = this.mapWindow.width - this.mapStart.width;
        if(mapLeft > 0){
          mapLeft = 0;
        }else if(mapLeft < maxMapLeft){
          mapLeft = maxMapLeft;
        }

        let deltaY = event.clientY - this.mouseStart.clientY;
        let mapTop = this.mapStart.top + deltaY;
        let maxMapTop = this.mapWindow.height - this.mapStart.height;
        if(mapTop > 0){
          mapTop = 0;
        }else if(mapTop < maxMapTop){
          mapTop = maxMapTop;
        }

        this.baseLayer.style.left = `${mapLeft}px`;
        this.baseLayer.style.top = `${mapTop}px`;
      }
    }

    mapMoveEnd(event){
      this.dragging = false;
      this.mouseStart = undefined;
      this.mapStart = undefined;
      this.mapWindow = undefined;
      this.baseLayer.classList.remove('dragging');
    }
  }
);
