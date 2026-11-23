<?php
// Custom local router to preview Next.js built site
$baseDir = __DIR__;
$publicDir = $baseDir . '/public';
$staticDir = $baseDir . '/.next/static';
$htmlFile = $baseDir . '/.next/server/app/index.html';

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = rawurldecode($uri);

// 1. Handle Next.js Image Optimization requests: /_next/image?url=...
if ($uri === '/_next/image' && isset($_GET['url'])) {
    $targetUrl = rawurldecode($_GET['url']);
    $targetPath = $publicDir . '/' . ltrim($targetUrl, '/');
    if (file_exists($targetPath) && is_file($targetPath)) {
        serveFile($targetPath);
        exit;
    }
}

// 2. Handle /_next/static/ assets
if (strpos($uri, '/_next/static/') === 0) {
    $rel = substr($uri, strlen('/_next/static/'));
    $filePath = $staticDir . '/' . ltrim($rel, '/');
    if (file_exists($filePath) && is_file($filePath)) {
        serveFile($filePath);
        exit;
    }
}

// 3. Handle /public assets (e.g. /favicon.ico, /projects/..., /resume.pdf)
$publicFile = $publicDir . '/' . ltrim($uri, '/');
if ($uri !== '/' && file_exists($publicFile) && is_file($publicFile)) {
    serveFile($publicFile);
    exit;
}

// 4. Default: serve the main pre-rendered index.html
if (file_exists($htmlFile)) {
    serveFile($htmlFile, 'text/html; charset=UTF-8');
    exit;
}

http_response_code(404);
echo "404 Not Found";

function serveFile($filePath, $mimeType = null) {
    if (!$mimeType) {
        $ext = strtolower(pathinfo($filePath, PATHINFO_EXTENSION));
        $mimes = [
            'css'  => 'text/css; charset=UTF-8',
            'js'   => 'application/javascript; charset=UTF-8',
            'json' => 'application/json',
            'html' => 'text/html; charset=UTF-8',
            'jpeg' => 'image/jpeg',
            'jpg'  => 'image/jpeg',
            'png'  => 'image/png',
            'gif'  => 'image/gif',
            'svg'  => 'image/svg+xml',
            'ico'  => 'image/x-icon',
            'webp' => 'image/webp',
            'pdf'  => 'application/pdf',
            'woff' => 'font/woff',
            'woff2'=> 'font/woff2',
            'ttf'  => 'font/ttf',
        ];
        $mimeType = $mimes[$ext] ?? 'application/octet-stream';
    }
    header("Content-Type: $mimeType");
    header("Content-Length: " . filesize($filePath));
    readfile($filePath);
}
