export interface FormData {
  // 1. Brand / Business
  brand: {
    hasBranding: string; // "yes", "no", "partial"
    websiteStatus: string; // "new", "redesign"
    designReferences: string;
  };

  // 2. Products
  products: {
    hasVariants: string; // "yes", "no"
    categoryCount: string;
    uploadMethod: string; // "client", "developer"
    contentReady: string; // "yes", "no", "partial" (only if developer uploads)
    categoryStructure: string; // "simple", "complex"
  };

  // 3. Payments
  payments: {
    onlineMethods: string[]; // Stripe, PayPal, etc.
    offlineMethods: string[]; // Transfer, COD
  };

  // 4. Shipping
  shipping: {
    scope: string; // "local", "national", "international"
    provider: string;
    rateCalculation: string; // "fixed", "zone", "automatic"
  };

  // 5. Additional Features
  features: {
    selected: string[]; // blog, booking, etc.
  };

  // 6. Hosting / Domain
  tech: {
    hasHostingDomain: string; // "yes", "no", "partial"
  };

  // 7. Site Content
  content: {
    sections: string[]; // About, Services, etc.
    contentCreationHelp: string; // "client_provides", "needs_help"
  };

  // 8. Maintenance
  maintenance: {
    plan: string; // "monthly", "none"
  };

  // 9. Timeline
  timeline: {
    deadline: string;
  };
}

export const INITIAL_DATA: FormData = {
  brand: { hasBranding: '', websiteStatus: '', designReferences: '' },
  products: { hasVariants: '', categoryCount: '', uploadMethod: '', contentReady: '', categoryStructure: '' },
  payments: { onlineMethods: [], offlineMethods: [] },
  shipping: { scope: '', provider: '', rateCalculation: '' },
  features: { selected: [] },
  tech: { hasHostingDomain: '' },
  content: { sections: [], contentCreationHelp: '' },
  maintenance: { plan: '' },
  timeline: { deadline: '' },
};
