/* ═══════════════════════════════════════════════════════════════
   Raithu Bazaar — Core Application Engine (app.js)
   All data persistence via localStorage. No backend required.
   ═══════════════════════════════════════════════════════════════ */

const RaithuBazaar = (() => {

  // ──── CATEGORIES ────
  const CATEGORIES = [
    { id: 'vegetables', name: 'Vegetables', nameTE: 'కూరగాయలు', nameHI: 'सब्ज़ियाँ', emoji: '🥬' },
    { id: 'fruits', name: 'Fruits', nameTE: 'పండ్లు', nameHI: 'फल', emoji: '🍎' },
    { id: 'rice-grains', name: 'Rice & Grains', nameTE: 'బియ్యం & ధాన్యాలు', nameHI: 'चावल और अनाज', emoji: '🍚' },
    { id: 'dairy', name: 'Dairy', nameTE: 'పాల ఉత్పత్తులు', nameHI: 'डेयरी', emoji: '🥛' },
    { id: 'spices', name: 'Spices', nameTE: 'మసాలాలు', nameHI: 'मसाले', emoji: '🌶️' },
    { id: 'pulses', name: 'Pulses', nameTE: 'పప్పులు', nameHI: 'दालें', emoji: '🫘' },
  ];

  // ──── SAMPLE FARMERS ────
  const SAMPLE_FARMERS = [
    { id: 1, name: 'Lakshman Rao', nameTE: 'లక్ష్మణ్ రావు', phone: '+91 98765 43210', village: 'Warangal', state: 'Telangana', rating: 4.9, reviews: 127, products: ['Vegetables', 'Organic'], image: 'https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/3fc515ad-cadf-4245-c722-5efeea61c500/public', bio: 'Organic farming for 15 years. Specializes in fresh vegetables grown without chemical pesticides.', bioTE: '15 సంవత్సరాలుగా సేంద్రియ వ్యవసాయం. రసాయన పురుగుమందులు లేకుండా పండించిన తాజా కూరగాయలలో ప్రత్యేకత.', farmSize: '5 acres', certified: true, joined: '2024-01-15' },
    { id: 2, name: 'Priya Devi', nameTE: 'ప్రియ దేవి', phone: '+91 98765 43211', village: 'Karimnagar', state: 'Telangana', rating: 4.8, reviews: 93, products: ['Fruits', 'Dairy'], image: 'https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/8f8beea9-ff7d-4843-74ff-c42de78b3500/public', bio: 'Third-generation farmer. Our family farm produces the sweetest mangoes and farm-fresh milk products.', bioTE: 'మూడవ తరం రైతు. మా కుటుంబ పొలం అత్యంత తీయని మామిడి పండ్లు మరియు తాజా పాల ఉత్పత్తులను ఉత్పత్తి చేస్తుంది.', farmSize: '8 acres', certified: true, joined: '2024-03-20' },
    { id: 3, name: 'Rajesh Kumar', nameTE: 'రాజేష్ కుమార్', phone: '+91 98765 43212', village: 'Nalgonda', state: 'Telangana', rating: 4.7, reviews: 156, products: ['Rice', 'Grains', 'Spices'], image: 'https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/3fc515ad-cadf-4245-c722-5efeea61c500/public', bio: 'Premium sona masuri rice and hand-ground spices from the fertile lands of Nalgonda.', bioTE: 'నల్గొండ సారవంతమైన భూముల నుండి ప్రీమియం సోనా మసూరి బియ్యం మరియు చేతితో పొడిచిన మసాలాలు.', farmSize: '12 acres', certified: true, joined: '2024-02-10' },
    { id: 4, name: 'Anitha Reddy', nameTE: 'అనిత రెడ్డి', phone: '+91 98765 43213', village: 'Medak', state: 'Telangana', rating: 4.6, reviews: 78, products: ['Pulses', 'Organic'], image: 'https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/8f8beea9-ff7d-4843-74ff-c42de78b3500/public', bio: 'Certified organic farmer growing protein-rich pulses and lentils for healthy Indian families.', bioTE: 'ఆరోగ్యకరమైన భారతీయ కుటుంబాల కోసం ప్రోటీన్ అధికంగా ఉన్న పప్పులు మరియు కందులను పండించే ధృవీకరించబడిన సేంద్రియ రైతు.', farmSize: '6 acres', certified: true, joined: '2024-05-01' },
    { id: 5, name: 'Venkat Swamy', nameTE: 'వెంకట్ స్వామి', phone: '+91 98765 43214', village: 'Nizamabad', state: 'Telangana', rating: 4.8, reviews: 112, products: ['Vegetables', 'Spices'], image: 'https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/3fc515ad-cadf-4245-c722-5efeea61c500/public', bio: 'Known for the freshest turmeric and chili peppers in the district. Chemical-free farming practices.', bioTE: 'జిల్లాలో అత్యంత తాజా పసుపు మరియు మిరపకాయలకు ప్రసిద్ధి. రసాయన రహిత వ్యవసాయ పద్ధతులు.', farmSize: '4 acres', certified: false, joined: '2024-06-15' },
  ];

  // ──── SAMPLE PRODUCTS ────
  const SAMPLE_PRODUCTS = [
    { id: 1, name: 'Organic Tomatoes', nameTE: 'సేంద్రియ టమాటాలు', nameHI: 'जैविक टमाटर', price: 45, unit: 'kg', category: 'vegetables', farmer_id: 1, organic: true, rating: 4.8, stock: 50, description: 'Fresh organic tomatoes, hand-picked and naturally ripened. No chemical pesticides used.', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400' },
    { id: 2, name: 'Farm Fresh Spinach', nameTE: 'తాజా పాలకూర', nameHI: 'ताज़ा पालक', price: 30, unit: 'bunch', category: 'vegetables', farmer_id: 1, organic: true, rating: 4.7, stock: 40, description: 'Tender spinach leaves freshly harvested from organic farm. Rich in iron and vitamins.', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400' },
    { id: 3, name: 'Green Chillies', nameTE: 'పచ్చి మిర్చి', nameHI: 'हरी मिर्च', price: 60, unit: 'kg', category: 'vegetables', farmer_id: 5, organic: false, rating: 4.6, stock: 35, description: 'Spicy green chillies perfect for Indian cooking. Fresh and crisp from Nizamabad farms.', image: 'https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=400' },
    { id: 4, name: 'Brinjal (Eggplant)', nameTE: 'వంకాయ', nameHI: 'बैंगन', price: 35, unit: 'kg', category: 'vegetables', farmer_id: 1, organic: true, rating: 4.5, stock: 30, description: 'Purple brinjals organically grown. Perfect for curries, fries, and bhartha.', image: 'https://images.unsplash.com/photo-1615484477778-ca3b77940c25?w=400' },
    { id: 5, name: 'Lady Finger (Okra)', nameTE: 'బెండకాయ', nameHI: 'भिंडी', price: 40, unit: 'kg', category: 'vegetables', farmer_id: 5, organic: false, rating: 4.7, stock: 45, description: 'Tender lady finger, freshly picked every morning. Ideal for stir-fry and curry.', image: 'https://images.unsplash.com/photo-1425543103986-22abb7d7e8d2?w=400' },
    { id: 6, name: 'Alphonso Mangoes', nameTE: 'ఆల్ఫాన్సో మామిడి', nameHI: 'अल्फांसो आम', price: 350, unit: 'kg', category: 'fruits', farmer_id: 2, organic: true, rating: 4.9, stock: 25, description: 'Premium Alphonso mangoes, naturally ripened. The king of fruits from our orchards.', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400' },
    { id: 7, name: 'Fresh Bananas', nameTE: 'తాజా అరటి పండ్లు', nameHI: 'ताज़े केले', price: 40, unit: 'dozen', category: 'fruits', farmer_id: 2, organic: false, rating: 4.6, stock: 60, description: 'Sweet and ripe bananas. Naturally grown without artificial ripening agents.', image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400' },
    { id: 8, name: 'Pomegranate', nameTE: 'దానిమ్మ', nameHI: 'अनार', price: 120, unit: 'kg', category: 'fruits', farmer_id: 2, organic: true, rating: 4.8, stock: 20, description: 'Ruby-red pomegranates bursting with juice. Rich in antioxidants and vitamins.', image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400' },
    { id: 9, name: 'Sweet Oranges', nameTE: 'తీపి నారింజ', nameHI: 'संतरा', price: 80, unit: 'kg', category: 'fruits', farmer_id: 2, organic: false, rating: 4.5, stock: 35, description: 'Nagpur-style sweet oranges, juicy and packed with Vitamin C.', image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=400' },
    { id: 10, name: 'Sona Masuri Rice', nameTE: 'సోనా మసూరి బియ్యం', nameHI: 'सोना मसूरी चावल', price: 65, unit: 'kg', category: 'rice-grains', farmer_id: 3, organic: true, rating: 4.9, stock: 100, description: 'Premium quality Sona Masuri rice, stone-polished and chemical-free. The best rice of Telangana.', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400' },
    { id: 11, name: 'Basmati Rice', nameTE: 'బాస్మతి బియ్యం', nameHI: 'बासमती चावल', price: 120, unit: 'kg', category: 'rice-grains', farmer_id: 3, organic: false, rating: 4.7, stock: 80, description: 'Long-grain aromatic Basmati rice. Perfect for biryanis and pulav.', image: 'https://images.unsplash.com/photo-1536304993881-460346143ae7?w=400' },
    { id: 12, name: 'Ragi (Finger Millet)', nameTE: 'రాగి', nameHI: 'रागी', price: 55, unit: 'kg', category: 'rice-grains', farmer_id: 3, organic: true, rating: 4.6, stock: 45, description: 'Nutritious finger millet, perfect for healthy rotis and porridge. High in calcium.', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400' },
    { id: 13, name: 'Jowar (Sorghum)', nameTE: 'జొన్న', nameHI: 'ज्वार', price: 50, unit: 'kg', category: 'rice-grains', farmer_id: 3, organic: true, rating: 4.5, stock: 55, description: 'Gluten-free sorghum grains. Traditional millet perfect for rotis.', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400' },
    { id: 14, name: 'Farm Fresh Milk', nameTE: 'తాజా పాలు', nameHI: 'ताज़ा दूध', price: 60, unit: 'litre', category: 'dairy', farmer_id: 2, organic: true, rating: 4.9, stock: 30, description: 'Pure cow milk, delivered fresh from the farm within hours of milking. No added water or preservatives.', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400' },
    { id: 15, name: 'Desi Ghee', nameTE: 'నెయ్యి', nameHI: 'देसी घी', price: 650, unit: 'kg', category: 'dairy', farmer_id: 2, organic: true, rating: 4.9, stock: 15, description: 'Pure desi cow ghee, made from farm-fresh milk using traditional bilona method.', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400' },
    { id: 16, name: 'Fresh Paneer', nameTE: 'తాజా పనీర్', nameHI: 'ताज़ा पनीर', price: 280, unit: 'kg', category: 'dairy', farmer_id: 2, organic: false, rating: 4.7, stock: 20, description: 'Soft and fresh paneer made from pure cow milk. No preservatives added.', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400' },
    { id: 17, name: 'Turmeric Powder', nameTE: 'పసుపు పొడి', nameHI: 'हल्दी पाउडर', price: 200, unit: 'kg', category: 'spices', farmer_id: 5, organic: true, rating: 4.8, stock: 40, description: 'Fresh turmeric powder from Nizamabad. High curcumin content, hand-ground.', image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400' },
    { id: 18, name: 'Red Chilli Powder', nameTE: 'ఎర్ర మిర్చి పొడి', nameHI: 'लाल मिर्च पाउडर', price: 250, unit: 'kg', category: 'spices', farmer_id: 5, organic: false, rating: 4.7, stock: 35, description: 'Guntur red chilli powder. Vibrant red color with perfect heat level.', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400' },
    { id: 19, name: 'Cumin Seeds', nameTE: 'జీలకర్ర', nameHI: 'जीरा', price: 350, unit: 'kg', category: 'spices', farmer_id: 5, organic: true, rating: 4.6, stock: 25, description: 'Premium quality cumin seeds. Aromatic and full-flavored for authentic Indian cooking.', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400' },
    { id: 20, name: 'Coriander Powder', nameTE: 'ధనియాల పొడి', nameHI: 'धनिया पाउडर', price: 180, unit: 'kg', category: 'spices', farmer_id: 5, organic: false, rating: 4.5, stock: 30, description: 'Freshly ground coriander powder. Essential for every Indian kitchen.', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400' },
    { id: 21, name: 'Toor Dal', nameTE: 'కందిపప్పు', nameHI: 'तूर दाल', price: 130, unit: 'kg', category: 'pulses', farmer_id: 4, organic: true, rating: 4.8, stock: 60, description: 'Premium toor dal, unpolished and chemical-free. Cooks soft and tastes delicious.', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400' },
    { id: 22, name: 'Moong Dal', nameTE: 'పెసరపప్పు', nameHI: 'मूंग दाल', price: 120, unit: 'kg', category: 'pulses', farmer_id: 4, organic: true, rating: 4.7, stock: 50, description: 'Split moong dal, organically grown. Easy to digest and perfect for everyday cooking.', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400' },
    { id: 23, name: 'Chana Dal', nameTE: 'శనగపప్పు', nameHI: 'चना दाल', price: 110, unit: 'kg', category: 'pulses', farmer_id: 4, organic: false, rating: 4.6, stock: 45, description: 'Split bengal gram, protein-rich and versatile. Great for dal and snacks.', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400' },
    { id: 24, name: 'Urad Dal', nameTE: 'మినపప్పు', nameHI: 'उड़द दाल', price: 140, unit: 'kg', category: 'pulses', farmer_id: 4, organic: true, rating: 4.7, stock: 40, description: 'Black gram dal, essential for South Indian cooking. Makes perfect idli and dosa batter.', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400' },
    { id: 25, name: 'Fresh Potatoes', nameTE: 'బంగాళాదుంపలు', nameHI: 'आलू', price: 30, unit: 'kg', category: 'vegetables', farmer_id: 1, organic: false, rating: 4.5, stock: 80, description: 'Clean and fresh potatoes, hand-picked from the farm. Perfect for any dish.', image: 'https://images.unsplash.com/photo-1518977676601-b53f82ber40a?w=400' },
    { id: 26, name: 'Fresh Onions', nameTE: 'ఉల్లిపాయలు', nameHI: 'प्याज', price: 35, unit: 'kg', category: 'vegetables', farmer_id: 5, organic: false, rating: 4.4, stock: 90, description: 'Crisp red onions from Nizamabad. Staple ingredient for every kitchen.', image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400' },
    { id: 27, name: 'Drumstick', nameTE: 'మునగకాయ', nameHI: 'सहजन', price: 50, unit: 'kg', category: 'vegetables', farmer_id: 1, organic: true, rating: 4.6, stock: 25, description: 'Fresh drumsticks (moringa), organic and nutrient dense. Perfect for sambar.', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400' },
    { id: 28, name: 'Fresh Curd', nameTE: 'తాజా పెరుగు', nameHI: 'ताज़ा दही', price: 50, unit: 'litre', category: 'dairy', farmer_id: 2, organic: false, rating: 4.6, stock: 25, description: 'Thick and creamy curd made from farm-fresh cow milk. Set traditionally.', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400' },
  ];

  // ──── HELPERS ────
  function ls(key) { try { return JSON.parse(localStorage.getItem('rb_' + key)); } catch { return null; } }
  function lsSet(key, val) { localStorage.setItem('rb_' + key, JSON.stringify(val)); }

  // ──── PRODUCTS MODULE (with live stock tracking) ────
  const products = {
    _getCustom() { return ls('custom_products') || []; },
    _setCustom(arr) { lsSet('custom_products', arr); },
    _getStockMap() { return ls('stock_overrides') || {}; },
    _setStockMap(map) { lsSet('stock_overrides', map); },
    getAll() { return [...SAMPLE_PRODUCTS, ...this._getCustom()]; },
    getById(id) { return this.getAll().find(p => p.id === id); },
    getByFarmer(farmerId) { return this.getAll().filter(p => p.farmer_id === farmerId); },
    getByCategory(catId) { return this.getAll().filter(p => p.category === catId); },
    getOrganic() { return this.getAll().filter(p => p.organic); },
    search(q) {
      const lower = q.toLowerCase();
      return this.getAll().filter(p =>
        p.name.toLowerCase().includes(lower) ||
        (p.nameTE && p.nameTE.includes(q)) ||
        (p.nameHI && p.nameHI.includes(q)) ||
        p.category.includes(lower)
      );
    },
    getStock(id) {
      const map = this._getStockMap();
      if (map[id] !== undefined) return map[id];
      const p = this.getById(id);
      return p ? p.stock : 0;
    },
    updateStock(id, qtyChange) {
      const map = this._getStockMap();
      const current = this.getStock(id);
      map[id] = Math.max(0, current + qtyChange);
      this._setStockMap(map);
      return map[id];
    },
    isInStock(id) { return this.getStock(id) > 0; },
    addFarmerProduct(data) {
      const custom = this._getCustom();
      const maxId = Math.max(...this.getAll().map(p => p.id), 100);
      const product = { ...data, id: maxId + 1, createdAt: new Date().toISOString() };
      custom.push(product);
      this._setCustom(custom);
      return product;
    },
    deleteFarmerProduct(id) {
      const custom = this._getCustom().filter(p => p.id !== id);
      this._setCustom(custom);
    }
  };

  // ──── FARMERS MODULE ────
  const farmers = {
    _getRegistered() { return ls('registered_farmers') || []; },
    _setRegistered(arr) { lsSet('registered_farmers', arr); },
    getAll() { return [...SAMPLE_FARMERS, ...this._getRegistered()]; },
    getById(id) { return this.getAll().find(f => f.id === id); },
    register(data) {
      const reg = this._getRegistered();
      const maxId = Math.max(...this.getAll().map(f => f.id), 100);
      const farmer = {
        ...data, id: maxId + 1, rating: 0, reviews: 0, certified: false,
        joined: new Date().toISOString().split('T')[0],
        image: 'https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/3fc515ad-cadf-4245-c722-5efeea61c500/public'
      };
      reg.push(farmer);
      this._setRegistered(reg);
      return farmer;
    }
  };

  // ──── CART MODULE ────
  const cart = {
    _get() { return ls('cart') || []; },
    _set(items) { lsSet('cart', items); ui.updateCartBadge(); },
    getItems() { return this._get(); },
    addItem(productId, qty = 1) {
      const items = this._get();
      const existing = items.find(i => i.productId === productId);
      if (existing) { existing.qty += qty; }
      else { items.push({ productId, qty }); }
      this._set(items);
    },
    removeItem(productId) {
      this._set(this._get().filter(i => i.productId !== productId));
    },
    updateQty(productId, qty) {
      const items = this._get();
      const item = items.find(i => i.productId === productId);
      if (item) { item.qty = Math.max(1, qty); }
      this._set(items);
    },
    getTotal() {
      return this._get().reduce((sum, item) => {
        const p = products.getById(item.productId);
        return sum + (p ? p.price * item.qty : 0);
      }, 0);
    },
    getDeliveryFee() { return this.getTotal() >= 300 ? 0 : 30; },
    getGrandTotal() { return this.getTotal() + this.getDeliveryFee(); },
    getCount() { return this._get().reduce((sum, i) => sum + i.qty, 0); },
    clear() { this._set([]); }
  };

  // ──── ORDERS MODULE ────
  const orders = {
    _get() { return ls('orders') || []; },
    _set(arr) { lsSet('orders', arr); },
    place(data) {
      // Deduct stock for each item
      for (const item of (data.items || [])) {
        products.updateStock(item.productId, -item.qty);
      }
      const all = this._get();
      const order = {
        ...data,
        id: 'RB-' + Date.now().toString(36).toUpperCase(),
        status: 'placed',
        createdAt: new Date().toISOString(),
        timeline: [{ status: 'placed', label: 'Order Placed', time: new Date().toISOString() }]
      };
      all.push(order);
      this._set(all);
      cart.clear();
      return order;
    },
    getAll() { return this._get(); },
    getById(id) { return this._get().find(o => o.id === id); },
    getByFarmer(farmerId) {
      return this._get().filter(o =>
        o.items && o.items.some(i => {
          const p = products.getById(i.productId);
          return p && p.farmer_id === farmerId;
        })
      );
    },
    getByCustomer(customerId) { return this._get().filter(o => o.customerId === customerId); },
    getByCustomerName(name) { return this._get().filter(o => o.customerName === name); },
    updateStatus(orderId, newStatus, label) {
      const all = this._get();
      const order = all.find(o => o.id === orderId);
      if (order) {
        order.status = newStatus;
        if (!order.timeline) order.timeline = [];
        order.timeline.push({ status: newStatus, label: label || newStatus, time: new Date().toISOString() });
        this._set(all);
      }
    },
    seedIfEmpty() {
      if (this._get().length > 0) return;
      const now = Date.now();
      const day = 86400000;
      const demoOrders = [
        {
          id: 'RB-D001', customerId: 'demo_cust', customerName: 'Demo Customer', customerPhone: '+91 90000 12345', address: '12-5-31, Banjara Hills, Hyderabad, 500034', paymentMethod: 'UPI', status: 'delivered',
          items: [{ productId: 1, qty: 2 }, { productId: 2, qty: 1 }, { productId: 14, qty: 2 }], total: 210, deliveryFee: 0,
          createdAt: new Date(now - 12 * day).toISOString(),
          timeline: [
            { status: 'placed', label: 'Order Placed', time: new Date(now - 12 * day).toISOString() },
            { status: 'confirmed', label: 'Order Confirmed', time: new Date(now - 12 * day + 3600000).toISOString() },
            { status: 'harvesting', label: 'Harvesting Fresh', time: new Date(now - 11 * day).toISOString() },
            { status: 'dispatched', label: 'Out for Delivery', time: new Date(now - 11 * day + 14400000).toISOString() },
            { status: 'delivered', label: 'Delivered', time: new Date(now - 11 * day + 28800000).toISOString() }
          ]
        },
        {
          id: 'RB-D002', customerId: 'demo_cust', customerName: 'Demo Customer', customerPhone: '+91 90000 12345', address: '12-5-31, Banjara Hills, Hyderabad, 500034', paymentMethod: 'COD', status: 'delivered',
          items: [{ productId: 6, qty: 2 }, { productId: 10, qty: 5 }, { productId: 15, qty: 1 }], total: 1675, deliveryFee: 0,
          createdAt: new Date(now - 8 * day).toISOString(),
          timeline: [
            { status: 'placed', label: 'Order Placed', time: new Date(now - 8 * day).toISOString() },
            { status: 'confirmed', label: 'Order Confirmed', time: new Date(now - 8 * day + 7200000).toISOString() },
            { status: 'harvesting', label: 'Harvesting Fresh', time: new Date(now - 7 * day).toISOString() },
            { status: 'dispatched', label: 'Out for Delivery', time: new Date(now - 7 * day + 18000000).toISOString() },
            { status: 'delivered', label: 'Delivered', time: new Date(now - 6 * day).toISOString() }
          ]
        },
        {
          id: 'RB-D003', customerId: 'demo_cust', customerName: 'Demo Customer', customerPhone: '+91 90000 12345', address: '12-5-31, Banjara Hills, Hyderabad, 500034', paymentMethod: 'UPI', status: 'dispatched',
          items: [{ productId: 17, qty: 1 }, { productId: 21, qty: 2 }, { productId: 3, qty: 1 }], total: 520, deliveryFee: 0,
          createdAt: new Date(now - 2 * day).toISOString(),
          timeline: [
            { status: 'placed', label: 'Order Placed', time: new Date(now - 2 * day).toISOString() },
            { status: 'confirmed', label: 'Order Confirmed', time: new Date(now - 2 * day + 3600000).toISOString() },
            { status: 'harvesting', label: 'Harvesting Fresh', time: new Date(now - 1 * day).toISOString() },
            { status: 'dispatched', label: 'Out for Delivery', time: new Date(now - 3600000).toISOString() }
          ]
        },
        {
          id: 'RB-D004', customerId: 'demo_cust', customerName: 'Demo Customer', customerPhone: '+91 90000 12345', address: '12-5-31, Banjara Hills, Hyderabad, 500034', paymentMethod: 'Card', status: 'confirmed',
          items: [{ productId: 8, qty: 2 }, { productId: 7, qty: 3 }, { productId: 28, qty: 2 }], total: 460, deliveryFee: 0,
          createdAt: new Date(now - 6 * 3600000).toISOString(),
          timeline: [
            { status: 'placed', label: 'Order Placed', time: new Date(now - 6 * 3600000).toISOString() },
            { status: 'confirmed', label: 'Order Confirmed', time: new Date(now - 3 * 3600000).toISOString() }
          ]
        },
        {
          id: 'RB-D005', customerId: 'cust_other', customerName: 'Ramesh Patel', customerPhone: '+91 91234 56789', address: '45, Jubilee Hills, Hyderabad', paymentMethod: 'UPI', status: 'delivered',
          items: [{ productId: 10, qty: 10 }, { productId: 12, qty: 3 }, { productId: 17, qty: 1 }], total: 1015, deliveryFee: 0,
          createdAt: new Date(now - 15 * day).toISOString(),
          timeline: [
            { status: 'placed', label: 'Order Placed', time: new Date(now - 15 * day).toISOString() },
            { status: 'confirmed', label: 'Order Confirmed', time: new Date(now - 15 * day + 3600000).toISOString() },
            { status: 'harvesting', label: 'Harvesting', time: new Date(now - 14 * day).toISOString() },
            { status: 'dispatched', label: 'Dispatched', time: new Date(now - 14 * day + 14400000).toISOString() },
            { status: 'delivered', label: 'Delivered', time: new Date(now - 13 * day).toISOString() }
          ]
        },
        {
          id: 'RB-D006', customerId: 'cust_other2', customerName: 'Suresh Yadav', customerPhone: '+91 98888 77777', address: '99, KPHB Colony, Hyderabad', paymentMethod: 'COD', status: 'delivered',
          items: [{ productId: 1, qty: 3 }, { productId: 5, qty: 2 }, { productId: 26, qty: 3 }], total: 320, deliveryFee: 0,
          createdAt: new Date(now - 10 * day).toISOString(),
          timeline: [
            { status: 'placed', label: 'Order Placed', time: new Date(now - 10 * day).toISOString() },
            { status: 'confirmed', label: 'Confirmed', time: new Date(now - 10 * day + 3600000).toISOString() },
            { status: 'harvesting', label: 'Harvesting', time: new Date(now - 9 * day).toISOString() },
            { status: 'dispatched', label: 'Dispatched', time: new Date(now - 9 * day + 7200000).toISOString() },
            { status: 'delivered', label: 'Delivered', time: new Date(now - 8 * day).toISOString() }
          ]
        }
      ];
      this._set(demoOrders);
    }
  };
  // Seed demo orders on first load
  orders.seedIfEmpty();

  // ──── AUTH MODULE ────
  const auth = {
    getCurrentUser() { return ls('current_user'); },
    loginFarmer(phone) {
      const farmer = farmers.getAll().find(f => f.phone === phone);
      if (farmer) {
        const user = { ...farmer, type: 'farmer' };
        lsSet('current_user', user);
        return user;
      }
      return null;
    },
    registerFarmer(data) {
      const farmer = farmers.register(data);
      const user = { ...farmer, type: 'farmer' };
      lsSet('current_user', user);
      return user;
    },
    loginCustomer(data) {
      const user = { ...data, type: 'customer', id: 'cust_' + Date.now() };
      lsSet('current_user', user);
      return user;
    },
    logout() { localStorage.removeItem('rb_current_user'); },
    isLoggedIn() { return !!this.getCurrentUser(); }
  };

  // ──── UI MODULE ────
  const ui = {
    getHeaderHTML(activePage) {
      const cartCount = cart.getCount();
      const user = auth.getCurrentUser();
      let dashLink = 'customer-dashboard.htm';
      let dashLabel = '👤 My Account';
      if (user) {
        if (user.type === 'farmer') { dashLink = 'farmer-dashboard.htm'; dashLabel = '👨‍🌾 Farmer Dashboard'; }
        else if (user.type === 'captain') { dashLink = 'captain-dashboard.htm'; dashLabel = '👥 Captain Dashboard'; }
        else if (user.type === 'admin') { dashLink = 'admin-dashboard.htm'; dashLabel = '📊 Admin Dashboard'; }
      }

      const pages = [
        { id: 'shop', label: 'Shop', href: 'shop.htm' },
        { id: 'how-it-works', label: 'How It Works', href: 'how-it-works.htm' },
        { id: 'farmers', label: 'Farmers', href: 'farmers-directory.htm' },
        { id: 'for-farmers', label: 'For Farmers', href: 'for-farmers.htm' },
        { id: 'about', label: 'About Us', href: 'about.htm' },
      ];
      const navLinks = pages.map(p =>
        `<a href="${p.href}" class="text-white hover:text-gold font-medium ${activePage === p.id ? 'text-gold' : ''}">${p.label}</a>`
      ).join('');
      const mobileLinks = pages.map(p =>
        `<a href="${p.href}" class="block text-white py-2 border-b border-forest-light">${p.label}</a>`
      ).join('');

      return `<header class="bg-forest sticky top-0 z-50 shadow-lg">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-20">
      <a href="index.htm" class="flex items-center gap-2">
        <span class="text-3xl sm:text-4xl">🌾</span>
        <div class="leading-tight">
          <span class="text-lg sm:text-xl font-extrabold text-white tracking-tight">Raithu Bazaar</span>
          <span class="block text-[10px] text-gold font-medium">రైతు బజార్ • Fresh from Farm</span>
        </div>
      </a>
      <div class="hidden lg:flex flex-1 max-w-md mx-8">
        <form action="shop.htm" method="GET" class="w-full relative" id="headerSearchForm">
          <input type="text" name="q" id="headerSearchInput" placeholder="Search produce, farmers... 🎙️" class="w-full pl-12 pr-12 py-3 rounded-full bg-white/10 border border-forest-light text-white placeholder-gray-300 focus:outline-none focus:bg-white focus:text-forest transition-all">
          <button type="submit" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </button>
          <button type="button" id="voiceMicBtn" onclick="startVoiceSearch()" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gold transition-colors" title="Voice Search">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5zm6 6c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>
          </button>
        </form>
      </div>
      <nav class="hidden lg:flex items-center space-x-6">${navLinks}</nav>
      <div class="hidden lg:flex items-center space-x-4">
        <div class="flex items-center gap-1 mr-2">
          <button data-lang-btn="en" onclick="if(typeof RaithuLang!=='undefined')RaithuLang.setLang('en')" class="px-2.5 py-1 rounded-full text-xs font-bold bg-gold text-forest">EN</button>
          <button data-lang-btn="te" onclick="if(typeof RaithuLang!=='undefined')RaithuLang.setLang('te')" class="px-2.5 py-1 rounded-full text-xs font-bold text-white bg-white/20 hover:bg-white/30">తె</button>
          <button data-lang-btn="hi" onclick="if(typeof RaithuLang!=='undefined')RaithuLang.setLang('hi')" class="px-2.5 py-1 rounded-full text-xs font-bold text-white bg-white/20 hover:bg-white/30">हि</button>
        </div>
        <a href="${dashLink}" class="relative p-2 text-white hover:text-gold" title="${dashLabel}">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
        </a>
        <a href="notifications.htm" class="relative p-2 text-white hover:text-gold" title="Notifications">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405C18.21 14.21 18 13.702 18 13.172V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v2.172c0 .53-.21 1.038-.595 1.423L4 16h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
          <span data-notif-count class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[9px] font-bold rounded-full items-center justify-center hidden">0</span>
        </a>
        <a href="cart.htm" class="relative p-2 text-white hover:text-gold">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
          <span data-cart-count class="absolute -top-1 -right-1 w-5 h-5 bg-gold text-forest text-xs font-bold rounded-full flex items-center justify-center">${cartCount}</span>
        </a>
        <a href="shop.htm" class="px-4 py-2 bg-gold text-forest text-sm font-bold rounded-full hover:bg-gold-dark hover:text-white transition-all">Shop 🛒</a>
      </div>
      <button class="lg:hidden text-white p-2" onclick="document.querySelector('[data-mobile-menu]').classList.toggle('hidden')">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
    </div>
  </div>
  <div class="lg:hidden hidden bg-forest border-t border-forest-light" data-mobile-menu>
    <div class="px-4 py-4 space-y-3">
      <div class="flex gap-2 mb-3">
        <button data-lang-btn="en" onclick="if(typeof RaithuLang!=='undefined')RaithuLang.setLang('en')" class="px-3 py-1.5 rounded-full text-xs font-bold bg-gold text-forest">English</button>
        <button data-lang-btn="te" onclick="if(typeof RaithuLang!=='undefined')RaithuLang.setLang('te')" class="px-3 py-1.5 rounded-full text-xs font-bold text-white bg-white/20">తెలుగు</button>
        <button data-lang-btn="hi" onclick="if(typeof RaithuLang!=='undefined')RaithuLang.setLang('hi')" class="px-3 py-1.5 rounded-full text-xs font-bold text-white bg-white/20">हिंदी</button>
      </div>
      ${mobileLinks}
      <a href="${dashLink}" class="block text-white py-2 border-b border-forest-light">${dashLabel}</a>
      <a href="cart.htm" class="block text-white py-2">🛒 Cart (${cartCount})</a>
      <a href="shop.htm" class="block w-full text-center mt-4 px-6 py-3 bg-gold text-forest font-semibold rounded-lg">Start Shopping Fresh</a>
    </div>
  </div>
</header>`;
    },

    getFooterHTML() {
      return `<footer class="bg-forest text-white pt-16 pb-8">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
      <div>
        <div class="flex items-center gap-3 mb-4">
          <span class="text-4xl">🌾</span>
          <div><span class="text-xl font-extrabold text-white">Raithu Bazaar</span><span class="block text-xs text-gold">రైతు బజార్ • Fresh from Farm</span></div>
        </div>
        <p class="text-gray-300 text-sm mb-4">India's trusted farm-to-customer marketplace. From Farm. For You. | పొలం నుండి. మీ కోసం.</p>
        <div class="flex gap-3">
          <a href="#" class="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-gold transition-all"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
          <a href="#" class="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-gold transition-all"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a>
          <a href="#" class="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-gold transition-all"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg></a>
          <a href="#" class="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-gold transition-all"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 3.993L9 16z"/></svg></a>
        </div>
      </div>
      <div>
        <h4 class="font-bold text-lg mb-4 text-gold">Company</h4>
        <ul class="space-y-3 text-gray-300 text-sm">
          <li><a href="about.htm" class="hover:text-gold transition-colors">About Us</a></li>
          <li><a href="how-it-works.htm" class="hover:text-gold transition-colors">How It Works</a></li>
          <li><a href="blog.htm" class="hover:text-gold transition-colors">Blog</a></li>
          <li><a href="careers.htm" class="hover:text-gold transition-colors">Careers</a></li>
          <li><a href="contact.htm" class="hover:text-gold transition-colors">Contact</a></li>
        </ul>
      </div>
      <div>
        <h4 class="font-bold text-lg mb-4 text-gold">For Farmers</h4>
        <ul class="space-y-3 text-gray-300 text-sm">
          <li><a href="farmer-register.htm" class="hover:text-gold transition-colors">Register as Farmer</a></li>
          <li><a href="farmer-dashboard.htm" class="hover:text-gold transition-colors">Farmer Dashboard</a></li>
          <li><a href="pricing.htm" class="hover:text-gold transition-colors">Pricing & Fees</a></li>
          <li><a href="success-stories.htm" class="hover:text-gold transition-colors">Success Stories</a></li>
          <li><a href="farmer-community.htm" class="hover:text-gold transition-colors">Community</a></li>
        </ul>
      </div>
      <div>
        <h4 class="font-bold text-lg mb-4 text-gold">For Customers</h4>
        <ul class="space-y-3 text-gray-300 text-sm">
          <li><a href="shop.htm" class="hover:text-gold transition-colors">Shop Produce</a></li>
          <li><a href="subscriptions.htm" class="hover:text-gold transition-colors">Subscription Boxes</a></li>
          <li><a href="organic.htm" class="hover:text-gold transition-colors">Organic Collection</a></li>
          <li><a href="faq.htm" class="hover:text-gold transition-colors">FAQs</a></li>
          <li><a href="delivery.htm" class="hover:text-gold transition-colors">Delivery Info</a></li>
        </ul>
      </div>
    </div>
    <div class="border-t border-white/10 pt-8">
      <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-gray-400 text-sm">© 2026 Raithu Bazaar (రైతు బజార్). All rights reserved.</p>
        <div class="flex gap-6 text-gray-400 text-sm">
          <a href="privacy.htm" class="hover:text-gold transition-colors">Privacy Policy</a>
          <a href="terms.htm" class="hover:text-gold transition-colors">Terms of Service</a>
          <a href="refunds.htm" class="hover:text-gold transition-colors">Refund Policy</a>
        </div>
        <p class="text-gray-400 text-sm">🇮🇳 Made with ❤️ in Hyderabad</p>
      </div>
    </div>
  </div>
</footer>
<a href="https://wa.me/919876543210?text=Hi%20Raithu%20Bazaar!%20I%20need%20help." target="_blank" title="Chat on WhatsApp" style="position:fixed;bottom:24px;right:24px;z-index:100;width:56px;height:56px;background:#25D366;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(0,0,0,0.2);transition:transform 0.3s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'"><svg width="28" height="28" fill="white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></a>`;
    },

    initPage() {
      this.updateCartBadge();
      this.updateNotifBadge();
    },

    updateNotifBadge() {
      const count = notifs.getUnreadCount();
      document.querySelectorAll('[data-notif-count]').forEach(el => {
        el.textContent = count > 9 ? '9+' : count;
        el.style.display = count > 0 ? 'flex' : 'none';
      });
    },

    updateCartBadge() {
      const count = cart.getCount();
      document.querySelectorAll('[data-cart-count]').forEach(el => { el.textContent = count; });
    },

    showToast(msg, duration = 3000) {
      let toast = document.getElementById('rb-toast');
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'rb-toast';
        toast.style.cssText = 'position:fixed;bottom:30px;left:50%;transform:translateX(-50%) translateY(100px);background:#0f4023;color:white;padding:14px 28px;border-radius:16px;font-size:14px;font-weight:600;z-index:9999;transition:transform 0.4s cubic-bezier(0.34,1.56,0.64,1);box-shadow:0 10px 40px rgba(0,0,0,0.2);';
        document.body.appendChild(toast);
      }
      toast.textContent = msg;
      requestAnimationFrame(() => { toast.style.transform = 'translateX(-50%) translateY(0)'; });
      clearTimeout(toast._timer);
      toast._timer = setTimeout(() => { toast.style.transform = 'translateX(-50%) translateY(100px)'; }, duration);
    }
  };

  // ──── DELIVERY ZONES ────
  const DELIVERY_ZONES = [
    { id: 'hyd-central', name: 'Hyderabad Central', nameTE: 'హైదరాబాద్ సెంట్రల్', days: [1, 3, 5, 6], cutoffHour: 20, fee: 0, minOrder: 299 },
    { id: 'hyd-outer', name: 'Hyderabad Outer Ring', nameTE: 'హైదరాబాద్ ఔటర్ రింగ్', days: [2, 4, 6], cutoffHour: 18, fee: 30, minOrder: 199 },
    { id: 'warangal', name: 'Warangal Cluster', nameTE: 'వరంగల్', days: [2, 5], cutoffHour: 12, fee: 50, minOrder: 499 },
    { id: 'karimnagar', name: 'Karimnagar Cluster', nameTE: 'కరీంనగర్', days: [3, 6], cutoffHour: 12, fee: 50, minOrder: 499 },
    { id: 'nalgonda', name: 'Nalgonda Cluster', nameTE: 'నల్గొండ', days: [2, 5], cutoffHour: 12, fee: 50, minOrder: 499 },
    { id: 'medak', name: 'Medak / Nizamabad', nameTE: 'మెదక్ / నిజామాబాద్', days: [3, 6], cutoffHour: 12, fee: 60, minOrder: 599 },
  ];
  const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const DAY_NAMES_FULL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // ──── LOGISTICS MODULE ────
  const logistics = {
    getZones() { return DELIVERY_ZONES; },
    getZone(id) { return DELIVERY_ZONES.find(z => z.id === id); },
    getZoneByPin(pin) {
      const p = parseInt(pin);
      if (p >= 500001 && p <= 500100) return DELIVERY_ZONES[0]; // Hyd central
      if (p >= 500101 && p <= 500999) return DELIVERY_ZONES[1]; // Hyd outer
      if (p >= 506001 && p <= 506999) return DELIVERY_ZONES[2]; // Warangal
      if (p >= 505001 && p <= 505999) return DELIVERY_ZONES[3]; // Karimnagar
      if (p >= 508001 && p <= 508999) return DELIVERY_ZONES[4]; // Nalgonda
      if (p >= 502001 && p <= 503999) return DELIVERY_ZONES[5]; // Medak/Nizamabad
      return DELIVERY_ZONES[1]; // default
    },
    getNextDelivery(zoneId) {
      const zone = this.getZone(zoneId);
      if (!zone) return null;
      const now = new Date();
      const today = now.getDay();
      const hour = now.getHours();
      for (let offset = 0; offset < 7; offset++) {
        const checkDay = (today + offset) % 7;
        if (zone.days.includes(checkDay)) {
          if (offset === 0 && hour >= zone.cutoffHour) continue; // past cutoff
          const delivery = new Date(now);
          delivery.setDate(now.getDate() + offset);
          delivery.setHours(8, 0, 0, 0);
          return { date: delivery, dayName: DAY_NAMES_FULL[checkDay], zone };
        }
      }
      // Wrap around
      const firstDay = zone.days[0];
      const d = new Date(now);
      d.setDate(now.getDate() + ((firstDay - today + 7) % 7) + 7);
      return { date: d, dayName: DAY_NAMES_FULL[firstDay], zone };
    },
    getDeliveryDays(zoneId) {
      const zone = this.getZone(zoneId);
      return zone ? zone.days.map(d => DAY_NAMES[d]).join(', ') : 'N/A';
    },
    getOrdersForZone(zoneId) {
      return orders.getAll().filter(o => o.deliveryZone === zoneId && o.status !== 'delivered' && o.status !== 'cancelled');
    },
    getPendingClusters() {
      return DELIVERY_ZONES.map(z => ({
        zone: z,
        orders: this.getOrdersForZone(z.id),
        next: this.getNextDelivery(z.id)
      })).filter(c => c.orders.length > 0);
    }
  };

  // ──── VOICE MODULE (Web Speech API) ────
  const voice = {
    isSupported() { return ('webkitSpeechRecognition' in window) || ('SpeechRecognition' in window); },
    LANG_MAP: { en: 'en-IN', te: 'te-IN', hi: 'hi-IN' },
    listen(lang, callback, onEnd) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) { callback(''); return null; }
      const recog = new SpeechRecognition();
      recog.lang = this.LANG_MAP[lang] || 'en-IN';
      recog.interimResults = false;
      recog.maxAlternatives = 1;
      recog.onresult = (e) => { callback(e.results[0][0].transcript); };
      recog.onerror = () => { if (onEnd) onEnd(); };
      recog.onend = () => { if (onEnd) onEnd(); };
      recog.start();
      return recog;
    }
  };

  // ──── TRUST VERIFICATION MODULE ────
  const trust = {
    TIERS: [
      { id: 'self-declared', label: 'Self-Declared', labelTE: 'స్వయం ప్రకటన', icon: '⚪', color: 'bg-gray-100 text-gray-600' },
      { id: 'photo-verified', label: 'Photo Verified', labelTE: 'ఫోటో ధృవీకరించబడింది', icon: '🟡', color: 'bg-yellow-100 text-yellow-700' },
      { id: 'certified-organic', label: 'Certified Organic', labelTE: 'సర్టిఫైడ్ ఆర్గానిక్', icon: '🟢', color: 'bg-green-100 text-green-700' },
    ],
    _getData() { return ls('trust_data') || {}; },
    _setData(d) { lsSet('trust_data', d); },
    getTier(farmerId) {
      const data = this._getData();
      return data[farmerId]?.tier || 'self-declared';
    },
    getTierInfo(farmerId) {
      const tierId = this.getTier(farmerId);
      return this.TIERS.find(t => t.id === tierId) || this.TIERS[0];
    },
    getPhotos(farmerId) {
      const data = this._getData();
      return data[farmerId]?.photos || [];
    },
    submitPhoto(farmerId, photoDataUrl, label) {
      const data = this._getData();
      if (!data[farmerId]) data[farmerId] = { tier: 'self-declared', photos: [] };
      data[farmerId].photos.push({ url: photoDataUrl, label, date: new Date().toISOString() });
      // Auto-upgrade to photo-verified after 3 photos
      if (data[farmerId].photos.length >= 3 && data[farmerId].tier === 'self-declared') {
        data[farmerId].tier = 'photo-verified';
      }
      this._setData(data);
    },
    setTier(farmerId, tier) {
      const data = this._getData();
      if (!data[farmerId]) data[farmerId] = { tier: 'self-declared', photos: [] };
      data[farmerId].tier = tier;
      this._setData(data);
    }
  };

  // ──── CAPTAINS MODULE ────
  const captains = {
    _get() { return ls('captains') || []; },
    _set(arr) { lsSet('captains', arr); },
    register(data) {
      const all = this._get();
      const captain = { ...data, id: 'CAP-' + Date.now(), earnings: 0, deliveries: 0, createdAt: new Date().toISOString() };
      all.push(captain);
      this._set(all);
      return captain;
    },
    getAll() { return this._get(); },
    getByPin(pin) { return this._get().filter(c => c.pincode === pin); },
    getById(id) { return this._get().find(c => c.id === id); },
    addEarnings(id, amount) {
      const all = this._get();
      const cap = all.find(c => c.id === id);
      if (cap) { cap.earnings += amount; cap.deliveries++; }
      this._set(all);
    },
    loginCaptain(phone) {
      const cap = this._get().find(c => c.phone === phone);
      if (cap) { lsSet('current_user', { ...cap, type: 'captain' }); }
      return cap;
    }
  };

  // ──── QUALITY MODULE ────
  const quality = {
    _get() { return ls('quality_checks') || {}; },
    _set(d) { lsSet('quality_checks', d); },
    submitCheck(orderId, data) {
      const all = this._get();
      all[orderId] = { ...data, timestamp: new Date().toISOString() };
      this._set(all);
    },
    getCheck(orderId) { return this._get()[orderId] || null; },
    submitRating(orderId, rating) {
      const all = this._get();
      if (!all[orderId]) all[orderId] = {};
      all[orderId].customerRating = rating;
      this._set(all);
    }
  };

  // ──── ADMIN MODULE ────
  const admin = {
    PASSWORD: 'raithu2026',
    getStats() {
      const allOrders = orders.getAll();
      const delivered = allOrders.filter(o => o.status === 'delivered');
      const gmv = allOrders.reduce((s, o) => s + (o.total || 0), 0);
      const revenue = delivered.reduce((s, o) => s + Math.round((o.total || 0) * 0.07), 0);
      const pendingRevenue = allOrders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled').reduce((s, o) => s + Math.round((o.total || 0) * 0.07), 0);
      const allFarmers = farmers.getAll();
      const allCaptains = captains.getAll();
      const zones = DELIVERY_ZONES.map(z => ({ zone: z.name, orders: allOrders.filter(o => o.deliveryZone === z.id).length }));
      const topProducts = {};
      allOrders.forEach(o => (o.items || []).forEach(i => { topProducts[i.productId] = (topProducts[i.productId] || 0) + i.qty; }));
      const topProductList = Object.entries(topProducts).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([id, qty]) => ({ product: products.getById(parseInt(id)), qty }));
      return {
        totalOrders: allOrders.length,
        deliveredOrders: delivered.length,
        gmv, revenue, pendingRevenue,
        activeFarmers: allFarmers.length,
        activeCaptains: allCaptains.length,
        totalProducts: products.getAll().length,
        ordersByZone: zones,
        topProducts: topProductList,
        weeklyOrders: this._weeklyOrders(allOrders)
      };
    },
    _weeklyOrders(allOrders) {
      const weeks = {};
      allOrders.forEach(o => {
        const d = new Date(o.createdAt);
        const week = `${d.getFullYear()}-W${Math.ceil(d.getDate() / 7)}`;
        weeks[week] = (weeks[week] || 0) + 1;
      });
      return Object.entries(weeks).map(([w, c]) => ({ week: w, count: c }));
    }
  };

  // ──── WISHLIST MODULE ────
  const wishlist = {
    _get() { return ls('wishlist') || []; },
    _set(arr) { lsSet('wishlist', arr); },
    getItems() { return this._get(); },
    addItem(productId) {
      const items = this._get();
      if (!items.includes(productId)) { items.push(productId); this._set(items); }
    },
    removeItem(productId) { this._set(this._get().filter(id => id !== productId)); },
    toggleItem(productId) {
      if (this.isInWishlist(productId)) { this.removeItem(productId); return false; }
      else { this.addItem(productId); return true; }
    },
    isInWishlist(productId) { return this._get().includes(productId); },
    getCount() { return this._get().length; },
    getProducts() { return this._get().map(id => products.getById(id)).filter(Boolean); }
  };

  // ──── REVIEWS MODULE ────
  const reviews = {
    _get() { return ls('reviews') || []; },
    _set(arr) { lsSet('reviews', arr); },
    addReview(data) {
      const all = this._get();
      const review = {
        ...data,
        id: 'REV-' + Date.now(),
        createdAt: new Date().toISOString()
      };
      all.push(review);
      this._set(all);
      return review;
    },
    getByProduct(productId) { return this._get().filter(r => r.productId === productId); },
    getByFarmer(farmerId) {
      return this._get().filter(r => {
        const p = products.getById(r.productId);
        return p && p.farmer_id === farmerId;
      });
    },
    getByOrder(orderId) { return this._get().filter(r => r.orderId === orderId); },
    getAvgRating(productId) {
      const prodReviews = this.getByProduct(productId);
      if (prodReviews.length === 0) return null;
      return (prodReviews.reduce((s, r) => s + r.rating, 0) / prodReviews.length).toFixed(1);
    },
    hasReviewed(orderId, productId) {
      return this._get().some(r => r.orderId === orderId && r.productId === productId);
    }
  };

  // ──── NOTIFICATIONS MODULE ────
  const notifs = {
    _get() { return ls('notifications') || []; },
    _set(arr) { lsSet('notifications', arr); },
    add(type, title, message) {
      const all = this._get();
      all.unshift({
        id: 'N-' + Date.now(),
        type, title, message,
        read: false,
        createdAt: new Date().toISOString()
      });
      // Keep max 50 notifications
      if (all.length > 50) all.length = 50;
      this._set(all);
    },
    getAll() { return this._get(); },
    getUnread() { return this._get().filter(n => !n.read); },
    getUnreadCount() { return this.getUnread().length; },
    markRead(id) {
      const all = this._get();
      const n = all.find(x => x.id === id);
      if (n) { n.read = true; this._set(all); }
    },
    markAllRead() {
      const all = this._get();
      all.forEach(n => n.read = true);
      this._set(all);
    },
    clear() { this._set([]); }
  };

  // ──── COUPONS MODULE ────
  const coupons = {
    AVAILABLE: [
      { code: 'FRESH10', type: 'percent', value: 10, minOrder: 200, maxDiscount: 100, desc: '10% off on orders above ₹200 (max ₹100)' },
      { code: 'FIRST50', type: 'flat', value: 50, minOrder: 300, maxDiscount: 50, desc: '₹50 off on your first order above ₹300', firstOrderOnly: true },
      { code: 'ORGANIC15', type: 'percent', value: 15, minOrder: 500, maxDiscount: 200, desc: '15% off on orders above ₹500 (max ₹200)' },
      { code: 'RAITHU100', type: 'flat', value: 100, minOrder: 800, maxDiscount: 100, desc: '₹100 off on orders above ₹800' },
      { code: 'FREESHIP', type: 'freeShipping', value: 0, minOrder: 0, maxDiscount: 0, desc: 'Free delivery on any order' },
    ],
    getAll() { return this.AVAILABLE; },
    validate(code, cartTotal) {
      const coupon = this.AVAILABLE.find(c => c.code === code.toUpperCase().trim());
      if (!coupon) return { valid: false, error: 'Invalid coupon code' };
      if (cartTotal < coupon.minOrder) return { valid: false, error: `Minimum order ₹${coupon.minOrder} required` };
      if (coupon.firstOrderOnly && orders.getAll().length > 0) return { valid: false, error: 'This coupon is for first orders only' };
      return { valid: true, coupon };
    },
    apply(code, cartTotal) {
      const result = this.validate(code, cartTotal);
      if (!result.valid) return result;
      const coupon = result.coupon;
      let discount = 0;
      if (coupon.type === 'percent') discount = Math.min(Math.round(cartTotal * coupon.value / 100), coupon.maxDiscount);
      else if (coupon.type === 'flat') discount = coupon.value;
      else if (coupon.type === 'freeShipping') discount = 0; // handled by checkout
      return { valid: true, coupon, discount, freeShipping: coupon.type === 'freeShipping' };
    }
  };

  // ──── RECENTLY VIEWED MODULE ────
  const recentlyViewed = {
    _get() { return ls('recently_viewed') || []; },
    _set(arr) { lsSet('recently_viewed', arr); },
    add(productId) {
      let items = this._get().filter(id => id !== productId);
      items.unshift(productId);
      if (items.length > 10) items.length = 10;
      this._set(items);
    },
    getAll() { return this._get(); },
    getProducts() { return this._get().map(id => products.getById(id)).filter(Boolean); }
  };

  // Patch orders.place to trigger notification
  const _origPlaceOrder = orders.place.bind(orders);
  orders.place = function (data) {
    const order = _origPlaceOrder(data);
    notifs.add('order', 'Order Placed! 🎉', `Your order ${order.id} has been placed successfully. Fresh produce will be harvested soon!`);
    return order;
  };

  // ──── PUBLIC API ────
  return { CATEGORIES, DELIVERY_ZONES, products, farmers, cart, orders, auth, ui, logistics, voice, trust, captains, quality, admin, wishlist, reviews, notifs, coupons, recentlyViewed };
})();

// ──── GLOBAL VOICE SEARCH ────
function startVoiceSearch() {
  const btn = document.getElementById('voiceMicBtn');
  const input = document.getElementById('headerSearchInput');
  if (!RaithuBazaar.voice.isSupported()) {
    if (input) input.focus();
    RaithuBazaar.ui.showToast('Voice search not supported in this browser. Try Chrome!');
    return;
  }
  if (btn) btn.style.color = '#ef4444';
  RaithuBazaar.ui.showToast('🎙️ Listening... speak now');
  const lang = (typeof RaithuLang !== 'undefined' && RaithuLang.getLang) ? RaithuLang.getLang() : 'en';
  RaithuBazaar.voice.listen(lang, (text) => {
    if (text && input) {
      input.value = text;
      RaithuBazaar.ui.showToast('🔍 Searching: ' + text);
      setTimeout(() => { window.location.href = 'shop.htm?q=' + encodeURIComponent(text); }, 500);
    }
  }, () => {
    if (btn) btn.style.color = '';
  });
}
