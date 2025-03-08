import React, { useState, useEffect } from 'react';
import { Heart, Coins, Users, Home, Calculator, ArrowRight, Moon, HandHeart, Wallet, Globe, Target, Clock, Share2, Utensils, GraduationCap, ChevronDown, X, DollarSign, Percent, Plus, Minus } from 'lucide-react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

function App() {
  const [wealthAmount, setWealthAmount] = useState<string>('');
  const [zakatAmount, setZakatAmount] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImpactIndex, setCurrentImpactIndex] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const emergencyImages = [
    "https://www.hrw.org/sites/default/files/styles/embed_xxl/public/media_2024/11/202411mena_ip_gaza_almawasi_camp_airstrike.jpg",
    "https://static.globalissues.org/ips/2016/11/7608289900_2c8a80a688_z.jpg",
    "https://www.un.org/sites/un2.un.org/files/styles/large-article-image-style-16-9/public/field/image/1594844475.0228.jpg",
    "https://ca-times.brightspotcdn.com/dims4/default/3ad2aab/2147483647/strip/true/crop/2048x1352+0+0/resize/1200x792!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fd9%2F04%2F312a0e48451c21134bfb72f530b3%2Fla-fg-kenya-refugees-20160506-001",
    "https://media.npr.org/assets/img/2013/08/23/syria-refugee-children-006-7206d494450515ae61330b31d332310b9096c44d.jpg"
  ];

  const zakatImpact = [
    {
      icon: (
        <img 
          src="https://support.crs.org/sites/default/files/2024-08/SSU2022078945%20-%20no%20words.jpg"
          alt="Families facing hunger"
          className="w-6 h-6 object-cover rounded-full"
        />
      ),
      text: "Provide nourishing meals to families facing hunger",
      emphasis: "Your generosity feeds hope"
    },
    {
      icon: (
        <img 
          src="https://choose.love/cdn/shop/products/accomodation-for-refugees-context.jpg?v=1733928133&width=1946"
          alt="Safe shelter"
          className="w-6 h-6 object-cover rounded-full"
        />
      ),
      text: "Give safe shelter to displaced families",
      emphasis: "Your kindness creates homes"
    },
    {
      icon: (
        <img 
          src="https://bloomberg.nursing.utoronto.ca/wp-content/uploads/2024/07/iStock-1445197624.jpg"
          alt="Medical treatment"
          className="w-6 h-6 object-cover rounded-full"
        />
      ),
      text: "Fund life-saving medical treatments",
      emphasis: "Your care heals lives"
    },
    {
      icon: (
        <img 
          src="https://umcmission.org/wp-content/uploads/2020/10/IMG-20200716-WA0152.jpg"
          alt="Support orphans"
          className="w-6 h-6 object-cover rounded-full"
        />
      ),
      text: "Support orphans and elderly with dignity",
      emphasis: "Your compassion nurtures souls"
    }
  ];

  const [showCalculator, setShowCalculator] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [exchangeRate, setExchangeRate] = useState(1);
  const [calculatorStep, setCalculatorStep] = useState(1);
  const [zakatInputs, setZakatInputs] = useState({
    cash: '',
    gold: '',
    silver: '',
    stocks: '',
    realEstate: '',
    business: '',
    other: '',
    debts: '',
  });

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling' },
    { code: 'TZS', symbol: 'TSh', name: 'Tanzanian Shilling' },
    { code: 'UGX', symbol: 'USh', name: 'Ugandan Shilling' },
    { code: 'RWF', symbol: 'RF', name: 'Rwandan Franc' },
    { code: 'BIF', symbol: 'FBu', name: 'Burundian Franc' },
    { code: 'ETB', symbol: 'Br', name: 'Ethiopian Birr' },
    { code: 'SOS', symbol: 'Sh', name: 'Somali Shilling' },
    { code: 'DJF', symbol: 'Fdj', name: 'Djiboutian Franc' },
    { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal' },
    { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
    { code: 'QAR', symbol: 'ر.ق', name: 'Qatari Riyal' },
    { code: 'OMR', symbol: 'ر.ع.', name: 'Omani Rial' },
    { code: 'BHD', symbol: '.د.ب', name: 'Bahraini Dinar' },
    { code: 'KWD', symbol: 'د.ك', name: 'Kuwaiti Dinar' },
    { code: 'EGP', symbol: 'ج.م', name: 'Egyptian Pound' },
    { code: 'LYD', symbol: 'ل.د', name: 'Libyan Dinar' },
    { code: 'TND', symbol: 'د.ت', name: 'Tunisian Dinar' },
    { code: 'DZD', symbol: 'د.ج', name: 'Algerian Dinar' },
    { code: 'MAD', symbol: 'د.م.', name: 'Moroccan Dirham' },
    { code: 'MRU', symbol: 'UM', name: 'Mauritanian Ouguiya' },
    { code: 'SDG', symbol: 'ج.س.', name: 'Sudanese Pound' },
    { code: 'SSP', symbol: '£', name: 'South Sudanese Pound' },
    { code: 'NGN', symbol: '₦', name: 'Nigerian Naira' },
    { code: 'GHS', symbol: '₵', name: 'Ghanaian Cedi' },
    { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
    { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
    { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee' },
    { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka' },
    { code: 'LKR', symbol: '₨', name: 'Sri Lankan Rupee' },
    { code: 'NPR', symbol: '₨', name: 'Nepalese Rupee' },
    { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah' },
    { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit' },
    { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
    { code: 'BND', symbol: 'B$', name: 'Brunei Dollar' },
    { code: 'PHP', symbol: '₱', name: 'Philippine Peso' },
    { code: 'THB', symbol: '฿', name: 'Thai Baht' },
    { code: 'VND', symbol: '₫', name: 'Vietnamese Dong' },
    { code: 'KHR', symbol: '៛', name: 'Cambodian Riel' },
    { code: 'MMK', symbol: 'K', name: 'Myanmar Kyat' },
    { code: 'LAK', symbol: '₭', name: 'Lao Kip' },
    { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    { code: 'KRW', symbol: '₩', name: 'South Korean Won' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
    { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
    { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc' },
    { code: 'TRY', symbol: '₺', name: 'Turkish Lira' }
  ];

  const calculateTotal = () => {
    const total = Object.entries(zakatInputs).reduce((sum, [key, value]) => {
      if (key === 'debts') return sum;
      return sum + (parseFloat(value) || 0);
    }, 0);
    const debts = parseFloat(zakatInputs.debts) || 0;
    const netAmount = total - debts;
    return netAmount > 0 ? netAmount * 0.025 : 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setZakatInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetCalculator = () => {
    setZakatInputs({
      cash: '',
      gold: '',
      silver: '',
      stocks: '',
      realEstate: '',
      business: '',
      other: '',
      debts: '',
    });
    setCalculatorStep(1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === emergencyImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImpactIndex((prevIndex) => 
        prevIndex === zakatImpact.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const calculateZakat = () => {
    const amount = parseFloat(wealthAmount);
    if (!isNaN(amount)) {
      setZakatAmount(amount * 0.025);
    }
  };

  const impactStats = [
    {
      icon: <Users className="w-8 h-8 md:w-10 md:h-10" />,
      value: 1000000,
      suffix: "+",
      label: "Lives Impacted"
    },
    {
      icon: <Globe className="w-8 h-8 md:w-10 md:h-10" />,
      value: 40,
      suffix: "+",
      label: "Countries Reached"
    },
    {
      icon: <HandHeart className="w-8 h-8 md:w-10 md:h-10" />,
      value: 95,
      suffix: "%",
      label: "Of Funds Reach Beneficiaries"
    }
  ];

  const monthlyGoal = 1000000;
  const currentProgress = 750000;
  const progressPercentage = (currentProgress / monthlyGoal) * 100;

  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ref3, inView3] = useInView({ triggerOnce: true, threshold: 0.2 });

  const [openFaq, setOpenFaq] = useState(-1);
  const [emergencyModal, setEmergencyModal] = useState(false);
  const [donationModal, setDonationModal] = useState<{ 
    isOpen: boolean; 
    type: 'emergency' | 'education' | 'healthcare' | 'food' | null; 
    amount: string; 
    step: number; 
  }>({
    isOpen: false,
    type: null,
    amount: '',
    step: 1
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white overflow-x-hidden">
      {/* Hero Section with Impact Stats */}
      <header className="relative min-h-[85vh] md:min-h-screen flex flex-col justify-center overflow-hidden bg-emerald-950 overflow-x-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310B981' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2H6zM6 34v-4H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
            animation: 'slide 20s linear infinite'
          }} />
        </div>

        {/* Main Background Image with Gradient Overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/90 via-emerald-900/80 to-emerald-950/90" />
          <img
            src="https://images.unsplash.com/photo-1566438480900-0609be27a4be?auto=format&fit=crop&q=80"
            alt="Muslim prayer"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center py-8 md:py-16 overflow-x-hidden">
          {/* Decorative Islamic Pattern */}
          <div className="mb-4 md:mb-8">
            <svg className="w-16 h-16 md:w-24 md:h-24 mx-auto text-emerald-400 opacity-80" viewBox="0 0 100 100">
              <path fill="currentColor" d="M50 0L61 36H90L66 58L77 94L50 72L23 94L34 58L10 36H39L50 0Z"/>
            </svg>
          </div>

          <h1 className="text-4xl md:text-7xl font-bold text-white mb-4 md:mb-8 leading-tight">
            <span className="block mb-2 md:mb-4">Purify Your Wealth</span>
            <span className="block text-emerald-400">Through Zakat</span>
          </h1>

          <div className="max-w-3xl mx-auto mb-8">
            <p className="text-lg md:text-2xl text-emerald-100 leading-relaxed">
              "Take from their wealth a charity by which you purify them and cause them to increase."
              <span className="block mt-2 text-emerald-400 font-arabic">- Al Tawba:103</span>
            </p>
          </div>

          {/* Action Buttons with Enhanced Design */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 md:mb-12">
            <button
              onClick={() => setShowCalculator(true)}
              className="group inline-flex items-center px-6 py-3 text-base md:text-lg font-semibold text-emerald-900 bg-emerald-400 rounded-full hover:bg-emerald-300 transition-all duration-300 shadow-lg hover:shadow-emerald-400/50 hover:-translate-y-1"
            >
              Give Zakat Now
              <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Impact Stats */}
          <div ref={ref} className="relative overflow-x-hidden">
            <div className="grid grid-cols-3 gap-2 md:gap-4 max-w-3xl mx-auto mb-20 md:mb-24">
              {impactStats.map((stat, index) => (
                <div key={index} className="text-center p-2 md:p-4 rounded-lg md:rounded-xl bg-emerald-800/50 backdrop-blur-lg border border-emerald-700/30 transform hover:scale-102 transition-all duration-300">
                  <div className="flex justify-center mb-1 md:mb-2">
                    <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-emerald-900/50 border border-emerald-600/30">
                      <div className="text-emerald-400 w-4 h-4 md:w-5 md:h-5">{stat.icon}</div>
                    </div>
                  </div>
                  <div className="text-xl md:text-3xl font-bold text-white">
                    {inView && (
                      <CountUp
                        end={stat.value}
                        duration={2}
                        separator=","
                        suffix={stat.suffix}
                        useEasing={true}
                      />
                    )}
                  </div>
                  <div className="text-xs md:text-sm text-emerald-200">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 md:bottom-14 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 md:w-8 md:h-12 rounded-full border-2 border-emerald-400/30 flex items-center justify-center">
              <div className="w-1 h-2 md:h-3 bg-emerald-400 rounded-full animate-scroll" />
            </div>
          </div>
        </div>
      </header>

      {/* Add required CSS animation */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slide {
          from { transform: translateY(0); }
          to { transform: translateY(60px); }
        }
        @keyframes scroll {
          0% { transform: translateY(0); opacity: 0; }
          30% { opacity: 1; }
          60% { opacity: 1; }
          100% { transform: translateY(8px); opacity: 0; }
        }
        .animate-scroll {
          animation: scroll 2s ease-in-out infinite;
        }
      `}} />

      {/* Monthly Goal Progress */}
      <section className="relative py-12 md:py-16 bg-gradient-to-br from-slate-50 via-white to-slate-50 overflow-hidden overflow-x-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(16, 185, 129, 0.1) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative max-w-3xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              Monthly Donation Goal
            </h2>
            <p className="text-base md:text-lg text-slate-600">
              Help us reach our target of <span className="font-semibold text-emerald-600">${monthlyGoal.toLocaleString()}</span>
            </p>
          </div>

          {/* Goal Progress Card */}
          <div className="relative">
            <div className="relative bg-white rounded-xl shadow-md p-6">
              {/* Progress Stats Grid */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {/* Amount Raised */}
                <div className="p-3 rounded-lg bg-emerald-50">
                  <div className="text-sm text-slate-600">Raised</div>
                  <div className="text-lg md:text-xl font-bold text-emerald-600">
                    ${currentProgress.toLocaleString()}
                  </div>
                </div>

                {/* Percentage */}
                <div className="p-3 rounded-lg bg-emerald-50">
                  <div className="text-sm text-slate-600">Progress</div>
                  <div className="text-lg md:text-xl font-bold text-emerald-600">
                    {progressPercentage.toFixed(1)}%
                  </div>
                </div>

                {/* Remaining */}
                <div className="p-3 rounded-lg bg-emerald-50">
                  <div className="text-sm text-slate-600">Remaining</div>
                  <div className="text-lg md:text-xl font-bold text-emerald-600">
                    ${(monthlyGoal - currentProgress).toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative mb-6">
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-1000 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>

              {/* Animated Impact Message */}
              <div className="mb-6 h-24 relative">
                {zakatImpact.map((impact, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-1000 ${
                      index === currentImpactIndex 
                        ? 'opacity-100 transform translate-y-0 scale-100' 
                        : 'opacity-0 transform translate-y-8 scale-95'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-inner transform transition-transform duration-700 hover:scale-110 overflow-hidden">
                        {impact.icon}
                      </div>
                      <p className="text-base text-slate-700">{impact.text}</p>
                    </div>
                    <p className="text-sm font-medium text-emerald-600 animate-pulse">
                      {impact.emphasis}
                    </p>
                  </div>
                ))}
              </div>

              {/* Decorative dots */}
              <div className="flex justify-center space-x-1 mb-6">
                {zakatImpact.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                      index === currentImpactIndex 
                        ? 'bg-emerald-500 scale-125' 
                        : 'bg-emerald-200'
                    }`}
                  />
                ))}
              </div>

              {/* Call to Action */}
              <div className="text-center flex flex-col md:flex-row justify-center items-center gap-4">
                <button
                  onClick={() => {
                    setShowCalculator(true);
                    setCalculatorStep(1);
                    resetCalculator();
                  }}
                  className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 text-base md:text-lg font-semibold text-emerald-900 bg-emerald-400 rounded-full hover:bg-emerald-300 transition-all duration-300 shadow-lg hover:shadow-emerald-400/50 hover:-translate-y-1"
                >
                  <Calculator className="w-5 h-5" />
                  Calculate Zakat
                </button>
                <button
                  onClick={() => {
                    document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 text-base md:text-lg font-semibold text-emerald-900 bg-white border-2 border-emerald-400 rounded-full hover:bg-emerald-50 transition-all duration-300 shadow-lg hover:shadow-emerald-400/50 hover:-translate-y-1"
                >
                  <HandHeart className="w-5 h-5" />
                  Contribute Now
                </button>
              </div>
            </div>

            {/* Subtle decorative elements */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/5 to-emerald-600/5 rounded-xl -z-10" />
          </div>
        </div>
      </section>

      {/* Emergency Relief Section */}
      <section className="py-16 md:py-24 bg-white overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          {/* Image Carousel */}
          <div className="relative overflow-hidden rounded-2xl shadow-2xl aspect-[4/3]">
            {emergencyImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src={image}
                  alt={`Emergency relief ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-900">
              Emergency Relief Where It's Needed Most
            </h2>
            <p className="text-lg text-slate-600">
              Your Zakat provides immediate assistance to families affected by:
            </p>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-slate-700">
                <Home className="w-5 h-5 text-emerald-600" />
                <span>Emergency shelter for displaced families</span>
              </li>
              <li className="flex items-center space-x-3 text-slate-700">
                <Heart className="w-5 h-5 text-emerald-600" />
                <span>Medical care in crisis situations</span>
              </li>
              <li className="flex items-center space-x-3 text-slate-700">
                <Users className="w-5 h-5 text-emerald-600" />
                <span>Support for orphans and elderly</span>
              </li>
            </ul>
            <button 
              onClick={() => setEmergencyModal(true)}
              className="inline-flex items-center px-6 py-3 text-base font-semibold text-white bg-emerald-600 rounded-full hover:bg-emerald-700 transition-colors duration-300"
            >
              Provide Emergency Relief
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Impact Stories Section */}
      <section className="py-20 bg-gradient-to-br from-white via-emerald-50/30 to-white overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-emerald-900 mb-4">
              Your Zakat Changes Lives
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Every contribution makes a lasting impact on those in need. Choose where you want your Zakat to make a difference.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Education Card */}
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="https://carnegieendowment.org/static/media/images/117845606.jpg"
                  alt="Education support for children"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-emerald-900">Education for All</h3>
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Users className="w-6 h-6 text-emerald-600" />
                  </div>
                </div>
                <p className="text-slate-600 mb-6">
                  Your Zakat provides education to children who would otherwise miss this opportunity. Help build a brighter future through knowledge.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center text-sm text-slate-600 space-x-2">
                    <Target className="w-5 h-5 text-emerald-600" />
                    <span>Goal: $50,000</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-600 space-x-2">
                    <Clock className="w-5 h-5 text-emerald-600" />
                    <span>Urgent: 150 children waiting</span>
                  </div>
                  <button 
                    onClick={() => setDonationModal({ isOpen: true, type: 'education', amount: '', step: 1 })}
                    className="w-full py-3 px-6 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors duration-300 flex items-center justify-center"
                  >
                    Support Education
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="absolute top-4 right-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Most Needed
              </div>
            </div>

            {/* Healthcare Card */}
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="https://scopeblog.stanford.edu/wp-content/uploads/2018/09/Getty-Images.jpg"
                  alt="Healthcare access and medical support"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-emerald-900">Healthcare Access</h3>
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-emerald-600" />
                  </div>
                </div>
                <p className="text-slate-600 mb-6">
                  Provide vital medical care to those who cannot afford treatment. Your donation saves lives and brings hope to families.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center text-sm text-slate-600 space-x-2">
                    <Target className="w-5 h-5 text-emerald-600" />
                    <span>Goal: $75,000</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-600 space-x-2">
                    <Clock className="w-5 h-5 text-emerald-600" />
                    <span>Critical: 300 patients waiting</span>
                  </div>
                  <button 
                    onClick={() => setDonationModal({ isOpen: true, type: 'healthcare', amount: '', step: 1 })}
                    className="w-full py-3 px-6 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors duration-300 flex items-center justify-center"
                  >
                    Provide Healthcare
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Urgent
              </div>
            </div>

            {/* Food Security Card */}
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="https://s.rfi.fr/media/display/fa62c610-e195-11ee-9ce0-005056a97e36/w:980/p:16x9/2024-03-13T191847Z_635992099_RC22L6ABMAMP_RTRMADP_3_ISRAEL-PALESTINIANS.JPG"
                  alt="Emergency food relief"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-emerald-900">Food Security</h3>
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Utensils className="w-6 h-6 text-emerald-600" />
                  </div>
                </div>
                <p className="text-slate-600 mb-6">
                  Ensure families have access to nutritious meals every day. Your Zakat helps fight hunger and provides sustenance to those in need.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center text-sm text-slate-600 space-x-2">
                    <Target className="w-5 h-5 text-emerald-600" />
                    <span>Goal: $40,000</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-600 space-x-2">
                    <Clock className="w-5 h-5 text-emerald-600" />
                    <span>Ongoing: 500 families to feed</span>
                  </div>
                  <button 
                    onClick={() => setDonationModal({ isOpen: true, type: 'food', amount: '', step: 1 })}
                    className="w-full py-3 px-6 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors duration-300 flex items-center justify-center"
                  >
                    Feed Families
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="absolute top-4 right-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Essential
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-white to-emerald-50 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-4">
              The Impact of Your Zakat
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Real stories from people whose lives have been transformed through your generous Zakat contributions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div 
              ref={ref1}
              className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-700 overflow-hidden transform hover:-translate-y-2 ${
                inView1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDelay: '0.2s',
                backgroundImage: 'linear-gradient(to bottom right, rgba(255,255,255,0.9), rgba(255,255,255,0.95))',
                backdropFilter: 'blur(8px)'
              }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="https://media.globalcitizen.org/thumbnails/09/26/09263d10-69dc-45f4-921e-60f56eec8cac/education_in_madagascar.jpg__1600x900_q85_crop_subsampling-2.jpg"
                  alt="Education impact in Madagascar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="mb-4 flex items-center">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 text-emerald-600">
                    <GraduationCap className="w-5 h-5" />
                  </span>
                  <h3 className="ml-3 text-xl font-semibold text-slate-900">Education for All</h3>
                </div>
                <blockquote className="text-slate-700 mb-4">
                  "Thanks to your Zakat donations, my children can now attend school and have access to proper education. This has changed our lives forever."
                </blockquote>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                    <img
                      src="https://randomuser.me/api/portraits/women/42.jpg"
                      alt="Testimonial author"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-slate-900">Amina S.</p>
                    <p className="text-sm text-slate-500">Mother of three</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div 
              ref={ref2}
              className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-700 overflow-hidden transform hover:-translate-y-2 ${
                inView2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDelay: '0.4s',
                backgroundImage: 'linear-gradient(to bottom right, rgba(255,255,255,0.9), rgba(255,255,255,0.95))',
                backdropFilter: 'blur(8px)'
              }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="https://hips.hearstapps.com/vidthumb/images/stitch-200622-icu-covid-survivor-10-1592856501.jpg"
                  alt="Healthcare impact - ICU care"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="mb-4 flex items-center">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 text-emerald-600">
                    <Heart className="w-5 h-5" />
                  </span>
                  <h3 className="ml-3 text-xl font-semibold text-slate-900">Life-Saving Care</h3>
                </div>
                <blockquote className="text-slate-700 mb-4">
                  "The medical care provided through Zakat funds saved my father's life. We couldn't afford the treatment on our own."
                </blockquote>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                    <img
                      src="https://randomuser.me/api/portraits/men/32.jpg"
                      alt="Testimonial author"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-slate-900">Hassan M.</p>
                    <p className="text-sm text-slate-500">Grateful son</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div 
              ref={ref3}
              className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-700 overflow-hidden transform hover:-translate-y-2 ${
                inView3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDelay: '0.6s',
                backgroundImage: 'linear-gradient(to bottom right, rgba(255,255,255,0.9), rgba(255,255,255,0.95))',
                backdropFilter: 'blur(8px)'
              }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="https://missionnewswire.org/wp-content/uploads/2016/06/Madagascar_ANS_06-09-2016.jpg"
                  alt="Food security impact in Madagascar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="mb-4 flex items-center">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 text-emerald-600">
                    <Utensils className="w-5 h-5" />
                  </span>
                  <h3 className="ml-3 text-xl font-semibold text-slate-900">Food Security</h3>
                </div>
                <blockquote className="text-slate-700 mb-4">
                  "Your Zakat helps us provide nutritious meals to hundreds of families every month. The impact on our community is immeasurable."
                </blockquote>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                    <img
                      src="https://randomuser.me/api/portraits/women/68.jpg"
                      alt="Testimonial author"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-slate-900">Fatima R.</p>
                    <p className="text-sm text-slate-500">Community Leader</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-100 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-200 rounded-full opacity-20 blur-3xl"></div>

          {/* Add scroll-triggered animations */}
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes fadeInUp {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }

            .testimonial-card {
              opacity: 0;
              animation: fadeInUp 0.6s ease-out forwards;
            }

            .testimonial-card:nth-child(1) { animation-delay: 0.2s; }
            .testimonial-card:nth-child(2) { animation-delay: 0.4s; }
            .testimonial-card:nth-child(3) { animation-delay: 0.6s; }
          `}} />
        </div>
      </section>

      {/* Emergency Relief Modal */}
      {emergencyModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" onClick={() => setEmergencyModal(false)}>
              <div className="absolute inset-0 bg-gray-500 opacity-75 backdrop-blur-sm"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full animate-modal-up">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://georgiapoliticalreview.com/wp-content/uploads/2013/09/o-IRAQ-BABY-facebook.jpg"
                  alt="Emergency Relief"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <button
                  onClick={() => setEmergencyModal(false)}
                  className="absolute top-4 right-4 text-white hover:text-emerald-100 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                <h3 className="absolute bottom-4 left-6 text-2xl font-bold text-white">
                  Emergency Relief Fund
                </h3>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-emerald-50 rounded-lg animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                    <Home className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                    <div className="text-sm text-emerald-900 font-medium">Shelter</div>
                    <div className="text-xs text-emerald-600">500+ families</div>
                  </div>
                  <div className="text-center p-3 bg-emerald-50 rounded-lg animate-fadeIn" style={{ animationDelay: '0.3s' }}>
                    <Heart className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                    <div className="text-sm text-emerald-900 font-medium">Medical Aid</div>
                    <div className="text-xs text-emerald-600">1000+ patients</div>
                  </div>
                  <div className="text-center p-3 bg-emerald-50 rounded-lg animate-fadeIn" style={{ animationDelay: '0.4s' }}>
                    <Users className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                    <div className="text-sm text-emerald-900 font-medium">Support</div>
                    <div className="text-xs text-emerald-600">2000+ people</div>
                  </div>
                </div>

                <p className="text-slate-600 text-center animate-fadeIn" style={{ animationDelay: '0.5s' }}>
                  Choose how you would like to contribute to emergency relief efforts
                </p>

                <div className="grid grid-cols-1 gap-4 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
                  <button
                    onClick={() => {
                      setEmergencyModal(false);
                      setDonationModal({ isOpen: true, type: 'emergency', amount: '', step: 1 });
                    }}
                    className="w-full py-4 px-6 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors duration-300 flex items-center justify-center group"
                  >
                    <HandHeart className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    Make a Direct Donation
                  </button>
                  <button
                    onClick={() => {
                      setEmergencyModal(false);
                      setShowCalculator(true);
                      setCalculatorStep(1);
                      resetCalculator();
                    }}
                    className="w-full py-4 px-6 bg-white border-2 border-emerald-600 text-emerald-600 rounded-xl font-semibold hover:bg-emerald-50 transition-colors duration-300 flex items-center justify-center group"
                  >
                    <Calculator className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    Calculate & Donate Zakat
                  </button>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg animate-fadeIn" style={{ animationDelay: '0.7s' }}>
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Clock className="h-5 w-5 text-red-500" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">Urgent Appeal</h3>
                      <p className="mt-1 text-sm text-red-700">
                        Your immediate support can help save lives. Every minute counts in emergency situations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Zakat Calculator Popup */}
      {showCalculator && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowCalculator(false);
            }
          }}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-[360px] sm:max-w-[420px] md:max-w-[480px] max-h-[90vh] overflow-y-auto animate-slideUp"
            style={{
              boxShadow: '0 25px 50px -12px rgba(16, 185, 129, 0.25)',
            }}
          >
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg sm:text-xl font-bold text-emerald-900 animate-fadeIn">
                  Calculate Your Zakat
                </h2>
                <button 
                  onClick={() => setShowCalculator(false)} 
                  className="text-gray-400 hover:text-emerald-600 hover:rotate-90 transition-all duration-300"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              {/* Currency Selection */}
              <div className="mb-4 animate-fadeIn">
                <label className="block text-sm font-medium text-gray-700 mb-3">Select Currency</label>
                <div className="relative">
                  <select
                    value={selectedCurrency}
                    onChange={(e) => setSelectedCurrency(e.target.value)}
                    className="block w-full px-4 py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 appearance-none bg-white text-emerald-900 text-sm pr-8"
                  >
                    {currencies.map((currency) => (
                      <option key={currency.code} value={currency.code}>
                        {currency.symbol} {currency.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative mb-8">
                <div className="h-2 bg-emerald-100 rounded-full">
                  <div 
                    className="h-2 bg-emerald-500 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${(calculatorStep / 3) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  {[1, 2, 3].map((step) => (
                    <div 
                      key={step}
                      className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-all duration-300 ${
                        calculatorStep >= step 
                          ? 'bg-emerald-500 text-white' 
                          : 'bg-emerald-100 text-emerald-600'
                      }`}
                    >
                      {step}
                    </div>
                  ))}
                </div>
              </div>

              {/* Calculator Steps */}
              <div className="space-y-6">
                {/* Step 1: Assets */}
                <div className={`transition-all duration-300 transform ${calculatorStep === 1 ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 absolute'}`}>
                  <div className="space-y-6">
                    <h3 className="text-base sm:text-lg font-medium text-emerald-800 animate-fadeIn">
                      Enter Your Assets
                    </h3>
                    
                    {[
                      { key: 'cash', label: 'Cash & Bank Balances', icon: <Wallet className="w-5 h-5" /> },
                      { key: 'gold', label: 'Gold Value', icon: <Coins className="w-5 h-5" /> },
                      { key: 'silver', label: 'Silver Value', icon: <Coins className="w-5 h-5" /> },
                      { key: 'stocks', label: 'Stocks & Investments', icon: <Target className="w-5 h-5" /> },
                      { key: 'business', label: 'Business Assets', icon: <DollarSign className="w-5 h-5" /> },
                      { key: 'other', label: 'Other Assets', icon: <Plus className="w-5 h-5" /> }
                    ].map((field, index) => (
                      <div 
                        key={field.key} 
                        className="animate-fadeIn"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none text-emerald-500">
                            {field.icon}
                          </div>
                          <input
                            type="number"
                            value={zakatInputs[field.key]}
                            onChange={(e) => handleInputChange(field.key, e.target.value)}
                            placeholder={field.label}
                            className="block w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                          />
                        </div>
                      </div>
                    ))}
                  
                    <button
                      onClick={() => setCalculatorStep(2)}
                      className="w-full bg-emerald-500 text-white py-4 px-6 rounded-xl hover:bg-emerald-600 transition-all duration-300 flex items-center justify-center gap-3 mt-8"
                    >
                      Next Step <ArrowRight className="ml-2 w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Step 2: Deductions */}
                <div className={`space-y-6 transition-all duration-500 ${calculatorStep === 2 ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 absolute'}`}>
                  <div>
                    <h3 className="text-base sm:text-lg font-medium text-emerald-800 animate-fadeIn">
                      Enter Your Deductions
                    </h3>
                    
                    <div className="relative animate-fadeIn">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none text-emerald-500">
                        <Minus className="w-5 h-5" />
                      </div>
                      <input
                        type="number"
                        value={zakatInputs.debts}
                        onChange={(e) => handleInputChange('debts', e.target.value)}
                        placeholder="Outstanding Debts & Liabilities"
                        className="block w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                      />
                    </div>

                    <div className="flex gap-4 mt-8">
                      <button
                        onClick={() => setCalculatorStep(1)}
                        className="flex-1 bg-emerald-50 text-emerald-700 py-4 px-6 rounded-xl hover:bg-emerald-100 transition-colors duration-300"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => {
                          const total = calculateTotal();
                          setZakatAmount(total);
                          setCalculatorStep(3);
                        }}
                        className="flex-1 bg-emerald-500 text-white py-4 px-6 rounded-xl hover:bg-emerald-600 transition-colors duration-300"
                      >
                        Calculate
                      </button>
                    </div>
                  </div>
                </div>

                {/* Step 3: Results */}
                <div className={`space-y-6 md:space-y-8 transition-all duration-500 ${calculatorStep === 3 ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 absolute'}`}>
                  <h3 className="text-lg md:text-2xl font-semibold text-emerald-900 mb-6">Your Zakat Calculation</h3>
                  
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-6 md:p-8 rounded-2xl animate-fadeIn">
                    <div className="text-center">
                      <p className="text-sm md:text-base font-medium text-emerald-600 mb-3">Your Annual Zakat Amount</p>
                      <p className="text-4xl md:text-6xl font-bold text-emerald-900 mb-2 animate-slideUp">
                        {currencies.find(c => c.code === selectedCurrency)?.symbol}
                        <CountUp 
                          end={zakatAmount || 0} 
                          decimals={2} 
                          duration={1.5}
                          separator=","
                        />
                      </p>
                      <p className="text-emerald-600 text-sm md:text-base">2.5% of your eligible wealth</p>
                    </div>
                  </div>

                  {/* Impact Section */}
                  <div className="space-y-6 animate-fadeIn bg-emerald-50/50 p-6 rounded-2xl" style={{ animationDelay: '0.3s' }}>
                    <h4 className="text-lg md:text-xl font-medium text-emerald-800 text-center">This amount can help provide:</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { 
                          icon: <Heart className="w-8 h-8" />, 
                          text: "Medical care for", 
                          suffix: "people",
                          number: Math.max(1, Math.floor((zakatAmount || 0) / 150)),
                          color: "text-rose-600"
                        },
                        { 
                          icon: <GraduationCap className="w-8 h-8" />, 
                          text: "Education for", 
                          suffix: "children",
                          number: Math.max(1, Math.floor((zakatAmount || 0) / 200)),
                          color: "text-emerald-600"
                        }
                      ].map((impact, index) => (
                        <div 
                          key={index}
                          className="bg-white rounded-xl p-4 flex flex-col items-center text-center animate-scaleIn hover:shadow-md transition-all duration-300"
                          style={{ animationDelay: `${index * 150}ms` }}
                        >
                          <div className={`${impact.color} animate-bounce`} style={{ animationDelay: `${index * 200}ms` }}>
                            {impact.icon}
                          </div>
                          <div className="mt-3 space-y-1">
                            <p className="text-gray-600 text-sm">{impact.text}</p>
                            <div className="flex items-center justify-center gap-2 text-xl font-semibold text-gray-800">
                              <CountUp 
                                end={impact.number} 
                                duration={2}
                                separator=","
                              />
                              <span>{impact.suffix}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="text-center text-sm text-gray-500 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
                      *Estimated impact based on average costs
                    </div>
                  </div>

                  <div className="space-y-4 animate-fadeIn" style={{ animationDelay: '0.8s' }}>
                    <button
                      onClick={() => {
                        setShowCalculator(false);
                        document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full bg-emerald-500 text-white py-4 px-6 rounded-xl hover:bg-emerald-600 transition-colors duration-300 flex items-center justify-center gap-2 text-base md:text-lg"
                    >
                      <HandHeart className="w-5 h-5 md:w-6 md:h-6" /> Contribute Now
                    </button>
                    <button
                      onClick={resetCalculator}
                      className="w-full bg-emerald-50 text-emerald-700 py-4 px-6 rounded-xl hover:bg-emerald-100 transition-colors duration-300 flex items-center justify-center gap-2 text-base md:text-lg"
                    >
                      <Calculator className="w-5 h-5 md:w-6 md:h-6" /> Calculate Again
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
      {/* Enhanced Donation Modal */}
      {donationModal.isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 transition-opacity" 
              aria-hidden="true"
              onClick={() => setDonationModal(prev => ({ ...prev, isOpen: false }))}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75 backdrop-blur-sm"></div>
            </div>

            {/* Modal Panel */}
            <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full animate-modal-up">
              {/* Header */}
              <div className="relative h-32 bg-gradient-to-r from-emerald-600 to-emerald-400 p-6">
                <button
                  onClick={() => setDonationModal(prev => ({ ...prev, isOpen: false }))}
                  className="absolute right-4 top-4 text-white hover:text-emerald-100 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                <div className="absolute -bottom-8 left-6 w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center">
                  {donationModal.type === 'education' && <GraduationCap className="w-8 h-8 text-emerald-600" />}
                  {donationModal.type === 'healthcare' && <Heart className="w-8 h-8 text-emerald-600" />}
                  {donationModal.type === 'food' && <Utensils className="w-8 h-8 text-emerald-600" />}
                </div>
              </div>

              <div className="px-6 pt-12 pb-6">
                <h3 className="text-2xl font-bold text-emerald-900 mb-2">
                  {donationModal.type === 'education' && 'Support Education'}
                  {donationModal.type === 'healthcare' && 'Provide Healthcare'}
                  {donationModal.type === 'food' && 'Feed Families'}
                </h3>
                <p className="text-slate-600 mb-6">
                  {donationModal.type === 'education' && 'Help provide quality education to children in need'}
                  {donationModal.type === 'healthcare' && 'Support essential medical care for those who need it most'}
                  {donationModal.type === 'food' && 'Ensure families have access to nutritious meals'}
                </p>

                {/* Progress Steps */}
                <div className="flex items-center justify-between mb-8">
                  {[1, 2].map((step) => (
                    <div key={step} className="flex items-center">
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
                        ${donationModal.step === step 
                          ? 'bg-emerald-600 text-white' 
                          : donationModal.step > step 
                            ? 'bg-emerald-100 text-emerald-600' 
                            : 'bg-gray-100 text-gray-400'}
                        transition-all duration-300
                      `}>
                        {step === 1 ? <DollarSign className="w-4 h-4" /> : <Heart className="w-4 h-4" />}
                      </div>
                      {step === 1 && (
                        <div className="h-1 w-24 mx-2
                          ${donationModal.step > 1 ? 'bg-emerald-600' : 'bg-gray-200'}
                          transition-all duration-300
                        " />
                      )}
                    </div>
                  ))}
                </div>

                {/* Step 1: Amount Input */}
                <div className={`transition-all duration-300 transform ${donationModal.step === 1 ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 absolute'}`}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Enter Your Donation Amount
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                          type="number"
                          value={donationModal.amount}
                          onChange={(e) => setDonationModal(prev => ({ ...prev, amount: e.target.value }))}
                          className="focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md py-3"
                          placeholder="0.00"
                        />
                      </div>
                    </div>

                    {/* Quick Amount Buttons */}
                    <div className="grid grid-cols-4 gap-2">
                      {[50, 100, 200, 500].map((amount) => (
                        <button
                          key={amount}
                          onClick={() => setDonationModal(prev => ({ ...prev, amount: amount.toString() }))}
                          className={`
                            py-2 px-4 rounded-md text-sm font-medium transition-all duration-300
                            ${Number(donationModal.amount) === amount 
                              ? 'bg-emerald-600 text-white' 
                              : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}
                          `}
                        >
                          ${amount}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => donationModal.amount && setDonationModal(prev => ({ ...prev, step: 2 }))}
                    disabled={!donationModal.amount}
                    className={`
                      mt-6 w-full py-3 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2
                      ${donationModal.amount 
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
                      transition-all duration-300
                    `}
                  >
                    <span>Continue</span>
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>

                {/* Step 2: Impact Preview */}
                <div className={`transition-all duration-300 transform ${donationModal.step === 2 ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 absolute'}`}>
                  {donationModal.amount && Number(donationModal.amount) > 0 && (
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-emerald-900 mb-2">
                          ${Number(donationModal.amount).toLocaleString()}
                        </div>
                        <p className="text-slate-600">Your generous donation will make a real difference</p>
                      </div>

                      <div className="bg-emerald-50 p-6 rounded-xl space-y-4 animate-scaleIn">
                        <h4 className="text-lg md:text-xl font-medium text-emerald-800 text-center">Your Impact</h4>
                        <div className="space-y-4">
                          {donationModal.type === 'education' && (
                            <>
                              <p className="text-emerald-800 animate-slideInLeft">Your donation will help provide:</p>
                              <ul className="space-y-3">
                                <li className="flex items-center text-slate-700">
                                  <GraduationCap className="w-5 h-5 text-emerald-600 mr-2" />
                                  <span>Educational materials for {Math.floor(Number(donationModal.amount) / 50)} students</span>
                                </li>
                                <li className="flex items-center text-slate-700">
                                  <Users className="w-5 h-5 text-emerald-600 mr-2" />
                                  <span>Teacher training and support</span>
                                </li>
                              </ul>
                            </>
                          )}
                          {donationModal.type === 'healthcare' && (
                            <>
                              <p className="text-emerald-800 animate-slideInLeft">Your donation will help provide:</p>
                              <ul className="space-y-3">
                                <li className="flex items-center text-slate-700">
                                  <Heart className="w-5 h-5 text-emerald-600 mr-2" />
                                  <span>Medical care for {Math.floor(Number(donationModal.amount) / 100)} patients</span>
                                </li>
                                <li className="flex items-center text-slate-700">
                                  <Users className="w-5 h-5 text-emerald-600 mr-2" />
                                  <span>Essential medical supplies</span>
                                </li>
                              </ul>
                            </>
                          )}
                          {donationModal.type === 'food' && (
                            <>
                              <p className="text-emerald-800 animate-slideInLeft">Your donation will help provide:</p>
                              <ul className="space-y-3">
                                <li className="flex items-center text-slate-700">
                                  <Utensils className="w-5 h-5 text-emerald-600 mr-2" />
                                  <span>Meals for {Math.floor(Number(donationModal.amount) / 25)} families</span>
                                </li>
                                <li className="flex items-center text-slate-700">
                                  <Users className="w-5 h-5 text-emerald-600 mr-2" />
                                  <span>Nutritional support programs</span>
                                </li>
                              </ul>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="text-center text-sm text-gray-500 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
                        *Estimated impact based on average costs
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-4 mt-6 animate-fadeIn">
                    <button
                      onClick={() => setDonationModal(prev => ({ ...prev, step: 1 }))}
                      className="flex-1 py-3 px-6 bg-white border-2 border-emerald-600 text-emerald-600 rounded-xl font-semibold hover:bg-emerald-50 transition-colors duration-300"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => {
                        // Handle donation submission here
                        setDonationModal({ isOpen: false, type: null, amount: '', step: 1 });
                      }}
                      className="flex-1 py-3 px-6 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors duration-300"
                    >
                      <HandHeart className="w-5 h-5 mr-2" />
                      Donate Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add required CSS animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes modalUp {
          from { transform: translate(0, 100px); opacity: 0; }
          to { transform: translate(0, 0); opacity: 1; }
        }
        .animate-modal-up {
          animation: modalUp 0.3s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes slideInRight {
          from { transform: translateX(20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .animate-scaleIn {
          animation: scaleIn 0.5s ease-out forwards;
        }
        .animate-slideInRight {
          animation: slideInRight 0.5s ease-out forwards;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.5s ease-out forwards;
        }
      `}} />

      {/* Calculator Section */}
      <section id="calculator" className="py-20 bg-emerald-50 overflow-x-hidden">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-3xl font-bold text-emerald-900 mb-8 text-center">
              Calculate Your Zakat
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-emerald-800 mb-2">Enter your total wealth (savings)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                  <input
                    type="number"
                    value={wealthAmount}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      setWealthAmount(value || 0);
                    }}
                    placeholder="Enter amount"
                    className="pl-10 p-3 md:p-4 border-2 border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all duration-300 hover:border-emerald-300 text-sm md:text-base w-full rounded-lg"
                  />
                </div>
              </div>
              <button
                onClick={calculateZakat}
                className="w-full py-4 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors duration-300"
              >
                Calculate Zakat
              </button>
              {zakatAmount !== null && (
                <div className="mt-6 p-6 bg-emerald-50 rounded-lg text-center">
                  <p className="text-2xl text-emerald-900 mb-4">
                    Your Zakat Amount: <span className="font-bold">${zakatAmount.toFixed(2)}</span>
                  </p>
                  <div className="space-y-6 animate-fadeIn bg-emerald-50/50 p-6 rounded-2xl" style={{ animationDelay: '0.3s' }}>
                    <h4 className="text-lg md:text-xl font-medium text-emerald-800 text-center">This amount can help provide:</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { 
                          icon: <Heart className="w-8 h-8" />, 
                          text: "Medical care for", 
                          suffix: "people",
                          number: Math.max(1, Math.floor((zakatAmount || 0) / 150)),
                          color: "text-rose-600"
                        },
                        { 
                          icon: <GraduationCap className="w-8 h-8" />, 
                          text: "Education for", 
                          suffix: "children",
                          number: Math.max(1, Math.floor((zakatAmount || 0) / 200)),
                          color: "text-emerald-600"
                        }
                      ].map((impact, index) => (
                        <div 
                          key={index}
                          className="bg-white rounded-xl p-4 flex flex-col items-center text-center animate-scaleIn hover:shadow-md transition-all duration-300"
                          style={{ animationDelay: `${index * 150}ms` }}
                        >
                          <div className={`${impact.color} animate-bounce`} style={{ animationDelay: `${index * 200}ms` }}>
                            {impact.icon}
                          </div>
                          <div className="mt-3 space-y-1">
                            <p className="text-gray-600 text-sm">{impact.text}</p>
                            <div className="flex items-center justify-center gap-2 text-xl font-semibold text-gray-800">
                              <CountUp 
                                end={impact.number} 
                                duration={2}
                                separator=","
                              />
                              <span>{impact.suffix}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="text-center text-sm text-gray-500 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
                      *Estimated impact based on average costs
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-4">
              Frequently Asked Questions About Zakat
            </h2>
            <p className="text-lg text-slate-600">
              Find answers to common questions about Zakat calculation and distribution
            </p>
          </div>
          <div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
            itemScope 
            itemType="https://schema.org/FAQPage"
          >
            {[
              {
                question: "What is Zakat and why is it important?",
                answer: "Zakat is one of the five pillars of Islam, representing a mandatory charitable contribution that purifies wealth and helps those in need. It's calculated at 2.5% of eligible wealth and plays a crucial role in reducing poverty and promoting social justice.",
                keywords: "zakat meaning, zakat importance, islamic charity",
                icon: <Heart className="w-6 h-6" />
              },
              {
                question: "How is Zakat calculated?",
                answer: "Zakat is calculated as 2.5% of your eligible wealth (including savings, gold, silver, and business assets) that exceeds the Nisab threshold. Our Zakat calculator can help you determine the exact amount based on your assets.",
                keywords: "zakat calculation, how to calculate zakat, zakat calculator",
                icon: <Calculator className="w-6 h-6" />
              },
              {
                question: "Who is eligible to receive Zakat?",
                answer: "Zakat can be given to eight categories of recipients as mentioned in the Quran, including the poor, needy, those in debt, travelers in need, and for the cause of Allah. We ensure your Zakat reaches verified eligible recipients.",
                keywords: "zakat recipients, who can receive zakat, zakat eligibility",
                icon: <Users className="w-6 h-6" />
              },
              {
                question: "When should I pay my Zakat?",
                answer: "Zakat becomes obligatory once your wealth reaches the Nisab threshold and has been in your possession for one lunar year (Hawl). Many choose to pay during Ramadan for added spiritual rewards, but it can be paid at any time.",
                keywords: "when to pay zakat, zakat timing, zakat in ramadan",
                icon: <Clock className="w-6 h-6" />
              },
              {
                question: "How does your organization distribute Zakat?",
                answer: "We distribute Zakat through verified channels to ensure it reaches eligible recipients. Our focus areas include education, healthcare, and food security. We maintain complete transparency and provide regular impact reports.",
                keywords: "zakat distribution, zakat transparency, zakat impact",
                icon: <Share2 className="w-6 h-6" />
              }
            ].map((faq, index) => (
              <div 
                key={index}
                className={`group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 ${
                  openFaq === index ? 'ring-2 ring-emerald-500 shadow-lg' : ''
                }`}
                style={{
                  backgroundImage: 'linear-gradient(to bottom right, rgba(255,255,255,0.9), rgba(255,255,255,0.95))',
                  backdropFilter: 'blur(8px)'
                }}
                itemScope 
                itemProp="mainEntity" 
                itemType="https://schema.org/Question"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  className="w-full px-6 py-5 text-left flex items-start gap-4"
                >
                  <span className={`p-2 rounded-full bg-emerald-50 text-emerald-600 transition-colors duration-300 ${
                    openFaq === index ? 'bg-emerald-100' : 'group-hover:bg-emerald-100'
                  }`}>
                    {faq.icon}
                  </span>
                  <div className="flex-1">
                    <h3 
                      className="text-lg font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors duration-300"
                      itemProp="name"
                    >
                      {faq.question}
                    </h3>
                    <div 
                      className={`overflow-hidden transition-all duration-500 ${
                        openFaq === index ? 'max-h-96 opacity-100 mt-4' : 'opacity-0 max-h-0'
                      }`}
                      itemScope 
                      itemProp="acceptedAnswer" 
                      itemType="https://schema.org/Answer"
                    >
                      <p 
                        className="text-slate-600"
                        itemProp="text"
                      >
                        {faq.answer}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {faq.keywords.split(', ').map((keyword, i) => (
                          <span 
                            key={i}
                            className="text-xs bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full hover:bg-emerald-100 transition-colors duration-300"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className={`transform transition-transform duration-300 text-emerald-600 ${openFaq === index ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-5 h-5" />
                  </span>
                </button>
              </div>
            ))}
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-100 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-emerald-200 rounded-full opacity-20 blur-3xl"></div>

          {/* Add scroll-triggered animations */}
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes fadeInUp {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }

            .testimonial-card {
              opacity: 0;
              animation: fadeInUp 0.6s ease-out forwards;
            }

            .testimonial-card:nth-child(1) { animation-delay: 0.2s; }
            .testimonial-card:nth-child(2) { animation-delay: 0.4s; }
            .testimonial-card:nth-child(3) { animation-delay: 0.6s; }
          `}} />
        </div>
      </section>

      {/* CTA Section */}
      <section id="donate" className="py-20 bg-gradient-to-b from-emerald-100 to-white overflow-x-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-emerald-900 mb-6">
            Make Your Zakat Count Today
          </h2>
          <p className="text-xl text-emerald-700 mb-12">
            Your contribution helps provide food, shelter, and support to those in need across 40+ countries.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() => setShowCalculator(true)}
              className="flex items-center justify-center px-8 py-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors duration-300"
            >
              <Wallet className="mr-2" />
              Pay Zakat Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-900 text-white py-12 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">About Zakat</h3>
              <p className="text-emerald-200">
                Zakat is one of the five pillars of Islam, purifying wealth and helping those in need.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <p className="text-emerald-200">
                Have questions about Zakat? Our team is here to help.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-emerald-200">
                <li><a href="#calculate" className="hover:text-white transition-colors">Calculate Zakat</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Donation Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;