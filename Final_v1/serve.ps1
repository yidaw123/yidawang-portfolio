$root = "c:\Users\devil\.gemini\antigravity\scratch\yidawang-site"
$port = 8765
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Host "Serving $root at http://localhost:$port/" -ForegroundColor Green

$mimeTypes = @{
    '.html' = 'text/html; charset=utf-8'
    '.css'  = 'text/css'
    '.js'   = 'application/javascript'
    '.png'  = 'image/png'
    '.jpg'  = 'image/jpeg'
    '.jpeg' = 'image/jpeg'
    '.pdf'  = 'application/pdf'
    '.ico'  = 'image/x-icon'
    '.svg'  = 'image/svg+xml'
}

while ($listener.IsListening) {
    $ctx = $listener.GetContext()
    $req = $ctx.Request
    $res = $ctx.Response
    
    $urlPath = $req.Url.LocalPath
    if ($urlPath -eq '/') { $urlPath = '/index.html' }
    
    $filePath = Join-Path $root $urlPath.TrimStart('/')
    
    try {
        $ext = [System.IO.Path]::GetExtension($filePath)
        $mime = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { 'application/octet-stream' }
        $bytes = [System.IO.File]::ReadAllBytes($filePath)
        $res.ContentType = $mime
        $res.ContentLength64 = $bytes.Length
        $res.OutputStream.Write($bytes, 0, $bytes.Length)
        Write-Host "200 $urlPath"
    } catch {
        $res.StatusCode = 404
        $msg = [System.Text.Encoding]::UTF8.GetBytes("Not Found")
        $res.OutputStream.Write($msg, 0, $msg.Length)
        Write-Host "404 $urlPath"
    }
    $res.Close()
}
