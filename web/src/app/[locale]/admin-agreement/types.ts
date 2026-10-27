export interface Point {
  x: number;
  y: number;
}

export type Stroke = Point[];

export interface ScreenshotCaptureResult {
  blob: Blob;
  dataUrl: string;
  base64: string;
}

export interface AdminAgreementFormData {
  fullName: string;
  email: string;
  phone: string;
  designation: string;
  proofFile: File | null;
  proofFileName: string;
  proofFileBase64: string;
  agreed: boolean;
  signatureDataUrl: string | null;
  signedTimestamp: string | null;
}

export type AgreementMessage = {
  text: string;
  type: "success" | "error" | "info";
};
