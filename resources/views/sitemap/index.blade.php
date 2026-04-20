<?php echo '<?xml version="1.0" encoding="UTF-8"?>'; ?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    @for ($i = 1; $i <= $pages; $i++)
    <sitemap>
        <loc>https://4science.net/sitemap/goods/{{ $i }}</loc>
    </sitemap>
    @endfor
</sitemapindex>