import { Component, Input, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewChecked } from '@angular/core';
import { APIResponseItem, stylesProp } from '../../types';
import { StylesDataService } from '../../services/get-styles-data.service';
import { InfiniteScrollService } from '../../services/infinity-scroll.service';
import { Shade } from '../../utils';

@Component({
  selector: 'lib-notification-button',
  templateUrl: './notification-button.component.html',
  styleUrls: ['./notification-button.component.css']
})
export class NotificationButtonComponent implements OnInit, AfterViewChecked, OnDestroy  {
  @Input() apiKey!: string;
  @Input() position!: string;
  @Input() messageBoxStyles!: any;
  @Input() containerStyles!: any;
  @Input() headerStyles!: any;
  @Input() textStyles!: any;
  @Input() id!: string;
  @Input() isDev!: boolean;
  @Input() isLocal!: boolean;
  @Input() ruleStyles!: any;

  loading = true;
  error = false;
  data: APIResponseItem[] = [];
  item: any[] = [];
  hasMore = false;
  pageNo = 1;
  pageSize = 10;
  clicked = false;
  pageNum = 1;
  stylesData?: stylesProp;
  myNewContainerStyles!:object
  BASE_URL!:string
  morePage!:number

  private observer!: IntersectionObserver;
  @ViewChild('messageContainer') messageContainer!: ElementRef<HTMLElement>;
  constructor(private infiniteScrollService: InfiniteScrollService, private stylesDataService: StylesDataService, private host: ElementRef) { }

  getText(item: APIResponseItem): string {
    const jsonData = typeof item.json_data === 'string' ? JSON.parse(item.json_data) : item.json_data;
    return jsonData.text;
  }
  getTime(item: APIResponseItem): string {
    return item.createdAt;
  }

  ngOnInit(): void {
    this.myNewContainerStyles = Object.assign({position: 'relative'}, this.containerStyles)
    this.BASE_URL = this.isDev ? 'https://dev.mok.one' : this.isLocal ? 'http://localhost:4200' : 'https://live.mok.one';
    this.getInfiniteScrollData();
    this.stylesDataService
      .getStylesData(this.BASE_URL, this.apiKey)
      .then((data) => (this.stylesData = data.data))
      .catch((error) => console.error(error));
    
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && this.hasMore) {
        this.getInfiniteScrollData();
      }
    }, this.options);
  }
  
  ngAfterViewChecked(): void {
    if(this.messageContainer){
      const cards = this.messageContainer.nativeElement.querySelectorAll('.message-card');
      if (cards.length > 0) {
        const lastCard = cards[cards.length - 1];
        this.observer.observe(lastCard);
      }
    }
  }
  
  ngOnDestroy() {
    this.observer.disconnect();
  }
  
  getInfiniteScrollData() {
    this.loading = true;
    this.error = false;
  
    this.infiniteScrollService
      .getInfiniteScrollData(this.BASE_URL, this.apiKey, this.id, this.pageNo, this.pageSize)
      .subscribe(
        (res: any) => {
          this.morePage = res.total
          if (res.data.length > 0) {
            this.data = [...this.data, ...res.data];
            this.hasMore = true;
            this.pageNo++;
          } else {
            this.hasMore = false;
          }
          this.loading = false;
        },
        (error: any) => {
          this.error = true;
          this.loading = false;
        }
      );
  }  

  get element() {
    return this.host.nativeElement;
  }
  
  options = {
    root:  this.isHostScrollable() ? this.host.nativeElement : null,
    rootMargin: '0px',
    threshold: 0.5
  };

  private isHostScrollable() {
    const style = window.getComputedStyle(this.element);
    return style.getPropertyValue('overflow') === 'auto' ||
      style.getPropertyValue('overflow-y') === 'scroll';
  }

  get titleTextColor() {
    return Shade(this.stylesData?.titleBarBgColor) === 'light' ? '#000' : '#fff';
  }
 
  get boxTextColor() {
    return Shade(this.stylesData?.notificationBgColor) === 'light' ? '#000' : '#fff';
  }

  toggle() {
    this.clicked = !this.clicked;
  }
}
