import { Injectable } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';

export enum SeoTag {
  Image = 'og:image',
  Url = 'og:url',
  SiteName = 'og:sitename',
}

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(private pageTitle: Title, private meta: Meta) {}

  addTitle(title: string) {
    this.pageTitle.setTitle(title);
    this.meta.addTag({ 'og:title': title });
    return this;
  }

  addDescription(description: string) {
    this.meta.addTag({ 'og:description': description });
    return this;
  }

  addMeta(tags: MetaDefinition[]) {
    this.meta.addTags(tags);
    return this;
  }
}
