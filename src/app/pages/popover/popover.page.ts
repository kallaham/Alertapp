import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage implements OnInit {

  lugar:string='';
  operario:string='';

  constructor(private navParams:NavParams,private popover: PopoverController) { }

  ngOnInit() {
    this.lugar=this.navParams.get('lugar');
    this.operario=this.navParams.get('operario');
  }

  cerrarPopover(){
    this.popover.dismiss();
  }

}
