import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import * as emailjs from '@emailjs/browser'
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  activeSection: string | null = null;
  emailValue: string = '';
   serviceID = "service_ru5nrdk";
 templateID = "template_u2lh0nf";

 clientName:any = document.querySelector("#clientName");
 clientEmail:any = document.querySelector("#clientEmail");
 clientMessage:any = document.querySelector("#clientMessage");

 form = document.querySelector("form");
  portfolioTitle:any = document.querySelector('#portfolio-title')
  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
        const defaultTitle = 'Gaurav'
        console.log(document['hidden'],135)
        if (typeof document.hidden !== "undefined") 
        {
      
          const handleVisibilityChange = () => 
          {
            console.log(document['hidden'])
            if (document['hidden']) 
            {
              this.portfolioTitle['innerText'] = 'The One U R Looking For'
            } else 
            {
              this.portfolioTitle['innerText'] = defaultTitle
            }
          }
      
          document.addEventListener('visibilitychange', handleVisibilityChange, false);
        } else 
        {
          // Page Visibility API is not supported
          this.portfolioTitle.innerText = defaultTitle
        }
  }
  @HostListener('window:scroll', [])
  onScroll() {
    const scrollPosition = window.scrollY;
    const sections = ['home', 'about', 'projects', 'contact'];

    for (const section of sections) {
      const element = this.elementRef.nativeElement.querySelector(`#${section}`);
      if (element) {
        const rect = element.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const bottom = top + element.clientHeight;

        if (scrollPosition >= top && scrollPosition < bottom) {
          this.activeSection = section;
          break;
        }
      }
    }
  }
  scrollToElement(id: string): void {
    const element = this.elementRef.nativeElement.querySelector('#' + id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  isActive(section: string): boolean {
    return this.activeSection === section;
  }

  sendEmail() {
    emailjs.send(this.serviceID, this.templateID, {
      to_email: 'recipient@example.com',
      message: 'This is a test email from EmailJS!'
    }, 'AlNImlEIf2LNbTp2L')
      .then((response) => {
        console.log('Email sent successfully:', response);
      }, (error) => {
        console.error('Email failed to send:', error);
      });
  }
   openResume(){
    console.log('asdhjh');
      window.open(
        "https://drive.google.com/file/d/1B2SMiaUpt3ITBrt2ACak1Km9YWL1v5Dp/view?usp=drive_link"
      )
    }
}
