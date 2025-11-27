import React, { useState } from 'react';
import { StepIndicator } from './components/StepIndicator';
import { RadioGroup, CheckboxGroup, TextInput } from './components/FormControls';
import { FormData, INITIAL_DATA } from './types';
import { generateProjectScope } from './services/geminiService';
import { 
  ChevronRight, 
  ChevronLeft, 
  Send, 
  Sparkles, 
  Package, 
  CreditCard, 
  Truck, 
  Layout, 
  Settings,
  ShoppingBag,
  Globe
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

// Define Step Categories for UI
const STEPS = [
  "Marca & Negocio",
  "Productos",
  "Pagos & Envíos",
  "Funcionalidades",
  "Contenido & Final"
];

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [geminiResult, setGeminiResult] = useState<string | null>(null);

  const updateField = <K extends keyof FormData>(section: K, field: keyof FormData[K], value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const result = await generateProjectScope(formData);
    setGeminiResult(result);
    setIsSubmitting(false);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Marca & Negocio (Questions 1, 6, 9)
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                <Layout size={24} />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Marca y Negocio</h2>
            </div>

            <RadioGroup
              label="¿Tienen logo, colores corporativos y manual de marca?"
              name="hasBranding"
              value={formData.brand.hasBranding}
              options={[
                { label: "Sí, tenemos todo listo", value: "yes" },
                { label: "Tenemos logo pero falta manual", value: "partial" },
                { label: "No, necesitamos diseño desde cero", value: "no" }
              ]}
              onChange={(v) => updateField('brand', 'hasBranding', v)}
            />

            <RadioGroup
              label="¿Estado del sitio web?"
              name="websiteStatus"
              value={formData.brand.websiteStatus}
              options={[
                { label: "Es un proyecto nuevo (desde cero)", value: "new" },
                { label: "Ya existe una web, queremos rediseño", value: "redesign" }
              ]}
              onChange={(v) => updateField('brand', 'websiteStatus', v)}
            />

            <RadioGroup
              label="¿Ya tienen Hosting y Dominio?"
              name="hasHostingDomain"
              value={formData.tech.hasHostingDomain}
              options={[
                { label: "Sí, ya tenemos ambos", value: "yes" },
                { label: "Tenemos dominio pero no hosting", value: "partial" },
                { label: "No, necesitamos asesoría", value: "no" }
              ]}
              onChange={(v) => updateField('tech', 'hasHostingDomain', v)}
            />

            <TextInput
              label="¿Tienen algún referente de diseño o páginas ejemplo que les gusten?"
              placeholder="Ej: me gusta la limpieza de apple.com o los colores de..."
              value={formData.brand.designReferences}
              onChange={(v) => updateField('brand', 'designReferences', v)}
              multiline
            />

            <TextInput
              label="¿Tienen una fecha límite para el lanzamiento?"
              type="date"
              value={formData.timeline.deadline}
              onChange={(v) => updateField('timeline', 'deadline', v)}
            />
          </div>
        );

      case 1: // Productos (Question 2)
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b">
              <div className="p-2 bg-green-100 rounded-lg text-green-600">
                <ShoppingBag size={24} />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Catálogo y Productos</h2>
            </div>

            <RadioGroup
              label="¿Los productos incluyen variantes? (Tallas, colores, materiales)"
              name="hasVariants"
              value={formData.products.hasVariants}
              options={[
                { label: "Sí, tienen variantes", value: "yes" },
                { label: "No, son productos simples", value: "no" }
              ]}
              onChange={(v) => updateField('products', 'hasVariants', v)}
            />

            <TextInput
              label="¿Aproximadamente cuántas categorías existen?"
              placeholder="Ej: 5 (Zapatos, Camisas, Pantalones...)"
              value={formData.products.categoryCount}
              onChange={(v) => updateField('products', 'categoryCount', v)}
              type="number"
            />

            <RadioGroup
              label="¿Quién se encargará de subir los productos?"
              name="uploadMethod"
              value={formData.products.uploadMethod}
              options={[
                { label: "El cliente los subirá (requiere capacitación)", value: "client" },
                { label: "Necesitamos que tú los subas", value: "developer" }
              ]}
              onChange={(v) => updateField('products', 'uploadMethod', v)}
            />

            {formData.products.uploadMethod === 'developer' && (
              <RadioGroup
                label="¿Tienen fotos y descripciones listas?"
                name="contentReady"
                value={formData.products.contentReady}
                options={[
                  { label: "Sí, todo listo", value: "yes" },
                  { label: "Estamos trabajando en ello", value: "partial" },
                  { label: "No, necesitamos ayuda", value: "no" }
                ]}
                onChange={(v) => updateField('products', 'contentReady', v)}
              />
            )}
             <RadioGroup
              label="¿Estructura de Categorías?"
              name="categoryStructure"
              value={formData.products.categoryStructure}
              options={[
                { label: "Simple (1 nivel)", value: "simple" },
                { label: "Compleja (Categorías y sub-categorías)", value: "complex" }
              ]}
              onChange={(v) => updateField('products', 'categoryStructure', v)}
            />
          </div>
        );

      case 2: // Pagos & Envíos (Questions 3, 4)
        return (
          <div className="space-y-6 animate-fadeIn">
             <div className="flex items-center gap-3 mb-6 pb-4 border-b">
              <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                <CreditCard size={24} />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Pagos y Envíos</h2>
            </div>

            <CheckboxGroup
              label="Métodos de Pago Online Deseados"
              selectedValues={formData.payments.onlineMethods}
              options={[
                { label: "Stripe (Tarjeta Crédito/Débito)", value: "Stripe" },
                { label: "PayPal", value: "PayPal" },
                { label: "MercadoPago", value: "MercadoPago" },
                { label: "PayU", value: "PayU" },
                { label: "Pasarela Bancaria Directa", value: "BankGateway" }
              ]}
              onChange={(v) => updateField('payments', 'onlineMethods', v)}
            />

            <CheckboxGroup
              label="Métodos Offline"
              selectedValues={formData.payments.offlineMethods}
              options={[
                { label: "Transferencia Bancaria", value: "Transfer" },
                { label: "Pago contra entrega (Efectivo)", value: "COD" }
              ]}
              onChange={(v) => updateField('payments', 'offlineMethods', v)}
            />

            <div className="border-t pt-6 mt-6">
                <div className="flex items-center gap-2 mb-4">
                    <Truck className="text-gray-500" size={20}/>
                    <h3 className="font-medium text-gray-700">Configuración de Envíos</h3>
                </div>

                <RadioGroup
                    label="Alcance de los envíos"
                    name="scope"
                    value={formData.shipping.scope}
                    options={[
                        { label: "Solo Local (Misma ciudad)", value: "local" },
                        { label: "Nacional", value: "national" },
                        { label: "Internacional", value: "international" }
                    ]}
                    onChange={(v) => updateField('shipping', 'scope', v)}
                />

                <RadioGroup
                    label="Cálculo de Tarifas"
                    name="rateCalculation"
                    value={formData.shipping.rateCalculation}
                    options={[
                        { label: "Tarifa Fija (Flat rate)", value: "fixed" },
                        { label: "Por Zona / Región", value: "zone" },
                        { label: "Integración Automática (Fedex, DHL, etc.)", value: "automatic" }
                    ]}
                    onChange={(v) => updateField('shipping', 'rateCalculation', v)}
                />
            </div>
          </div>
        );

      case 3: // Funcionalidades (Question 5)
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b">
              <div className="p-2 bg-yellow-100 rounded-lg text-yellow-600">
                <Sparkles size={24} />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Funcionalidades Extra</h2>
            </div>

            <CheckboxGroup
              label="Seleccione las funcionalidades adicionales requeridas:"
              description="Marque todo lo que aplique para su modelo de negocio."
              selectedValues={formData.features.selected}
              options={[
                { label: "Blog / Noticias", value: "Blog" },
                { label: "Reservas / Citas Online", value: "Bookings" },
                { label: "Botón WhatsApp Flotante", value: "WhatsApp" },
                { label: "Integración Instagram/Facebook Shop", value: "SocialShop" },
                { label: "Sistema de Cupones", value: "Coupons" },
                { label: "Área de Cliente / Historial", value: "UserAccount" },
                { label: "Cálculo de Impuestos Automático", value: "Taxes" },
                { label: "Multi-idioma", value: "MultiLanguage" },
                { label: "Pop-up de Suscripción (Newsletter)", value: "Newsletter" }
              ]}
              onChange={(v) => updateField('features', 'selected', v)}
            />
          </div>
        );

      case 4: // Contenido & Mantenimiento (Questions 7, 8)
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b">
              <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                <Settings size={24} />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Contenido y Finalización</h2>
            </div>

            <CheckboxGroup
              label="Secciones del sitio (además de Tienda)"
              selectedValues={formData.content.sections}
              options={[
                { label: "Inicio (Home)", value: "Home" },
                { label: "Nosotros / Quiénes Somos", value: "About" },
                { label: "Servicios", value: "Services" },
                { label: "Contacto", value: "Contact" },
                { label: "Preguntas Frecuentes (FAQ)", value: "FAQ" },
                { label: "Política de Privacidad / Términos", value: "Legal" }
              ]}
              onChange={(v) => updateField('content', 'sections', v)}
            />

             <RadioGroup
              label="¿Entregan textos e imágenes listos?"
              name="contentCreationHelp"
              value={formData.content.contentCreationHelp}
              options={[
                { label: "Sí, entregamos todo el material", value: "client_provides" },
                { label: "Necesitamos ayuda para redactar/crear", value: "needs_help" }
              ]}
              onChange={(v) => updateField('content', 'contentCreationHelp', v)}
            />

            <RadioGroup
              label="Plan de Mantenimiento Post-Lanzamiento"
              name="plan"
              value={formData.maintenance.plan}
              options={[
                { label: "Deseo un plan mensual (actualizaciones, seguridad, cambios menores)", value: "monthly" },
                { label: "Solo entrega del proyecto (yo me encargo)", value: "none" }
              ]}
              onChange={(v) => updateField('maintenance', 'plan', v)}
            />
          </div>
        );
      default:
        return null;
    }
  };

  if (geminiResult) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6 flex items-center justify-between">
            <div className="flex items-center gap-3 text-white">
              <Sparkles size={28} />
              <h1 className="text-2xl font-bold">Alcance del Proyecto Generado</h1>
            </div>
            <button 
                onClick={() => setGeminiResult(null)}
                className="text-white/80 hover:text-white text-sm font-medium"
            >
                Volver al formulario
            </button>
          </div>
          <div className="p-8 prose prose-blue max-w-none">
            <ReactMarkdown>{geminiResult}</ReactMarkdown>
          </div>
          <div className="bg-gray-50 px-8 py-4 border-t flex justify-end">
            <button 
                onClick={() => window.print()}
                className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
                Imprimir / Guardar PDF
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4 sm:px-6">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cotización de E-commerce</h1>
          <p className="text-gray-500">Completa el siguiente formulario para definir el alcance de tu proyecto.</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Progress Bar */}
          <div className="px-8 pt-6">
            <StepIndicator 
              currentStep={currentStep} 
              totalSteps={STEPS.length} 
              steps={STEPS} 
            />
          </div>

          {/* Content */}
          <div className="p-8 min-h-[400px]">
            {renderStepContent()}
          </div>

          {/* Footer / Navigation */}
          <div className="bg-gray-50 px-8 py-6 border-t flex justify-between items-center">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`flex items-center px-5 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${currentStep === 0 
                  ? 'text-gray-300 cursor-not-allowed' 
                  : 'text-gray-700 hover:bg-gray-200 bg-white border border-gray-300 shadow-sm'
                }`}
            >
              <ChevronLeft size={16} className="mr-2" />
              Anterior
            </button>

            {currentStep === STEPS.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`flex items-center px-6 py-2.5 rounded-lg text-sm font-medium text-white shadow-md transition-all
                  ${isSubmitting 
                    ? 'bg-blue-400 cursor-wait' 
                    : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'
                  }`}
              >
                {isSubmitting ? (
                    <span className="flex items-center">
                         <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                         </svg>
                         Analizando con IA...
                    </span>
                ) : (
                    <>
                        <Sparkles size={16} className="mr-2" />
                        Finalizar y Analizar
                    </>
                )}
              </button>
            ) : (
              <button
                onClick={nextStep}
                className="flex items-center px-6 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-black transition-colors shadow-md"
              >
                Siguiente
                <ChevronRight size={16} className="ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
