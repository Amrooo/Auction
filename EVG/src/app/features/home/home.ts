import { Component } from '@angular/core';
import { TranslateLicence } from '../translate-licence/translate-licence';

@Component({
  selector: 'app-home',
  imports: [TranslateLicence],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  showTranslateModal = false;

  serviceHubs = [
    { title: 'Individual / Drivers', desc: 'Manage all your vehicle services in one place.', img: 'https://testing-sp.evg.ae/Portal/assets/images/01.png' },
    { title: 'Fleet management', desc: 'Track and manage your entire fleet effortlessly.', img: 'https://testing-sp.evg.ae/Portal/assets/images/02.png' },
    { title: 'Insurance', desc: 'Quotes, policies, and claims made simple.', img: 'https://testing-sp.evg.ae/Portal/assets/images/03.png' },
    { title: 'Brokers', desc: 'Fast vehicle checks and policy management.', img: 'https://testing-sp.evg.ae/Portal/assets/images/01.png' }
  ];

  services = [
    { title: 'Pay Traffic Fines', desc: 'Quickly view and pay all your vehicle fines online.', img: 'https://testing-sp.evg.ae/Portal/assets/images/pay-traffic-fines.png', action: '' },
    { title: 'Buy Insurance', desc: 'Compare policies and purchase motor insurance instantly.', img: 'https://testing-sp.evg.ae/Portal/assets/images/buy-insurance.png', action: '' },
    { title: 'Renew vehicle Registration', desc: 'Renew your vehicle registration in a few simple steps.', img: 'https://testing-sp.evg.ae/Portal/assets/images/renew-registration.png', action: '' },
    { title: 'Payment Receipts', desc: 'Settle and manage policy quotations seamlessly.', img: 'https://testing-sp.evg.ae/Portal/assets/images/quotation-settlement.png', action: '' },
    { title: 'Translate Driving Licence', desc: 'Get an official certified translation of your driving licence.', img: 'https://testing-sp.evg.ae/Portal/assets/svg/cards.svg', action: 'translate' }
  ];

  stats = [
    { value: '500K+', label: 'Active Users', icon: 'https://testing-sp.evg.ae/Portal/assets/svg/active-user.svg' },
    { value: '2M+', label: 'Services Processed', icon: 'https://testing-sp.evg.ae/Portal/assets/svg/service.svg' },
    { value: '99.9%', label: 'Uptime', icon: 'https://testing-sp.evg.ae/Portal/assets/svg/uptime.svg' },
    { value: '100%', label: 'Secure', icon: 'https://testing-sp.evg.ae/Portal/assets/svg/secure.svg' }
  ];

  onServiceClick(service: any) {
    if (service.action === 'translate') {
      this.showTranslateModal = true;
    }
  }

  closeTranslateModal() {
    this.showTranslateModal = false;
  }
}
