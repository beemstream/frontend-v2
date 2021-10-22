import { Injectable } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';

export enum SeoTag {
  Image = 'og:image',
  ImageWidth = 'og:image:width',
  ImageHeight = 'og:image:height',
  Url = 'og:url',
  SiteName = 'og:site_name',
  Title = 'og:title',
  Description = 'description',
}

@Injectable()
export class SeoService {
  prefix = 'BeemStream ';

  constructor(private pageTitle: Title, private meta: Meta) {
    this.meta.addTag({ property: SeoTag.SiteName, content: 'BeemStream' });
  }

  addTitle(title: string) {
    this.pageTitle.setTitle(`${this.prefix} - ${title}`);
    this.meta.updateTag({ property: SeoTag.Title, content: title });
    return this;
  }

  addDescription(description: string) {
    this.meta.updateTag({ property: SeoTag.Description, content: description });
    return this;
  }

  addMeta(tags: MetaDefinition[]) {
    this.meta.addTags(tags);
    return this;
  }

  addImage(imageUrl: string, width: number, height: number) {
    this.meta.updateTag({ property: SeoTag.Image, content: imageUrl });
    this.meta.updateTag({ property: SeoTag.ImageWidth, content: `${width}` });
    this.meta.updateTag({ property: SeoTag.ImageHeight, content: `${height}` });
    return this;
  }
}
