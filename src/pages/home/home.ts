import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Content } from 'ionic-angular';

import * as Stats from  'stats.js';
import * as PIXI from 'pixi.js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController) {

  }

  ngAfterViewInit() {
    var renderer = PIXI.autoDetectRenderer(600, 600, {backgroundColor : 0x488aff});
    this.content.getNativeElement().appendChild(renderer.view);
    //this.canvas.nativeElement.appendChild(renderer.view);
    //console.log(renderer.view);
    
    // create the root of the scene graph
    var stage = new PIXI.Container();
    
    
    let bunnies = [];
    for (var j = 0; j < 5; j++) {
    
        for (var i = 0; i < 5; i++) {
            var bunny = PIXI.Sprite.fromImage('assets/imgs/img150x150.png');
            bunny.anchor.x = 0.5;
            bunny.anchor.y = 0.5;
    
            bunny.x = 40 * i + 100;
            bunny.y = 40 * j + 200;
            stage.addChild(bunny);
            bunnies.push(bunny);
        };
    };
    
    let me = PIXI.Sprite.fromImage('assets/imgs/img150x150.png');
    me.anchor.x = 0.5;
    me.anchor.y = 0.5;
    me.x = 75 + 10;
    me.y = 75 + 10;
    stage.addChild(me);
    
    // init stats
    let stats = new Stats();
    stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    this.content.getNativeElement().appendChild(stats.dom);
    
    //let page = this;
    // start animating
  
    animate();
  
    function animate() {
     
        stats.begin();
        requestAnimationFrame(animate);

        //me.x += 1;
        //me.y += 1;
    
        // just for fun, let's rotate mr rabbit a little
        for (let bunny of bunnies) {
          bunny.rotation += 0.1;
        }
    
        // render the container
        renderer.render(stage);
        stats.end();
    }    
  }

}
