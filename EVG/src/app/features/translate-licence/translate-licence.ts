import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface LicenceDetails {
  fullName: string;
  licenceNumber: string;
  nationality: string;
  dateOfBirth: string;
  issueDate: string;
  expiryDate: string;
  category: string;
  issuingCountry: string;
}

interface TranslationOffice {
  id: number;
  name: string;
  location: string;
  rating: number;
  turnaround: string;
  fee: number;
}

@Component({
  selector: 'app-translate-licence',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './translate-licence.html',
  styleUrl: './translate-licence.css'
})
export class TranslateLicence {
  @Output() close = new EventEmitter<void>();

  currentStep = 0;
  totalSteps = 7;
  uploadedFile: File | null = null;
  uploadedFileName = '';
  isProcessingOCR = false;
  ocrProgress = 0;
  selectedOfficeId: number | null = null;
  selectedPayment = '';
  phoneNumber = '';
  cardNumber = '';
  cardExpiry = '';
  cardCvv = '';
  isProcessingPayment = false;
  requestNumber = '';
  trackingUrl = '';
  requestStatus = 0; // 0=processing, 1=in-progress, 2=completed

  steps = [
    { label: 'Instructions', icon: 'info' },
    { label: 'Upload', icon: 'upload_file' },
    { label: 'OCR Scan', icon: 'document_scanner' },
    { label: 'Confirm', icon: 'fact_check' },
    { label: 'Select Office', icon: 'location_on' },
    { label: 'Payment', icon: 'payment' },
    { label: 'Status', icon: 'track_changes' }
  ];

  licenceDetails: LicenceDetails = {
    fullName: '',
    licenceNumber: '',
    nationality: '',
    dateOfBirth: '',
    issueDate: '',
    expiryDate: '',
    category: '',
    issuingCountry: ''
  };

  offices: TranslationOffice[] = [
    { id: 1, name: 'Al Futtaim Translation Services', location: 'Abu Dhabi, Khalifa City', rating: 4.8, turnaround: '1-2 business days', fee: 150 },
    { id: 2, name: 'Emirates Certified Translation', location: 'Dubai, Business Bay', rating: 4.6, turnaround: '2-3 business days', fee: 120 },
    { id: 3, name: 'National Translation Bureau', location: 'Sharjah, Al Majaz', rating: 4.5, turnaround: '1 business day', fee: 180 },
    { id: 4, name: 'Gulf Official Translation', location: 'Ajman, Al Rashidiya', rating: 4.3, turnaround: '3-5 business days', fee: 100 }
  ];

  get selectedOffice(): TranslationOffice | undefined {
    return this.offices.find(o => o.id === this.selectedOfficeId);
  }

  get canProceed(): boolean {
    switch (this.currentStep) {
      case 0: return true;
      case 1: return !!this.uploadedFile;
      case 2: return !this.isProcessingOCR;
      case 3: return !!this.licenceDetails.fullName && !!this.licenceDetails.licenceNumber;
      case 4: return this.selectedOfficeId !== null;
      case 5: return !!this.selectedPayment && !!this.phoneNumber;
      default: return true;
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.uploadedFile = input.files[0];
      this.uploadedFileName = input.files[0].name;
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
      this.uploadedFile = event.dataTransfer.files[0];
      this.uploadedFileName = event.dataTransfer.files[0].name;
    }
  }

  nextStep() {
    if (this.currentStep === 1 && this.uploadedFile) {
      this.currentStep = 2;
      this.startOCR();
      return;
    }
    if (this.currentStep === 5) {
      this.processPayment();
      return;
    }
    if (this.currentStep < this.totalSteps - 1) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  startOCR() {
    this.isProcessingOCR = true;
    this.ocrProgress = 0;
    const interval = setInterval(() => {
      this.ocrProgress += Math.random() * 15 + 5;
      if (this.ocrProgress >= 100) {
        this.ocrProgress = 100;
        clearInterval(interval);
        setTimeout(() => {
          // Simulate extracted OCR data
          this.licenceDetails = {
            fullName: 'Ahmed Mohammed Al Mansouri',
            licenceNumber: 'DL-2024-78543',
            nationality: 'UAE',
            dateOfBirth: '1990-05-15',
            issueDate: '2022-01-10',
            expiryDate: '2032-01-09',
            category: 'Light Vehicle',
            issuingCountry: 'United Arab Emirates'
          };
          this.isProcessingOCR = false;
          this.currentStep = 3;
        }, 600);
      }
    }, 200);
  }

  processPayment() {
    this.isProcessingPayment = true;
    setTimeout(() => {
      this.isProcessingPayment = false;
      this.requestNumber = 'EVG-TL-' + Math.floor(100000 + Math.random() * 900000);
      this.trackingUrl = 'https://evg.ae/track/' + this.requestNumber;
      this.currentStep = 6;
      this.animateStatus();
    }, 2500);
  }

  animateStatus() {
    this.requestStatus = 0;
    setTimeout(() => { this.requestStatus = 1; }, 3000);
    setTimeout(() => { this.requestStatus = 2; }, 7000);
  }

  downloadPDF() {
    // Simulate download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `Translated_Licence_${this.requestNumber}.pdf`;
    alert('Your translated licence PDF is ready for download.');
  }

  closeModal() {
    this.close.emit();
  }
}
