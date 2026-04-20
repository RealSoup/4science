<?php echo '<?xml version="1.0" encoding="UTF-8"?>'; ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    @foreach ($goods as $row)
    <url>
        <loc>https://4science.net/shop/goods/{{ $row->gd_id }}</loc>
        <lastmod>{{ date('Y-m-d', strtotime($row->updated_at)) }}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    @endforeach
</urlset>