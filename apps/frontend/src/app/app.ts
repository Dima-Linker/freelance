import { Component } from '@angular/core';
import { AppShell } from '@veyro/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AppShell],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
