import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { exampleSections } from './app.routes';

interface ViewSection {
  title: string;
  examples: { title: string; commands: readonly string[]; isCodeOnly: boolean }[];
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgFor, NgIf],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly sections: ViewSection[] = exampleSections.map((section) => ({
    title: section.title,
    examples: section.examples.map((example) => ({
      title: example.title,
      commands: ['/examples', section.basePath, example.segment] as const,
      isCodeOnly: !!example.isCodeOnly,
    })),
  }));
}
