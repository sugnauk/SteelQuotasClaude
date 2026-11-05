const quotaData = [
  { id: 'eu-1', category: 'Non-alloy and other alloy hot-rolled sheets', code: 'Category 1', region: 'EU', period: 'Oct 2025 – Sep 2026', remaining: 31, tonnes: '482,600' },
  { id: 'eu-2', category: 'Non-alloy and other alloy cold-rolled sheets', code: 'Category 2', region: 'EU', period: 'Oct 2025 – Sep 2026', remaining: 64, tonnes: '216,400' },
  { id: 'eu-3', category: 'Electrical sheets', code: 'Category 3', region: 'EU', period: 'Oct 2025 – Sep 2026', remaining: 82, tonnes: '94,200' },
  { id: 'eu-4', category: 'Metallic coated sheets', code: 'Category 4', region: 'EU', period: 'Oct 2025 – Sep 2026', remaining: 17, tonnes: '71,850' },
  { id: 'uk-1', category: 'Non-alloy and other alloy hot-rolled sheets', code: 'Category 1', region: 'UK', period: 'Oct 2025 – Sep 2026', remaining: 48, tonnes: '108,300' },
  { id: 'uk-2', category: 'Non-alloy and other alloy cold-rolled sheets', code: 'Category 2', region: 'UK', period: 'Oct 2025 – Sep 2026', remaining: 73, tonnes: '63,100' },
  { id: 'uk-3', category: 'Metallic coated sheets', code: 'Category 4', region: 'UK', period: 'Oct 2025 – Sep 2026', remaining: 9, tonnes: '12,750' },
  { id: 'uk-4', category: 'Rebar and wire rod', code: 'Category 13', region: 'UK', period: 'Oct 2025 – Sep 2026', remaining: 56, tonnes: '38,900' }
];

const rows = document.querySelector('#quota-rows');
const searchInput = document.querySelector('#search-input');
const regionFilter = document.querySelector('#region-filter');
let activeRegion = 'all';

function statusFor(remaining) {
  if (remaining <= 15) return { label: 'Near exhaustion', className: 'critical' };
  if (remaining <= 35) return { label: 'Filling up', className: 'warning' };
  return { label: 'Available', className: 'available' };
}

function render() {
  const query = searchInput.value.trim().toLowerCase();
  const region = activeRegion === 'all' ? regionFilter.value : activeRegion;
  const filtered = quotaData.filter((item) => {
    const matchesRegion = region === 'all' || item.region === region;
    const matchesQuery = `${item.category} ${item.code} ${item.region}`.toLowerCase().includes(query);
    return matchesRegion && matchesQuery;
  });

  rows.innerHTML = filtered.map((item) => {
    const status = statusFor(item.remaining);
    const regionName = item.region === 'EU' ? 'European Union' : 'United Kingdom';
    const flag = item.region === 'EU' ? '🇪🇺' : '🇬🇧';
    return `<tr>
      <td><div class="product-cell"><span class="product-mark">${item.region === 'EU' ? 'E' : 'U'}</span><span><strong>${item.category}</strong><small>${item.code}</small></span></div></td>
      <td><span class="region-pill">${flag} ${regionName}</span></td>
      <td class="period-cell">${item.period}</td>
      <td><strong class="tonnes">${item.tonnes}</strong><small class="tonnes-label">tonnes · illustrative</small></td>
      <td><div class="utilization"><div class="utilization-label"><strong>${100 - item.remaining}%</strong><span>${item.remaining}% left</span></div><div class="progress-track"><span class="progress-fill ${status.className}" style="width:${100 - item.remaining}%"></span></div></div></td>
      <td><span class="status-pill ${status.className}"><i></i>${status.label}</span></td>
    </tr>`;
  }).join('');
  document.querySelector('#empty-state').hidden = filtered.length !== 0;
  document.querySelector('#result-count').textContent = `Showing ${filtered.length} categor${filtered.length === 1 ? 'y' : 'ies'}`;
  document.querySelector('#category-total').innerHTML = `${quotaData.length.toString().padStart(2, '0')}<span class="summary-unit"> categories</span>`;
  document.querySelector('#all-count').textContent = quotaData.length.toString().padStart(2, '0');
  const least = [...quotaData].sort((a, b) => a.remaining - b.remaining)[0];
  document.querySelector('#lowest-remaining').innerHTML = `${least.remaining}<span class="summary-unit">%</span>`;
  document.querySelector('#lowest-category').textContent = `${least.region} · ${least.code} · illustrative`;
}

searchInput.addEventListener('input', render);
regionFilter.addEventListener('change', () => { activeRegion = 'all'; updateTabs(); render(); });
document.querySelectorAll('.jurisdiction-tab').forEach((tab) => tab.addEventListener('click', () => {
  activeRegion = tab.dataset.region;
  regionFilter.value = 'all';
  updateTabs();
  render();
}));
function updateTabs() {
  document.querySelectorAll('.jurisdiction-tab').forEach((tab) => {
    const selected = tab.dataset.region === activeRegion;
    tab.classList.toggle('selected', selected);
    tab.setAttribute('aria-selected', String(selected));
  });
}

document.querySelector('#refresh-button').addEventListener('click', (event) => {
  const button = event.currentTarget;
  button.classList.add('refreshing');
  button.disabled = true;
  window.setTimeout(() => {
    const time = new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit' }).format(new Date());
    document.querySelector('#last-updated').textContent = `Preview ${time}`;
    button.classList.remove('refreshing');
    button.disabled = false;
  }, 450);
});
document.querySelector('.notice-close').addEventListener('click', () => document.querySelector('.notice').hidden = true);
render();
