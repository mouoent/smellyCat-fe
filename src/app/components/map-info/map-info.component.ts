import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-map-info',
  templateUrl: './map-info.component.html',
  styleUrls: ['./map-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapInfoComponent {
  address: string = "Aristotelous 16, 54658 Thessaloniki, Greece";

  constructor(private sanitizer: DomSanitizer) {}

  getSafeMapUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.google.com/maps?q=${encodeURIComponent(this.address)}&output=embed`
    );
  }
}
