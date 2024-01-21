import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tag-selector',
  templateUrl: './tag-selector.component.html',
  styleUrls: ['./tag-selector.component.scss'],
})
export class TagSelectorComponent implements OnInit {
  @Input() tags: string[] = [];

  @Output() selectedTagsChange = new EventEmitter<string[]>();

  search: string = '';
  selectedTags: string[] = [];
  availableTags: string[] = [];

  cursorPosition: number = 0;

  constructor() {}

  ngOnInit() {
    this.availableTags = [...this.tags];
  }

  onSearchTag() {
    if (this.search.length > 0) {
      this.availableTags = this.tags.filter(t => {
        return t.toLowerCase().includes(this.search.toLowerCase());
      });
    } else {
      this.availableTags = [...this.tags];
    }
  }

  onTagSelectEnter() {
    if (this.availableTags.length > 0 && this.search.length > 0) {
      this.onTagSelect(this.availableTags[this.cursorPosition]);
    }
  }

  scrollSelectedToView() {
    //wait for DOM update
    setTimeout(() => {
      const element = document.getElementsByClassName('selected')[0];
      element!.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
    }, 10);
  }

  onDeleteLastTag() {
    //only if there is at least one tag and the search is empty
    if (this.selectedTags.length === 0 || this.search.length !== 0) return;

    const lastTag = this.selectedTags.pop();
    if (lastTag) {
      this.availableTags.push(lastTag);
    }
    this.selectedTagsChange.emit(this.selectedTags);
  }

  onMoveCursorUp() {
    if (this.cursorPosition === 0) {
      this.cursorPosition = this.availableTags.length - 1;
    } else {
      this.cursorPosition--;
    }
    //scroll to view
    this.scrollSelectedToView();
  }

  onMoveCursorDown() {
    if (this.cursorPosition === this.availableTags.length - 1) {
      this.cursorPosition = 0;
    } else {
      this.cursorPosition++;
    }
    this.scrollSelectedToView();
  }

  onTagSelect(tag: string) {
    this.selectedTags.push(tag);
    this.selectedTagsChange.emit(this.selectedTags);
    this.availableTags = this.availableTags.filter(t => t !== tag);
    this.search = '';
    this.cursorPosition = 0;
  }
}
