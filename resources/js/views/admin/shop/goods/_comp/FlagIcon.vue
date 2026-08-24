<template>
    <svg v-if="code === 'USD'" width="18" height="13" viewBox="0 0 18 13"><rect width="18" height="13" fill="#B22234"/><rect y="1" width="18" height="1" fill="#fff"/><rect y="3" width="18" height="1" fill="#fff"/><rect y="5" width="18" height="1" fill="#fff"/><rect y="7" width="18" height="1" fill="#fff"/><rect y="9" width="18" height="1" fill="#fff"/><rect y="11" width="18" height="1" fill="#fff"/><rect width="8" height="7" fill="#3C3B6E"/></svg>
    <svg v-else-if="code === 'JPY(100)'" width="18" height="13" viewBox="0 0 18 13"><rect width="18" height="13" fill="#fff" stroke="#ddd" stroke-width="0.5"/><circle cx="9" cy="6.5" r="3.6" fill="#BC002D"/></svg>
    <svg v-else-if="code === 'EUR'" width="18" height="13" viewBox="0 0 18 13"><rect width="18" height="13" fill="#003399"/><circle cx="9" cy="6.5" r="3.2" fill="none" stroke="#FFCC00" stroke-width="0.6" stroke-dasharray="0.9,1.05"/></svg>
    <svg v-else-if="code === 'CNH'" width="18" height="13" viewBox="0 0 18 13"><rect width="18" height="13" fill="#DE2910"/><text x="4" y="7" font-size="5" fill="#FFDE00">★</text></svg>
    <svg v-else-if="code === 'AUD'" width="18" height="13" viewBox="0 0 18 13"><rect width="18" height="13" fill="#00247D"/><rect width="8" height="6" fill="#00247D"/><path d="M0,0 L8,6 M8,0 L0,6" stroke="#fff" stroke-width="1"/><path d="M0,0 L8,6 M8,0 L0,6" stroke="#CF142B" stroke-width="0.5"/></svg>
    <svg v-else-if="code === 'GBP'" width="18" height="13" viewBox="0 0 18 13"><rect width="18" height="13" fill="#00247D"/><path d="M0,0 L18,13 M18,0 L0,13" stroke="#fff" stroke-width="2.4"/><path d="M0,0 L18,13 M18,0 L0,13" stroke="#CF142B" stroke-width="1"/><rect x="7.5" width="3" height="13" fill="#fff"/><rect y="5" width="18" height="3" fill="#fff"/><rect x="8.1" width="1.8" height="13" fill="#CF142B"/><rect y="5.6" width="18" height="1.8" fill="#CF142B"/></svg>
    <svg v-else-if="code === 'CAD'" width="18" height="13" viewBox="0 0 18 13"><rect width="18" height="13" fill="#fff"/><rect width="4.5" height="13" fill="#FF0000"/><rect x="13.5" width="4.5" height="13" fill="#FF0000"/><text x="7" y="9" font-size="6" fill="#FF0000">🍁</text></svg>
    <svg v-else-if="code === 'HKD'" width="18" height="13" viewBox="0 0 18 13"><rect width="18" height="13" fill="#DE2910"/><circle cx="9" cy="6.5" r="3" fill="#fff"/></svg>
    <svg v-else-if="code === 'SGD'" width="18" height="13" viewBox="0 0 18 13"><rect width="18" height="6.5" fill="#EF3340"/><rect y="6.5" width="18" height="6.5" fill="#fff"/></svg>
    <span v-else>🏳️</span>
</template>

<script>
export default {
    name: 'FlagIcon',
    props: ['code'],
}
</script>