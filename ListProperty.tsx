import { useState } from 'react';
import { Home, Building2, Bed, Camera, MapPin, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const propertyTypes = [
  { id: 'hostel', label: 'Student Hostel', icon: Building2 },
  { id: 'shortlet', label: 'Shortlet', icon: Home },
  { id: 'apartment', label: 'Apartment', icon: Building2 },
  { id: 'room', label: 'Single Room', icon: Bed },
];

const steps = [
  { id: 1, label: 'Property Type' },
  { id: 2, label: 'Details' },
  { id: 3, label: 'Photos' },
  { id: 4, label: 'Pricing' },
];

export function ListProperty() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedType, setSelectedType] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    description: '',
    price: '',
    priceType: 'night',
    beds: 1,
    baths: 1,
    guests: 1,
  });

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-slate-900">What type of property?</h3>
            <div className="grid grid-cols-2 gap-3">
              {propertyTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      selectedType === type.id
                        ? 'border-[#0077ff] bg-blue-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <Icon className={`w-6 h-6 mb-2 ${selectedType === type.id ? 'text-[#0077ff]' : 'text-slate-400'}`} />
                    <p className={`font-medium ${selectedType === type.id ? 'text-[#0077ff]' : 'text-slate-700'}`}>
                      {type.label}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">Property Details</h3>
            <div>
              <label className="form-label">Title</label>
              <Input
                placeholder="e.g., Cozy Studio in Lekki"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="input-minimal"
              />
            </div>
            <div>
              <label className="form-label">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  placeholder="e.g., Lekki Phase 1, Lagos"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="input-minimal pl-10"
                />
              </div>
            </div>
            <div>
              <label className="form-label">Description</label>
              <textarea
                placeholder="Describe your property..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 min-h-[100px] resize-none"
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="form-label">Beds</label>
                <Input
                  type="number"
                  min={1}
                  value={formData.beds}
                  onChange={(e) => setFormData({ ...formData, beds: parseInt(e.target.value) })}
                  className="input-minimal"
                />
              </div>
              <div>
                <label className="form-label">Baths</label>
                <Input
                  type="number"
                  min={1}
                  value={formData.baths}
                  onChange={(e) => setFormData({ ...formData, baths: parseInt(e.target.value) })}
                  className="input-minimal"
                />
              </div>
              <div>
                <label className="form-label">Guests</label>
                <Input
                  type="number"
                  min={1}
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                  className="input-minimal"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-slate-900">Add Photos</h3>
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-[#0077ff] transition-colors cursor-pointer">
              <Camera className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <p className="text-slate-600 font-medium">Click to upload photos</p>
              <p className="text-sm text-slate-400 mt-1">or drag and drop</p>
              <p className="text-xs text-slate-400 mt-2">PNG, JPG up to 10MB each</p>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-20 h-20 bg-slate-100 rounded-lg flex-shrink-0 flex items-center justify-center">
                  <Camera className="w-6 h-6 text-slate-300" />
                </div>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">Set Your Price</h3>
            <div>
              <label className="form-label">Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-medium">₦</span>
                <Input
                  type="number"
                  placeholder="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="input-minimal pl-8"
                />
              </div>
            </div>
            <div>
              <label className="form-label">Price Type</label>
              <div className="flex gap-2 flex-wrap">
                {['night', 'week', 'month', 'year'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFormData({ ...formData, priceType: type })}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      formData.priceType === type
                        ? 'bg-[#0077ff] text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    /{type}
                  </button>
                ))}
              </div>
            </div>
            <div className="p-4 bg-green-50 rounded-xl">
              <div className="flex items-center gap-2 text-green-700 mb-2">
                <Check className="w-5 h-5" />
                <span className="font-medium">Ready to publish!</span>
              </div>
              <p className="text-sm text-green-600">
                Your listing will be reviewed and live within 24 hours.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="list-property" className="py-12 lg:py-16 bg-slate-50">
      <div className="section-container">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-xl lg:text-2xl font-bold text-slate-900 mb-2">
              List Your Property
            </h2>
            <p className="text-sm text-slate-500">
              No agent needed. List directly and start earning.
            </p>
          </div>

          {/* Progress */}
          <div className="flex justify-between mb-8">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step.id <= currentStep
                      ? 'bg-[#0077ff] text-white'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {step.id < currentStep ? <Check className="w-4 h-4" /> : step.id}
                </div>
                <span className="text-xs text-slate-500 mt-1 hidden sm:block">{step.label}</span>
              </div>
            ))}
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            {renderStep()}

            {/* Navigation */}
            <div className="flex gap-3 mt-8">
              {currentStep > 1 && (
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="flex-1 rounded-xl"
                >
                  Back
                </Button>
              )}
              <Button
                onClick={handleNext}
                className={`flex-1 bg-[#0077ff] hover:bg-[#0066dd] text-white rounded-xl ${
                  currentStep === 1 && !selectedType ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={currentStep === 1 && !selectedType}
              >
                {currentStep === 4 ? 'Publish Listing' : 'Continue'}
              </Button>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex justify-center gap-6 mt-8">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Check className="w-4 h-4 text-green-500" />
              Free to list
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Check className="w-4 h-4 text-green-500" />
              No commission
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Check className="w-4 h-4 text-green-500" />
              Verified guests
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
