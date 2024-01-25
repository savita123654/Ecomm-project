import { Component } from '@angular/core';
import { faFacebookF, faGoogle, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  faFacebookF = faFacebookF;
  faTwitter = faTwitter;
  faGoogle = faGoogle;
  faInstagram = faInstagram;
  faLinkedin = faLinkedin;
}
