export type ProductCategory = 'hood' | 'hob' | 'sink' | 'oven' | 'microwave'

export interface Product {
  id: string
  model: string
  name: string
  category: ProductCategory
  categoryLabel: string
  subcategory: string
  description: string
  image: string
  specs: Record<string, string>
  features: string[]
  colors?: string[]
  warranty?: string
  isHero?: boolean
  isFeatured?: boolean
}

export const categories = [
  { id: 'hood', label: 'هود آشپزخانه', icon: 'wind', count: 30, description: 'هودهای شومینه‌ای و مخفی با قدرت مکش 850 متر مکعب' },
  { id: 'hob', label: 'اجاق گاز', icon: 'flame', count: 40, description: 'صفحه گاز شیشه‌ای و استیل با ۵ تا ۶ شعله' },
  { id: 'sink', label: 'سینک آشپزخانه', icon: 'droplets', count: 20, description: 'سینک دست‌ساز، فانتزی و گرانیتی با ضمانت ۲ سال' },
  { id: 'oven', label: 'فر توکار', icon: 'square', count: 5, description: 'فر برقی ۶۰ سانتی با تا ۱۸ برنامه پخت' },
  { id: 'microwave', label: 'ماکروویو', icon: 'zap', count: 2, description: 'ماکروویو + فر با کانوکشن و گریل قدرتمند' },
]

export const products: Product[] = [
  // === HOODS - CHIMNEY ===
  {
    id: 'H225',
    model: 'H 225',
    name: 'هود شومینه‌ای H 225',
    category: 'hood',
    categoryLabel: 'هود شومینه‌ای',
    subcategory: 'chimney',
    description: 'هود شومینه‌ای پریمیوم با بدنه شیشه مشکی و تاج مشبک. جک گازی، ریموت کنترل و سنسور هوشمند دود و دما.',
    image: '/images/products/H225.png',
    specs: {
      'سایز': '۹۰ سانتی‌متر',
      'قدرت مکش': '۸۵۰ متر مکعب در ساعت',
      'موتور': 'توربو فلزی ۲ سر شفت (دو پروانه) ۴ دور',
      'فیلتر': 'آلومینیومی مگنتی سه لایه',
      'صدا': '۵۵ دسیبل',
      'لامپ': '۲ SMD',
      'روغن‌گیر': 'دارد',
      'سنسور': 'دود و دما',
    },
    features: [
      'بدنه شیشه مشکی',
      'تاج مشکی مشبک',
      'صفحه کلید لمسی',
      'جک گازی',
      'ریموت کنترل',
      'سنسور دود و دما',
      'ترموگارد',
    ],
    isHero: true,
    isFeatured: true,
  },
  {
    id: 'H205',
    model: 'H 205',
    name: 'هود شومینه‌ای H 205',
    category: 'hood',
    categoryLabel: 'هود شومینه‌ای',
    subcategory: 'chimney',
    description: 'هود شومینه‌ای با بدنه شیشه مشکی و استیل. ریموت کنترل و ترموگارد.',
    image: '/images/products/H225.png',
    specs: {
      'سایز': '۹۰ سانتی‌متر',
      'قدرت مکش': '۸۵۰ متر مکعب در ساعت',
      'موتور': 'توربو فلزی ۲ سر شفت ۴ دور',
      'فیلتر': 'آلومینیومی مگنتی سه لایه',
      'صدا': '۵۵ دسیبل',
      'لامپ': '۲ SMD',
    },
    features: ['بدنه شیشه مشکی و استیل', 'تاج مشکی مشبک', 'صفحه کلید لمسی', 'ریموت کنترل', 'ترموگارد'],
    isFeatured: true,
  },
  {
    id: 'H203',
    model: 'H 203',
    name: 'هود شومینه‌ای H 203',
    category: 'hood',
    categoryLabel: 'هود شومینه‌ای',
    subcategory: 'chimney',
    description: 'هود شومینه‌ای با بدنه شیشه مشکی و استیل و سنسور دود و دما.',
    image: '/images/products/H225.png',
    specs: {
      'سایز': '۹۰ سانتی‌متر',
      'قدرت مکش': '۸۵۰ متر مکعب در ساعت',
      'موتور': 'توربو فلزی ۲ سر شفت ۴ دور',
      'فیلتر': 'آلومینیومی مگنتی سه لایه',
      'صدا': '۵۵ دسیبل',
    },
    features: ['بدنه شیشه مشکی و استیل', 'تاج مشکی مشبک', 'صفحه کلید لمسی', 'ریموت کنترل', 'سنسور دود و دما', 'ترموگارد'],
  },
  {
    id: 'H200',
    model: 'H 200',
    name: 'هود شومینه‌ای H 200 سفید',
    category: 'hood',
    categoryLabel: 'هود شومینه‌ای',
    subcategory: 'chimney',
    description: 'هود شومینه‌ای با بدنه شیشه سفید و تاج سفید مشبک.',
    image: '/images/products/H225.png',
    specs: {
      'سایز': '۹۰ سانتی‌متر',
      'قدرت مکش': '۸۵۰ متر مکعب در ساعت',
      'موتور': 'توربو فلزی ۲ سر شفت ۴ دور',
      'فیلتر': 'آلومینیومی مگنتی سه لایه',
      'صدا': '۵۵ دسیبل',
    },
    features: ['بدنه شیشه سفید', 'تاج سفید مشبک', 'صفحه کلید لمسی', 'ریموت کنترل', 'ترموگارد'],
    colors: ['سفید'],
  },
  {
    id: 'H219',
    model: 'H 219',
    name: 'هود شومینه‌ای H 219',
    category: 'hood',
    categoryLabel: 'هود شومینه‌ای',
    subcategory: 'chimney',
    description: 'هود شومینه‌ای پریمیوم با جک گازی و سنسور هوشمند.',
    image: '/images/products/H225.png',
    specs: {
      'سایز': '۹۰ سانتی‌متر',
      'قدرت مکش': '۸۵۰ متر مکعب در ساعت',
      'موتور': 'توربو فلزی ۲ سر شفت ۴ دور',
      'فیلتر': 'آلومینیومی مگنتی سه لایه',
      'صدا': '۵۵ دسیبل',
    },
    features: ['بدنه شیشه مشکی', 'تاج مشکی مشبک', 'صفحه کلید لمسی', 'جک گازی', 'ریموت کنترل', 'سنسور دود و دما', 'ترموگارد'],
  },
  {
    id: 'H220',
    model: 'H 220',
    name: 'هود شومینه‌ای H 220',
    category: 'hood',
    categoryLabel: 'هود شومینه‌ای',
    subcategory: 'chimney',
    description: 'هود شومینه‌ای با جک گازی و ریموت کنترل.',
    image: '/images/products/H225.png',
    specs: {
      'سایز': '۹۰ سانتی‌متر',
      'قدرت مکش': '۸۵۰ متر مکعب در ساعت',
      'موتور': 'توربو فلزی ۲ سر شفت ۴ دور',
      'فیلتر': 'آلومینیومی مگنتی سه لایه',
      'صدا': '۵۵ دسیبل',
    },
    features: ['بدنه شیشه مشکی', 'تاج مشکی مشبک', 'جک گازی', 'ریموت کنترل', 'سنسور دود و دما'],
  },
  {
    id: 'H204',
    model: 'H 204',
    name: 'هود شومینه‌ای H 204 آبی',
    category: 'hood',
    categoryLabel: 'هود شومینه‌ای',
    subcategory: 'chimney',
    description: 'هود شومینه‌ای رنگی با بدنه شیشه آبی.',
    image: '/images/products/H225.png',
    specs: {
      'سایز': '۹۰ سانتی‌متر',
      'قدرت مکش': '۸۵۰ متر مکعب در ساعت',
      'موتور': 'توربو فلزی ۲ سر شفت ۴ دور',
      'فیلتر': 'آلومینیومی مگنتی سه لایه',
      'صدا': '۵۵ دسیبل',
    },
    features: ['بدنه شیشه آبی', 'تاج مشکی مشبک', 'صفحه کلید لمسی', 'جک گازی', 'ریموت کنترل'],
    colors: ['آبی'],
  },
  {
    id: 'H201',
    model: 'H 201',
    name: 'هود شومینه‌ای H 201 قرمز',
    category: 'hood',
    categoryLabel: 'هود شومینه‌ای',
    subcategory: 'chimney',
    description: 'هود شومینه‌ای رنگی جسورانه با بدنه شیشه قرمز.',
    image: '/images/products/H225.png',
    specs: {
      'سایز': '۹۰ سانتی‌متر',
      'قدرت مکش': '۸۵۰ متر مکعب در ساعت',
      'موتور': 'توربو فلزی ۲ سر شفت ۴ دور',
      'فیلتر': 'آلو��ینیومی مگنتی سه لایه',
      'صدا': '۵۵ دسیبل',
    },
    features: ['بدنه شیشه قرمز', 'تاج مشکی مشبک', 'صفحه کلید لمسی', 'جک گازی', 'ریموت کنترل'],
    colors: ['قرمز'],
  },
  {
    id: 'H233S',
    model: 'H 233S',
    name: 'هود Touchless H 233S',
    category: 'hood',
    categoryLabel: 'هود شومینه‌ای',
    subcategory: 'touchless',
    description: 'هود هوشمند با قابلیت کنترل با حرکت دست. تکنولوژی لمس‌نشده پیشرفته.',
    image: '/images/products/H233S.png',
    specs: {
      'سایز': '۹۰ سانتی‌متر',
      'قدرت مکش': '۸۵۰ متر مکعب در ساعت',
      'موتور': 'توربو فلزی ۲ سر شفت ۴ دور',
      'فیلتر': 'آلومینیومی مگنتی سه لایه',
      'صدا': '۵۵ دسیبل',
    },
    features: ['کنترل با حرکت دست', 'بدنه شیشه مشکی', 'تاج مشکی مشبک', 'جک گازی', 'ریموت کنترل', 'سنسور دود و دما', 'ترموگارد'],
    isFeatured: true,
  },
  {
    id: 'H232',
    model: 'H 232',
    name: 'هود طلایی H 232',
    category: 'hood',
    categoryLabel: 'هود شومینه‌ای',
    subcategory: 'chimney',
    description: 'هود پریمیوم با بدنه شیشه مشکی و طلایی لاکچری.',
    image: '/images/products/H232.png',
    specs: {
      'سایز': '۹۰ سانتی‌متر',
      'قدرت مکش': '۸۵۰ متر مکعب در ساعت',
      'موتور': 'توربو فلزی ۲ سر شفت ۴ دور',
      'فیلتر': 'آلومینیومی مگنتی سه لایه',
      'صدا': '۵۵ دسیبل',
    },
    features: ['بدنه شیشه مشکی و طلایی', 'تاج مشکی مشبک', 'صفحه کلید لمسی', 'ریموت کنترل', 'سنسور دود و دما'],
    colors: ['مشکی-طلایی'],
    isFeatured: true,
  },

  // === HOODS - HIDDEN ===
  {
    id: 'H215',
    model: 'H 215',
    name: 'هود مخفی H 215',
    category: 'hood',
    categoryLabel: 'هود مخفی',
    subcategory: 'hidden',
    description: 'هود مخفی ۷۰ سانتی با ریموت کنترل و موتور فلزی ۴ دور.',
    image: '/images/products/H215.png',
    specs: {
      'سایز': '۷۰ سانتی‌متر',
      'قدرت مکش': '۸۵۰ متر مکعب در ساعت',
      'موتور': 'فلزی ۴ دور با ترموگارد',
      'فیلتر': 'آلومینیومی مگنتی سه لایه',
      'صدا': '۵۵ دسیبل',
      'لامپ': '۲ SMD',
    },
    features: ['هود مخفی', 'ریموت کنترل', 'موتور فلزی ۴ دور', 'ترموگارد', 'فیلتر آلومینیومی مگنتی'],
    isFeatured: true,
  },
  {
    id: 'H234',
    model: 'H 234',
    name: 'هود مخفی H 234',
    category: 'hood',
    categoryLabel: 'هود مخفی',
    subcategory: 'hidden',
    description: 'هود مخفی ۷۰ سانتی با درب آینه‌ای دودی.',
    image: '/images/products/H215.png',
    specs: {
      'سایز': '۷۰ سانتی‌متر',
      'قدرت مکش': '۸۵۰ متر مکعب در ساعت',
      'موتور': 'فلزی ۴ دور با ترموگارد',
      'فیلتر': 'آلومینیومی مگنتی سه لایه',
      'صدا': '۵۵ دسیبل',
    },
    features: ['هود مخفی', 'درب آینه‌ای دودی', 'ریموت کنترل', 'موتور فلزی ۴ دور', 'ترموگارد'],
  },
  {
    id: 'H236',
    model: 'H 236',
    name: 'هود مخفی Touchless H 236',
    category: 'hood',
    categoryLabel: 'هود مخفی',
    subcategory: 'touchless',
    description: 'هود مخفی ۸۰ سانتی با قابلیت کنترل با حرکت دست. بست فلزی با قابلیت تنظیم.',
    image: '/images/products/H236.png',
    specs: {
      'سایز': '۸۰ سانتی‌متر',
      'قدرت مکش': '۸۵۰ متر مکعب در ساعت',
      'موتور': 'توربو فلزی ۲ سر شفت ۴ دور',
      'فیلتر': 'آلومینیومی مگنتی سه لایه',
      'صدا': '۵۵ دسیبل',
      'بست': 'فلزی با قابلیت تنظیم',
    },
    features: ['کنترل با حرکت دست', 'هود مخفی', 'ریموت کنترل', 'سنسور دود و دما', 'ترموگارد', 'بست فلزی تنظیم‌پذیر'],
    isFeatured: true,
  },
  {
    id: 'H230',
    model: 'H 230',
    name: 'هود مخفی H 230',
    category: 'hood',
    categoryLabel: 'هود مخفی',
    subcategory: 'hidden',
    description: 'هود مخفی ۸۰ سانتی با بدنه شیشه مشکی. سنسور دود و دما و بست فلزی.',
    image: '/images/products/H215.png',
    specs: {
      'سایز': '۸۰ سانتی‌متر',
      'قدرت مکش': '۸۵۰ متر مکعب در ساعت',
      'موتور': 'توربو فلزی ۲ سر شفت ۴ دور',
      'فیلتر': 'آلومینیومی مگنتی سه لایه',
      'صدا': '۵۵ دسیبل',
    },
    features: ['بدنه شیشه مشکی', 'هود مخفی', 'ریموت کنترل', 'سنسور دود و دما', 'ترموگارد', 'بست فلزی'],
  },
  {
    id: 'H230GOLD',
    model: 'H 230 GOLD',
    name: 'هود مخفی طلایی H 230 GOLD',
    category: 'hood',
    categoryLabel: 'هود مخفی',
    subcategory: 'hidden',
    description: 'هود مخفی ۸۰ سانتی با بدنه استیل طلایی پریمیوم.',
    image: '/images/products/H230GOLD.png',
    specs: {
      'سایز': '۸۰ سانتی‌متر',
      'قدرت مکش': '۸۵۰ متر مکعب در ساعت',
      'موتور': 'توربو فلزی ۲ سر شفت ۴ دور',
      'فیلتر': 'آلومینیومی مگنتی سه لایه',
      'صدا': '۵۵ دسیبل',
    },
    features: ['بدنه استیل طلایی', 'هود مخفی', 'ریموت کنترل', 'سنسور دود و دما', 'ترموگارد'],
    colors: ['طلایی'],
    isFeatured: true,
  },

  // === GAS HOBS - GLASS ===
  {
    id: 'G339',
    model: 'G 339',
    name: 'اجاق گاز شیشه‌ای G 339',
    category: 'hob',
    categoryLabel: 'اجاق گاز شیشه‌ای',
    subcategory: 'glass',
    description: 'صفحه گاز شیشه‌ای ۹۰ سانتی با ۵ شعله. بدنه شیشه سکوریت نشکن ۸ میلی‌متر با لبه آینه‌ای.',
    image: '/images/products/G339.png',
    specs: {
      'سایز': '۹۰ سانتی‌متر',
      'تعداد شعله': '۵ شعله',
      'بدنه': 'شیشه سکوریت نشکن ۸ میلی‌متر',
      'توان پلوپز': '۳.۸ کیلووات',
      'مقاومت حرارتی': '۳۰۰ درجه سانتی‌گراد',
      'شبکه': 'چدنی',
      'ترموکوبل': 'ORKLI اسپانیا',
      'بوبین': 'TOPTIME',
    },
    features: ['لبه آینه‌ای', 'پلوپز', 'شبکه چدنی', 'ترموکوبل ORKLI اسپانیا', 'فندک', 'شیشه مقاوم ۳۰۰ درجه'],
    isFeatured: true,
  },
  {
    id: 'G371',
    model: 'G 371',
    name: 'اجاق گاز شیشه‌ای G 371',
    category: 'hob',
    categoryLabel: 'اجاق گاز شیشه‌ای',
    subcategory: 'glass',
    description: 'صفحه گاز شیشه‌ای ۹۰ سانتی با ۵ شعله.',
    image: '/images/products/G339.png',
    specs: {
      'سایز': '۹۰ سانتی‌متر',
      'تعداد شعله': '۵ شعله',
      'بدنه': 'شیشه سکوریت نشکن ۸ میلی‌متر',
      'توان پلوپز': '۳.۸ کیلووات',
      'مقاومت حرارتی': '۳۰۰ درجه سانتی‌گراد',
    },
    features: ['پلوپز', 'شبکه چدنی', 'ترموکوبل ORKLI اسپانیا', 'فندک'],
  },
  {
    id: 'G306',
    model: 'G 306',
    name: 'اجاق گاز شیشه‌ای G 306 شش شعله',
    category: 'hob',
    categoryLabel: 'اجاق گاز شیشه‌ای',
    subcategory: 'glass',
    description: 'صفحه گاز شیشه‌ای ۹۰ سانتی با ۶ شعله. دارای ۲ پلوپز.',
    image: '/images/products/G306.png',
    specs: {
      'سایز': '۹۰ سانتی‌متر',
      'تعداد شعله': '۶ شعله',
      'بدنه': 'شیشه سکوریت نشکن ۸ میلی‌متر',
      'توان پلوپز': '۳.۸ کیلووات',
      'مقاومت حرارتی': '۳۰۰ درجه سانتی‌گراد',
    },
    features: ['۲ پلوپز', 'شبکه چدنی', 'ترموکوبل ORKLI اسپانیا', 'فندک'],
    isFeatured: true,
  },
  {
    id: 'G305',
    model: 'G 305',
    name: 'اجاق گاز شیشه‌ای G 305',
    category: 'hob',
    categoryLabel: 'اجاق گاز شیشه‌ای',
    subcategory: 'glass',
    description: 'صفحه گاز شیشه‌ای ۷۰ سانتی با ۳ شعله.',
    image: '/images/products/G339.png',
    specs: {
      'سایز': '۷۰ سانتی‌متر',
      'تعداد شعله': '۳ شعله',
      'بدنه': 'شیشه سکوریت نشکن ۸ میلی‌متر',
      'توان پلوپز': '۳.۸ کیلووات',
      'مقاومت حرارتی': '۳۰۰ درجه سانتی‌گراد',
    },
    features: ['پلوپز', 'شبکه چدنی', 'ترموکوبل ORKLI اسپانیا', 'فندک'],
  },
  {
    id: 'G391DM',
    model: 'G 391 DM',
    name: 'اجاق گاز شیشه‌ای G 391 DM',
    category: 'hob',
    categoryLabel: 'اجاق گاز شیشه‌ای',
    subcategory: 'glass',
    description: 'صفحه گاز شیشه‌ای ۹۰ سانتی با ۵ شعله قارچی.',
    image: '/images/products/G391DM.png',
    specs: {
      'سایز': '۹۰ سانتی‌متر',
      'تعداد شعله': '۵ شعله',
      'نوع سرشعله': 'قارچی',
      'بدنه': 'شیشه سکوریت نشکن ۸ میلی‌متر',
      'توان پلوپز': '۳.۸ کیلووات',
      'مقاومت حرارتی': '۳۰۰ درجه سانتی‌گراد',
    },
    features: ['سرشعله قارچی', 'پلوپز', 'شبکه چدنی', 'ترموکوبل ORKLI اسپانیا', 'فندک'],
    isFeatured: true,
  },

  // === GAS HOBS - STEEL ===
  {
    id: 'S360',
    model: 'S 360',
    name: 'اجاق گاز استیل S 360',
    category: 'hob',
    categoryLabel: 'اجاق گاز استیل',
    subcategory: 'steel',
    description: 'صفحه گاز استیل ۹۰ سانتی با ۵ شعله. بدنه استیل ۴۳۰.',
    image: '/images/products/S360.png',
    specs: {
      'سایز': '۹۰ سانتی‌متر',
      'تعداد شعله': '۵ شعله',
      'بدنه': 'استیل ۴۳۰',
      'توان پلوپز': '۳.۸ کیلووات',
      'ترموکوبل': 'ORKLI اسپانیا',
      'بوبین': 'TOPTIME',
    },
    features: ['بدنه استیل ۴۳۰', 'پلوپز', 'شبکه چدنی', 'ترموکوبل ORKLI اسپانیا', 'فندک'],
    isFeatured: true,
  },
  {
    id: 'S350',
    model: 'S 350',
    name: 'اجاق گاز استیل S 350',
    category: 'hob',
    categoryLabel: 'اجاق گاز استیل',
    subcategory: 'steel',
    description: 'صفحه گاز استیل ۹۰ سانتی با ۵ شعله.',
    image: '/images/products/S360.png',
    specs: {
      'سایز': '۹۰ سانتی‌متر',
      'تعداد شعله': '۵ شعله',
      'بدنه': 'استیل',
      'توان پلوپز': '۳.۸ کیلووات',
    },
    features: ['بدنه استیل', 'پلوپز', 'شبکه چدنی', 'ترموکوبل ORKLI اسپانیا', 'فندک'],
  },
  {
    id: 'S303',
    model: 'S 303',
    name: 'اجاق گاز استیل S 303',
    category: 'hob',
    categoryLabel: 'اجاق گاز استیل',
    subcategory: 'steel',
    description: 'صفحه گاز استیل ۷۰ سانتی با ۳ شعله.',
    image: '/images/products/S360.png',
    specs: {
      'سایز': '۷۰ سانتی‌متر',
      'تعداد شعله': '۳ شعله',
      'بدنه': 'استیل ۴۳۰',
      'توان پلوپز': '۳.۸ کیلووات',
    },
    features: ['بدنه استیل ۴۳۰', 'پلوپز', 'شبکه چدنی', 'ترموکوبل ORKLI اسپانیا', 'فندک'],
  },

  // === SINKS - HANDMADE ===
  {
    id: 'S124',
    model: 'S 124',
    name: 'سینک دست‌ساز S 124',
    category: 'sink',
    categoryLabel: 'سینک دست‌ساز',
    subcategory: 'handmade',
    description: 'سینک دست‌ساز تک لگن یک سینی (Under-Mount). مناسب صفحه‌های کورین، سنگی و شیشه‌ای.',
    image: '/images/products/S124.png',
    specs: {
      'سایز': '۴۸۳×۱۳۸ میلی‌متر',
      'عمق': '۲۳۰ میلی‌متر',
      'ضخامت': '۱.۲ میلی‌متر',
      'جنس': 'استیل ۴۳۰',
      'نوع نصب': 'زیرصفحه (Under-Mount)',
    },
    features: ['سینک دست‌ساز', 'نصب زیرصفحه', 'سیفون با تفاله‌گیر', 'مناسب کورین و سنگ و شیشه'],
    isFeatured: true,
  },
  {
    id: 'S103',
    model: 'S 103',
    name: 'سینک دست‌ساز S 103',
    category: 'sink',
    categoryLabel: 'سینک دست‌ساز',
    subcategory: 'handmade',
    description: 'سینک دست‌ساز توکار تک لگن با گوشه‌های زاویه ۹۰ درجه. قابل نصب در صفحات کورین، ام‌دی‌اف، کوارتز و هم‌سطح.',
    image: '/images/products/S103.png',
    specs: {
      'سایز': '۷۵۰×۵۰۰ میلی‌متر',
      'عمق': '۲۰۰ میلی‌متر',
      'ضخامت': '۱ میلی‌متر',
      'جنس': 'استیل ۴۳۰',
      'نوع نصب': 'توکار',
    },
    features: ['سینک دست‌ساز', 'گوشه ۹۰ درجه', 'زیرآب بزرگ', 'مناسب کورین، ام‌دی‌اف، کوارتز', 'هم‌سطح'],
    isFeatured: true,
  },
  {
    id: 'S122',
    model: 'S 122',
    name: 'سینک دست‌ساز S 122 دو لگن',
    category: 'sink',
    categoryLabel: 'سینک دست‌ساز',
    subcategory: 'handmade',
    description: 'سینک دست‌ساز دو لگن یک سینی (Under-Mount). نصب زیر صفحه‌های سنگی و شیشه‌ای.',
    image: '/images/products/S124.png',
    specs: {
      'سایز': '۴۸۸×۱۱۶۰ میلی‌متر',
      'عمق': '۲۳۰ میلی‌متر',
      'ضخامت': '۱.۲ میلی‌متر',
      'جنس': 'استیل ۴۳۰',
      'نوع نصب': 'زیرصفحه (Under-Mount)',
    },
    features: ['سینک دست‌ساز', 'دو لگن', 'نصب زیرصفحه', 'سیفون با تفاله‌گیر'],
  },

  // === SINKS - GRANITE ===
  {
    id: 'G168',
    model: '168',
    name: 'سینک گرانیتی دو لگن 168',
    category: 'sink',
    categoryLabel: 'سینک گرانیتی',
    subcategory: 'granite',
    description: 'سینک گرانیتی دو لگن با ضمانت ۲ سال. در رنگ‌های متنوع مشکی و سفید.',
    image: '/images/products/G168.png',
    specs: {
      'سایز': '۵۰۰×۱۱۶۰ میلی‌متر',
      'عمق لگن': '۲۰۰ میلی‌متر',
      'ضمانت': '۲ سال',
    },
    features: ['گرانیت', 'دو لگن', 'سیفون', 'ضمانت ۲ سال'],
    colors: ['مشکی ساده', 'مشکی رگه سفید', 'مشکی رگه نقره‌ای', 'سفید ساده', 'مشکی رگه طلایی', 'سفید رگه مشکی', 'سفید رگه نقره‌ای', 'سفید رگه طلایی'],
    isFeatured: true,
  },
  {
    id: 'G167',
    model: '167',
    name: 'سینک گرانیتی تک لگن 167',
    category: 'sink',
    categoryLabel: 'سینک گرانیتی',
    subcategory: 'granite',
    description: 'سینک گرانیتی تک لگن با ضمانت ۲ سال.',
    image: '/images/products/G168.png',
    specs: {
      'سایز': '۴۰۰×۷۵۰ میلی‌متر',
      'عمق لگن': '۱۹۰ میلی‌متر',
      'ضمانت': '۲ سال',
    },
    features: ['گرانیت', 'تک لگن', 'سیفون', 'ضمانت ۲ سال'],
    colors: ['مشکی ساده', 'مشکی رگه سفید', 'مشکی رگه نقره‌ای', 'سفید ساده'],
  },
  {
    id: 'G160',
    model: '160',
    name: 'سینک گرانیتی تک لگن 160',
    category: 'sink',
    categoryLabel: 'سینک گرانیتی',
    subcategory: 'granite',
    description: 'سینک گرانیتی تک لگن بزرگ با ضمانت ۲ سال.',
    image: '/images/products/G160.png',
    specs: {
      'سایز': '۵۰۰×۱۰۰۰ میلی‌متر',
      'عمق لگن': '۲۰۰ میلی‌متر',
      'ضمانت': '۲ سال',
    },
    features: ['گرانیت', 'تک لگن', 'سیفون', 'ضمانت ۲ سال'],
    colors: ['مشکی ساده', 'مشکی رگه سفید', 'مشکی رگه نقره‌ای', 'مشکی رگه طلایی'],
    isFeatured: true,
  },

  // === SINKS - FANCY ===
  {
    id: 'S142',
    model: 'S 142',
    name: 'سینک فانتزی S 142',
    category: 'sink',
    categoryLabel: 'سینک فانتزی',
    subcategory: 'fancy',
    description: 'سینک فانتزی روکار دو لگن تک سینی. استیل ۴۳۰.',
    image: '/images/products/S124.png',
    specs: {
      'سایز': '۶۰۰×۱۲۰۰ میلی‌متر',
      'عمق': '۲۰۰ میلی‌متر',
      'جنس': 'استیل ۴۳۰',
      'نوع نصب': 'روکار',
    },
    features: ['سینک فانتزی', 'روکار', 'دو لگن', 'یک سینی', 'سیفون و بست'],
  },

  // === OVENS ===
  {
    id: 'O410',
    model: 'O 410',
    name: 'فر توکار O 410',
    category: 'oven',
    categoryLabel: 'فر توکار',
    subcategory: 'electric',
    description: 'فر برقی ۶۰ سانتی با ۸ برنامه پخت. محفظه ۷۵ لیتری با لعاب Easy to Clean.',
    image: '/images/products/O410.png',
    specs: {
      'سایز': '۶۰ سانتی‌متر',
      'برنامه پخت': '۸ برنامه',
      'حجم محفظه': '۷۵ لیتر',
      'در': 'آرام‌بند ۴ جداره',
      'کلاس انرژی': 'A',
      'تنظیم دما': '۵۰ تا ۲۵۰ درجه سانتی‌گراد',
    },
    features: ['۸ برنامه پخت', 'در آرام‌بند ۴ جداره', 'لعاب Easy to Clean', 'فن خنک‌کننده', 'فن کانوکشن', 'جوجه‌گردان', 'آلارم زمان پخت', 'ریل تلسکوپی', 'کلاس انرژی A'],
    isFeatured: true,
  },
  {
    id: 'O411',
    model: 'O 411',
    name: 'فر توکار O 411',
    category: 'oven',
    categoryLabel: 'فر توکار',
    subcategory: 'electric',
    description: 'فر برقی ۶۰ سانتی با ۱۳ برنامه پخت. پروب دمای گوشت و پخت تأخیری.',
    image: '/images/products/O410.png',
    specs: {
      'سایز': '۶۰ سانتی‌متر',
      'برنامه پخت': '۱۳ برنامه',
      'حجم محفظه': '۷۵ لیتر',
      'در': 'آرام‌بند ۴ جداره',
      'کلاس انرژی': 'A',
      'تنظیم دما': '۵۰ تا ۲۵۰ درجه سانتی‌گراد',
    },
    features: ['۱۳ برنامه پخت', 'در آرام‌بند ۴ جداره', 'لعاب Easy to Clean', 'فن خنک‌کننده', 'فن کانوکشن', 'جوجه‌گردان', 'پروب دمای گوشت', 'سیستم یخ‌زدایی', 'پخت تأخیری', 'قفل کودک', 'کلاس انرژی A'],
    isFeatured: true,
  },
  {
    id: 'O414',
    model: 'O 414',
    name: 'فر توکار O 414 سفید',
    category: 'oven',
    categoryLabel: 'فر توکار',
    subcategory: 'electric',
    description: 'فر برقی ۶۰ سانتی با ۱۳ برنامه پخت. بدنه شیشه سفید و استیل.',
    image: '/images/products/O414.png',
    specs: {
      'سایز': '۶۰ سانتی‌متر',
      'برنامه پخت': '۱۳ برنامه',
      'حجم محفظه': '۷۵ لیتر',
      'رنگ': 'سفید و استیل',
      'کلاس انرژی': 'A',
    },
    features: ['بدنه سفید و استیل', '۱۳ برنامه پخت', 'پروب دمای گوشت', 'سیستم یخ‌زدایی', 'پخت تأخیری', 'قفل کودک', 'کلاس انرژی A'],
    colors: ['سفید'],
  },
  {
    id: 'O415',
    model: 'O 415',
    name: 'فر توکار دو طبقه O 415',
    category: 'oven',
    categoryLabel: 'فر توکار',
    subcategory: 'electric',
    description: 'فر برقی ۶۰ سانتی دو طبقه با ۱۸ برنامه پخت. پخت مجزا در هر طبقه. محفظه ۹۰ لیتری.',
    image: '/images/products/O415.png',
    specs: {
      'سایز': '۶۰ سانتی‌متر',
      'برنامه پخت': '۱۸ برنامه در دو طبقه',
      'حجم محفظه': '۹۰ لیتر',
      'در': 'آرام‌بند ۴ جداره',
      'فن کانوکشن': '۲ عدد',
      'کلاس انرژی': 'A',
    },
    features: ['دو طبقه مستقل', '۱۸ برنامه پخت', 'محفظه ۹۰ لیتری', 'شلف شیشه‌ای', 'پروب دمای گوشت', 'جوجه‌گردان', 'سیستم یخ‌زدایی', 'ریل تلسکوپی', 'قفل کودک', 'کلاس انرژی A'],
    isFeatured: true,
  },

  // === MICROWAVE ===
  {
    id: 'M501',
    model: 'M 501',
    name: 'ماکروویو + فر M 501',
    category: 'microwave',
    categoryLabel: 'ماکروویو + فر',
    subcategory: 'combination',
    description: 'ماکروویو + فر ۶۰×۳۹ سانتی با ۱۰ برنامه پخت و کانوکشن. گریل ۱۲۰۰ وات.',
    image: '/images/products/M501.png',
    specs: {
      'سایز': '۶۰×۳۹ سانتی‌متر',
      'حجم': '۴۳ لیتر',
      'برنامه پخت': '۱۰ برنامه',
      'قدرت گریل': '۱۲۰۰ وات',
      'قدرت فن داخلی': '۱۹۵۰ وات',
      'کلاس انرژی': 'A',
    },
    features: ['۱۰ برنامه پخت', 'کانوکشن', '۴ برنامه پخت ترکیبی', '۷ برنامه اتوماتیک', 'یخ‌زدایی سریع', 'گریل ۱۲۰۰W', 'فن ۱۹۵۰W', 'محفظه داخلی استیل', 'قفل کودک', 'کلاس انرژی A'],
    isFeatured: true,
  },
  {
    id: 'M502',
    model: 'M 502',
    name: 'ماکروویو + فر M 502',
    category: 'microwave',
    categoryLabel: 'ماکروویو + فر',
    subcategory: 'combination',
    description: 'ماکروویو + فر با قابلیت‌های پیشرفته و دستگیره تمام استیل.',
    image: '/images/products/M501.png',
    specs: {
      'سایز': '۶۰×۳۹ سانتی‌متر',
      'حجم': '۴۳ لیتر',
      'برنامه پخت': '۱۰ برنامه',
      'قدرت گریل': '۱۲۰۰ وات',
      'کلاس انرژی': 'A',
    },
    features: ['۱۰ برنامه پخت', 'کانوکشن', 'یخ‌زدایی سریع', 'گریل ۱۲۰۰W', 'دستگیره تمام استیل', 'قفل کودک', 'کلاس انرژی A'],
  },
]

export const featuredProducts = products.filter(p => p.isFeatured)
export const heroProduct = products.find(p => p.isHero)

export const getProductsByCategory = (category: ProductCategory) =>
  products.filter(p => p.category === category)

export const getProductById = (id: string) =>
  products.find(p => p.id === id)

export const stats = [
  { value: '۱۵+', label: 'سال تجربه' },
  { value: '۱۰۰+', label: 'محصول متنوع' },
  { value: '۵۰+', label: 'نمایندگی در ایران' },
  { value: '۱۰۰۰��۰+', label: 'مشتری راضی' },
]

export const certificates = [
  { name: 'ISO', description: 'استاندارد بین‌المللی مدیریت کیفیت' },
  { name: 'CE', description: 'گواهینامه انطباق اروپایی' },
  { name: 'استاندارد ملی ایران', description: 'تأییدیه استاندارد ملی ایران' },
]

export interface Representative {
  id: string
  name: string
  company: string
  address: string
  phone: string
  mobile?: string
}

export interface ProvinceRepresentatives {
  /** ISO 3166-2 code, e.g. "IR-07" */
  isoCode: string
  provinceName: string
  representatives: Representative[]
}

export const provinceRepresentatives: ProvinceRepresentatives[] = [
  {
    isoCode: 'IR-07',
    provinceName: 'استان تهران',
    representatives: [
      { id: 'thr-1', name: 'علی محمدی', company: 'نمایندگی مرکزی کلایبرگ تهران', address: 'تهران، خیابان ولیعصر، پلاک ۴۵۲', phone: '۰۲۱-۸۸۱۲۳۴۵۶', mobile: '۰۹۱۲-۱۲۳-۴۵۶۷' },
      { id: 'thr-2', name: 'سارا رضایی', company: 'فروشگاه آشپزخانه مدرن', address: 'تهران، سعادت‌آباد، بلوار دریا', phone: '۰۲۱-۲۲۵۶۷۸۹۰', mobile: '۰۹۱۲-۹۸۷-۶۵۴۳' },
      { id: 'thr-3', name: 'حسین کریمی', company: 'کلایبرگ غرب تهران', address: 'تهران، پونک، خیابان اشرفی اصفهانی', phone: '۰۲۱-۴۴۳۴۵۶۷۸', mobile: '۰۹۱۲-۳۴۵-۶۷۸۹' },
    ],
  },
  {
    isoCode: 'IR-10',
    provinceName: 'استان اصفهان',
    representatives: [
      { id: 'isf-1', name: 'محمد اکبری', company: 'نمایندگی کلایبرگ اصفهان', address: 'اصفهان، خیابان مشتاق، کوچه ۷', phone: '۰۳۱-۳۶۲۱۴۵۶۷', mobile: '۰۹۱۳-۲۳۴-۵۶۷۸' },
      { id: 'isf-2', name: 'فاطمه نوری', company: 'پخش لوازم آشپزخانه نوری', address: 'اصفهان، چهارباغ بالا، نرسیده به میدان آزادی', phone: '۰۳۱-۳۲۳۴۵۶۷۸' },
    ],
  },
  {
    isoCode: 'IR-20',
    provinceName: 'استان فارس',
    representatives: [
      { id: 'far-1', name: 'رضا شیرازی', company: 'نمایندگی کلایبرگ شیراز', address: 'شیراز، بلوار ستارخان، نبش کوچه ۱۴', phone: '۰۷۱-۳۲۳۴۱۲۳۴', mobile: '۰۹۱۷-۱۲۳-۴۵۶۷' },
    ],
  },
  {
    isoCode: 'IR-30',
    provinceName: 'استان خراسان رضوی',
    representatives: [
      { id: 'khr-1', name: 'امیر حسینی', company: 'کلایبرگ مشهد', address: 'مشهد، بلوار وکیل‌آباد، خیابان فرخی', phone: '۰۵۱-۳۵۲۳۴۵۶۷', mobile: '۰۹۱۵-۳۴۵-۶۷۸۹' },
      { id: 'khr-2', name: 'نیلوفر قاسمی', company: 'فروشگاه آشپزخانه توس', address: 'مشهد، بلوار سجاد، مجتمع تجاری پارس', phone: '۰۵۱-۳۶۲۱۸۹۰۱' },
    ],
  },
  {
    isoCode: 'IR-19',
    provinceName: 'استان آذربایجان شرقی',
    representatives: [
      { id: 'aze-1', name: 'بهروز تبریزی', company: 'نمایندگی کلایبرگ تبریز', address: 'تبریز، خیابان آزادی، روبه‌روی پارک ائل‌گلی', phone: '۰۴۱-۳۳۲۱۴۵۶۷', mobile: '۰۹۱۴-۱۲۳-۴۵۶۷' },
    ],
  },
  {
    isoCode: 'IR-13',
    provinceName: 'استان خوزستان',
    representatives: [
      { id: 'khz-1', name: 'مریم دشتی', company: 'کلایبرگ اهواز', address: 'اهواز، کیانپارس، خیابان ۱۴', phone: '۰۶۱-۳۳۳۲۱۴۵۶', mobile: '۰۹۱۶-۲۳۴-۵۶۷۸' },
      { id: 'khz-2', name: 'کریم موسوی', company: 'پخش آشپزخانه جنوب', address: 'اهواز، گلستان، خیابان امام خمینی', phone: '۰۶۱-۳۳۶۱۲۳۴۵' },
    ],
  },
  {
    isoCode: 'IR-22',
    provinceName: 'استان کرمانشاه',
    representatives: [
      { id: 'ksn-1', name: 'داود عزیزی', company: 'نمایندگی کلایبرگ کرمانشاه', address: 'کرمانشاه، بلوار شهید بهشتی، کوچه ۳', phone: '۰۸۳-۳۴۲۳۱۲۳۴', mobile: '۰۹۱۸-۱۲۳-۴۵۶۷' },
    ],
  },
  {
    isoCode: 'IR-23',
    provinceName: 'استان گیلان',
    representatives: [
      { id: 'gln-1', name: 'شهرام رشتی', company: 'نمایندگی کلایبرگ رشت', address: 'رشت، خیابان مطهری، نرسیده به میدان گیل', phone: '۰۱۳-۳۳۴۵۶۷۸۹', mobile: '۰۹۱۱-۱۲۳-۴۵۶۷' },
    ],
  },
  {
    isoCode: 'IR-03',
    provinceName: 'استان مازندران',
    representatives: [
      { id: 'mzn-1', name: 'پریسا علوی', company: 'کلایبرگ ساری', address: 'ساری، بلوار پاسداران، مجتمع تجاری آفتاب', phone: '۰۱۱-۳۳۲۱۴۵۶۷', mobile: '۰۹۱۱-۳۴۵-۶۷۸۹' },
      { id: 'mzn-2', name: 'محسن یزدانی', company: 'فروشگاه لوازم خانگی نور', address: 'بابل، میدان امام، خیابان شریعتی', phone: '۰۱۱-۳۲۲۱۳۴۵۶' },
    ],
  },
  {
    isoCode: 'IR-08',
    provinceName: 'استان کرمان',
    representatives: [
      { id: 'krm-1', name: 'علیرضا کرمانی', company: 'نمایندگی کلایبرگ کرمان', address: 'کرمان، خیابان جمهوری، مجتمع تجاری بهار', phone: '۰۳۴-۳۲۳۲۱۲۳۴', mobile: '۰۹۱۳-۵۶۷-۸۹۰۱' },
    ],
  },
  {
    isoCode: 'IR-05',
    provinceName: 'استان البرز',
    representatives: [
      { id: 'alb-1', name: 'نادر کرجی', company: 'نمایندگی کلایبرگ کرج', address: 'کرج، عظیمیه، خیابان بهشتی', phone: '۰۲۶-۳۴۵۶۷۸۹۰', mobile: '۰۹۱۲-۴۵۶-۷۸۹۰' },
    ],
  },
  {
    isoCode: 'IR-04',
    provinceName: 'استان قزوین',
    representatives: [
      { id: 'qzv-1', name: 'منصور قزوینی', company: 'پخش لوازم آشپزخانه قزوین', address: 'قزوین، خیابان سپه، نبش کوچه ۱۱', phone: '۰۲۸-۳۳۲۱۴۵۶۷' },
    ],
  },
  {
    isoCode: 'IR-25',
    provinceName: 'استان قم',
    representatives: [
      { id: 'qom-1', name: 'حجت‌الله صالحی', company: 'نمایندگی کلایبرگ قم', address: 'قم، بلوار محمدامین، کوچه گلستان', phone: '۰۲۵-۳۷۸۹۰۱۲۳', mobile: '۰۹۱۲-۷۸۹-۰۱۲۳' },
    ],
  },
  {
    isoCode: 'IR-06',
    provinceName: 'استان سمنان',
    representatives: [
      { id: 'smn-1', name: 'کامران سمنانی', company: 'فروشگاه آشپزخانه دشت', address: 'سمنان، خیابان فردوسی، پلاک ۸۷', phone: '۰۲۳-۳۳۲۳۴۵۶۷' },
    ],
  },
  {
    isoCode: 'IR-27',
    provinceName: 'استان گلستان',
    representatives: [
      { id: 'gls-1', name: 'توران گلستانی', company: 'نمایندگی کلایبرگ گرگان', address: 'گرگان، بلوار ولیعصر، خیابان جانبازان', phone: '۰۱۷-۳۲۲۳۴۵۶۷', mobile: '۰۹۱۱-۷۸۹-۰۱۲۳' },
    ],
  },
  {
    isoCode: 'IR-24',
    provinceName: 'استان همدان',
    representatives: [
      { id: 'hmd-1', name: 'بیژن همدانی', company: 'نمایندگی کلایبرگ همدان', address: 'همدان، خیابان بوعلی، روبه‌روی دانشگاه', phone: '۰۸۱-۳۸۲۳۴۵۶۷' },
    ],
  },
  {
    isoCode: 'IR-15',
    provinceName: 'استان لرستان',
    representatives: [
      { id: 'lor-1', name: 'شاهین لرستانی', company: 'پخش لوازم خانگی لرستان', address: 'خرم‌آباد، بلوار شهید چمران، کوچه ۵', phone: '۰۶۶-۳۳۳۲۱۲۳۴' },
    ],
  },
  {
    isoCode: 'IR-16',
    provinceName: 'استان ایلام',
    representatives: [
      { id: 'ilm-1', name: 'سیاوش ایلامی', company: 'فروشگاه آشپزخانه ایلام', address: 'ایلام، خیابان انقلاب، مجتمع تجاری مروارید', phone: '۰۸۴-۳۲۲۳۴۵۶۷' },
    ],
  },
  {
    isoCode: 'IR-02',
    provinceName: 'استان بوشهر',
    representatives: [
      { id: 'bsh-1', name: 'آرش بوشهری', company: 'نمایندگی کلایبرگ بوشهر', address: 'بوشهر، خیابان مدرس، پلاک ۱۲۳', phone: '۰۷۷-۳۳۴۵۶۷۸۹', mobile: '۰۹۱۷-۴۵۶-۷۸۹۰' },
    ],
  },
  {
    isoCode: 'IR-18',
    provinceName: 'استان هرمزگان',
    representatives: [
      { id: 'hrm-1', name: 'ناصر هرمزگانی', company: 'نمایندگی کلایبرگ بندرعباس', address: 'بندرعباس، بلوار امام خمینی، کوچه گل‌محمدی', phone: '۰۷۶-۳۳۲۲۳۴۵۶' },
    ],
  },
  {
    isoCode: 'IR-14',
    provinceName: 'استان سیستان و بلوچستان',
    representatives: [
      { id: 'sbl-1', name: 'جمیله بلوچ', company: 'فروشگاه آشپزخانه زاهدان', address: 'زاهدان، خیابان شریعتی، نزدیک میدان آزادی', phone: '۰۵۴-۳۳۲۳۴۵۶۷' },
    ],
  },
  {
    isoCode: 'IR-28',
    provinceName: 'استان خراسان شمالی',
    representatives: [
      { id: 'khn-1', name: 'اکبر بجنوردی', company: 'نمایندگی کلایبرگ بجنورد', address: 'بجنورد، خیابان طالقانی، کوچه ۸', phone: '۰۵۸-۳۲۲۳۴۵۶۷' },
    ],
  },
  {
    isoCode: 'IR-29',
    provinceName: 'استان خراسان جنوبی',
    representatives: [
      { id: 'khj-1', name: 'زینب بیرجندی', company: 'فروشگاه لوازم خانگی بیرجند', address: 'بیرجند، خیابان مدرس، مجتمع تجاری خلیج‌فارس', phone: '۰۵۶-۳۲۲۱۲۳۴۵' },
    ],
  },
  {
    isoCode: 'IR-21',
    provinceName: 'استان آذربایجان غربی',
    representatives: [
      { id: 'azw-1', name: 'وحید ارومی', company: 'نمایندگی کلایبرگ ارومیه', address: 'ارومیه، خیابان شهریار، پلاک ۵۵', phone: '۰۴۴-۳۲۳۳۴۵۶۷', mobile: '۰۹۱۴-۷۸۹-۰۱۲۳' },
    ],
  },
  {
    isoCode: 'IR-01',
    provinceName: 'استان اردبیل',
    representatives: [
      { id: 'ard-1', name: 'صمد اردبیلی', company: 'نمایندگی کلایبرگ اردبیل', address: 'اردبیل، خیابان امام، کوچه ملا باشی', phone: '۰۴۵-۳۳۴۵۶۷۸۹' },
    ],
  },
  {
    isoCode: 'IR-11',
    provinceName: 'استان کردستان',
    representatives: [
      { id: 'krd-1', name: 'هیوا کردستانی', company: 'فروشگاه آشپزخانه کردستان', address: 'سنندج، بلوار پاسداران، مجتمع تجاری ارس', phone: '۰۸۷-۳۳۲۲۱۲۳۴' },
    ],
  },
  {
    isoCode: 'IR-17',
    provinceName: 'استان چهارمحال و بختیاری',
    representatives: [
      { id: 'chb-1', name: 'فرهاد بختیاری', company: 'نمایندگی کلایبرگ شهرکرد', address: 'شهرکرد، خیابان هراتی، پلاک ۱۲', phone: '۰۳۸-۳۲۳۱۲۳۴۵' },
    ],
  },
  {
    isoCode: 'IR-12',
    provinceName: 'استان خراسان',
    representatives: [],
  },
  {
    isoCode: 'IR-00',
    provinceName: 'استان مرکزی',
    representatives: [
      { id: 'mrk-1', name: 'غلامرضا مرکزی', company: 'نمایندگی کلایبرگ اراک', address: 'اراک، خیابان شریعتی، کوچه نیلوفر', phone: '۰۸۶-۳۲۲۳۴۵۶۷' },
    ],
  },
  {
    isoCode: 'IR-26',
    provinceName: 'استان یزد',
    representatives: [
      { id: 'yzd-1', name: 'حمید یزدی', company: 'نمایندگی کلایبرگ یزد', address: 'یزد، بلوار دانشجو، نبش خیابان فرهنگ', phone: '۰۳۵-۳۶۲۳۴۵۶۷', mobile: '۰۹۱۳-۸۹۰-۱۲۳۴' },
    ],
  },
  {
    isoCode: 'IR-09',
    provinceName: 'استان زنجان',
    representatives: [
      { id: 'znj-1', name: 'بابک زنجانی', company: 'فروشگاه آشپزخانه زنجان', address: 'زنجان، خیابان مدرس، مجتمع تجاری ستاره', phone: '۰۲۴-۳۳۴۳۴۵۶۷' },
    ],
  },
]
