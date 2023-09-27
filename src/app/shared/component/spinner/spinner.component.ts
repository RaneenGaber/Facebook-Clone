import { Component, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {
  @Input() public strokeWidth: number=18;

  @Input() public diameter: number = 18;

  @Input() public color: ThemePalette ='primary';
  @Input() public message!: string;
}
