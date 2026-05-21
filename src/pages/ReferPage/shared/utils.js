export function formatNationalId(raw = '') {
  const d = String(raw).replace(/\D/g, '').slice(0, 13)
  return [d.slice(0,1), d.slice(1,5), d.slice(5,10), d.slice(10,12), d.slice(12,13)]
    .filter(Boolean).join('-')
}
