import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiFilter, FiX, FiSearch, FiChevronDown } from 'react-icons/fi';
import ProductCard from '../components/ui/ProductCard';
import { products, categories, bikeModels } from '../data/products';
import './ShopPage.css';

const SORT_OPTIONS = [
  { value: 'default',   label: 'Default' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc',label: 'Price: High to Low' },
  { value: 'rating',    label: 'Top Rated' },
  { value: 'discount',  label: 'Biggest Discount' },
];

export default function ShopPage() {
  const [params, setParams] = useSearchParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Filter state (synced with URL params)
  const [activeCategory, setActiveCategory] = useState(params.get('cat') || 'all');
  const [activeModel,    setActiveModel]    = useState(params.get('model') || 'all');
  const [maxPrice,       setMaxPrice]        = useState(5000);
  const [sortBy,         setSortBy]          = useState('default');
  const [searchQuery,    setSearchQuery]      = useState(params.get('q') || '');

  useEffect(() => { document.title = 'Shop | Moto Hub'; }, []);

  // Sync URL → state
  useEffect(() => {
    const cat   = params.get('cat') || 'all';
    const model = params.get('model') || 'all';
    const q     = params.get('q')   || '';
    setActiveCategory(cat);
    setActiveModel(model);
    setSearchQuery(q);
  }, [params]);

  const filtered = useMemo(() => {
    let list = [...products];

    // Category
    if (activeCategory !== 'all') {
      list = list.filter((p) => p.category === activeCategory);
    }

    // Bike Model
    if (activeModel !== 'all') {
      list = list.filter((p) => p.models && p.models.includes(activeModel));
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortName.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Price
    list = list.filter((p) => p.price <= maxPrice);

    // Sort
    switch (sortBy) {
      case 'price-asc':  list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'rating':     list.sort((a, b) => b.rating - a.rating); break;
      case 'discount':   list.sort((a, b) => b.discount - a.discount); break;
      default: break;
    }
    return list;
  }, [activeCategory, activeModel, searchQuery, maxPrice, sortBy]);

  const updateParams = (updates) => {
    const newParams = new URLSearchParams(params);
    Object.entries(updates).forEach(([k, v]) => {
      if (v && v !== 'all') newParams.set(k, v);
      else newParams.delete(k);
    });
    setParams(newParams);
  };

  const handleCategory = (cat) => {
    setActiveCategory(cat);
    updateParams({ cat, model: activeModel, q: searchQuery });
    setSidebarOpen(false);
  };

  const handleModel = (model) => {
    setActiveModel(model);
    updateParams({ cat: activeCategory, model, q: searchQuery });
    setSidebarOpen(false);
  };

  return (
    <div className="shop-page">
      {/* Page Header */}
      <div className="shop-hero">
        <div className="container">
          <h1 className="shop-hero__title">Shop</h1>
          <p  className="shop-hero__sub">Genuine Parts &amp; Accessories for Every Rider</p>
        </div>
      </div>

      <div className="container shop-layout" id="products">
        {/* Sidebar */}
        <aside className={`shop-sidebar ${sidebarOpen ? 'shop-sidebar--open' : ''}`}>
          <div className="shop-sidebar__inner">
            <div className="shop-sidebar__header">
              <h3>Filters</h3>
              <button className="icon-btn" onClick={() => setSidebarOpen(false)} aria-label="Close filters">
                <FiX />
              </button>
            </div>

            {/* Categories */}
            <div className="filter-group">
              <h6 className="filter-group__title">Categories</h6>
              <ul className="filter-cat-list">
                {categories.map((cat) => (
                  <li key={cat.key}>
                    <button
                      className={`filter-cat-btn ${activeCategory === cat.key ? 'filter-cat-btn--active' : ''}`}
                      onClick={() => handleCategory(cat.key)}
                    >
                      {cat.label}
                      <span className="filter-cat-count">{cat.count}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bike Models */}
            <div className="filter-group">
              <h6 className="filter-group__title">Bike Models</h6>
              <ul className="filter-cat-list">
                <li>
                  <button
                    className={`filter-cat-btn ${activeModel === 'all' ? 'filter-cat-btn--active' : ''}`}
                    onClick={() => handleModel('all')}
                  >
                    All Models
                  </button>
                </li>
                {bikeModels.map((model) => {
                  const count = products.filter(p => p.models && p.models.includes(model)).length;
                  return (
                    <li key={model}>
                      <button
                        className={`filter-cat-btn ${activeModel === model ? 'filter-cat-btn--active' : ''}`}
                        onClick={() => handleModel(model)}
                      >
                        {model}
                        <span className="filter-cat-count">{count}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Price Range */}
            <div className="filter-group">
              <h6 className="filter-group__title">Filter by Price</h6>
              <input
                type="range"
                min={249}
                max={5000}
                step={100}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="price-range-input"
              />
              <div className="price-range-labels">
                <span>₹249</span>
                <span className="price-range-current">Up to ₹{maxPrice.toLocaleString('en-IN')}</span>
                <span>₹5,000</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Overlay */}
        {sidebarOpen && (
          <div className="shop-sidebar-overlay" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Products Area */}
        <div className="shop-main">
          {/* Toolbar */}
          <div className="shop-toolbar">
            <div className="shop-toolbar__left">
              <button
                className="btn btn-ghost shop-filter-toggle"
                onClick={() => setSidebarOpen(true)}
              >
                <FiFilter /> Filters
              </button>
              <p className="shop-toolbar__count">
                {filtered.length} product{filtered.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="shop-toolbar__right">
              {/* Search */}
              <div className="shop-search">
                <FiSearch className="shop-search__icon" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="shop-search__input"
                />
              </div>
              {/* Sort */}
              <div className="sort-select-wrap">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                <FiChevronDown className="sort-select__icon" />
              </div>
            </div>
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="shop-grid">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="shop-empty">
              <span>🔍</span>
              <p>No products found. Try adjusting your filters.</p>
              <button className="btn btn-primary" onClick={() => { 
                setActiveCategory('all'); 
                setActiveModel('all');
                setSearchQuery(''); 
                setMaxPrice(5000); 
                updateParams({});
              }}>
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
