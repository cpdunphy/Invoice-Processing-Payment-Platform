import {
  BlocksIcon,
  EclipseIcon,
  FastForwardIcon,
  LanguagesIcon,
  MonitorSmartphoneIcon,
  RocketIcon,
  ScanFaceIcon,
  SquarePenIcon,
  FileTextIcon,
  ShieldCheckIcon,
  DatabaseIcon,
  CodeIcon,
} from "lucide-react";
import { Item, ItemIcon, ItemTitle, ItemDescription } from "../../ui/item";
import { Section } from "../../ui/section";

export default function Items() {
  return (
    <Section>
      <div className="mx-auto flex max-w-container flex-col items-center gap-6 sm:gap-20">
        <h2 className="max-w-[560px] text-center text-3xl font-semibold leading-tight sm:text-5xl sm:leading-tight">
          Everything you need. Nothing you don&apos;t.
        </h2>
        <div className="grid auto-rows-fr grid-cols-2 gap-0 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          <Item>
            <ItemTitle className="flex items-center gap-2">
              <ItemIcon>
                <ScanFaceIcon className="h-5 w-5 stroke-1" />
              </ItemIcon>
              AI-Powered Extraction
            </ItemTitle>
            <ItemDescription>
              Automatically extract key invoice details using AI and OCR.
            </ItemDescription>
          </Item>
          <Item>
            <ItemTitle className="flex items-center gap-2">
              <ItemIcon>
                <ShieldCheckIcon className="h-5 w-5 stroke-1" />
              </ItemIcon>
              Fraud Detection
            </ItemTitle>
            <ItemDescription>
              Detect duplicate invoices, incorrect amounts, and potential fraud risks.
            </ItemDescription>
          </Item>
          <Item>
            <ItemTitle className="flex items-center gap-2">
              <ItemIcon>
                <MonitorSmartphoneIcon className="h-5 w-5 stroke-1" />
              </ItemIcon>
              Responsive Design
            </ItemTitle>
            <ItemDescription>
              Works seamlessly across desktop, tablet, and mobile devices.
            </ItemDescription>
          </Item>
          <Item>
            <ItemTitle className="flex items-center gap-2">
              <ItemIcon>
                <EclipseIcon className="h-5 w-5 stroke-1" />
              </ItemIcon>
              Light & Dark Mode
            </ItemTitle>
            <ItemDescription>
              Switch between themes effortlessly for optimal readability.
            </ItemDescription>
          </Item>
          <Item>
            <ItemTitle className="flex items-center gap-2">
              <ItemIcon>
                <DatabaseIcon className="h-5 w-5 stroke-1" />
              </ItemIcon>
              Secure Data Storage
            </ItemTitle>
            <ItemDescription>
              Store and manage invoices securely with PostgreSQL integration.
            </ItemDescription>
          </Item>
          <Item>
            <ItemTitle className="flex items-center gap-2">
              <ItemIcon>
                <FastForwardIcon className="h-5 w-5 stroke-1" />
              </ItemIcon>
              Real-Time Processing
            </ItemTitle>
            <ItemDescription>
              Get invoice data extracted and validated instantly.
            </ItemDescription>
          </Item>
          <Item>
            <ItemTitle className="flex items-center gap-2">
              <ItemIcon>
                <FileTextIcon className="h-5 w-5 stroke-1" />
              </ItemIcon>
              Multi-Format Support
            </ItemTitle>
            <ItemDescription>
              Process invoices from PDFs, scanned images, and handwritten documents.
            </ItemDescription>
          </Item>
          <Item>
            <ItemTitle className="flex items-center gap-2">
              <ItemIcon>
                <CodeIcon className="h-5 w-5 stroke-1" />
              </ItemIcon>
              API & ERP Integration
            </ItemTitle>
            <ItemDescription>
              Seamlessly connect with external financial tools and workflows.
            </ItemDescription>
          </Item>
        </div>
      </div>
    </Section>
  );
}