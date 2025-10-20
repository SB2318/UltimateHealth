# Auto patch script for replacing std::format and adding folly include in multiple file types

$pattern = 'std::format\("\{\}%", dimension\.value\)'
$replacement = 'folly::format("{}%", dimension.value).str()'
$includeLine = '#include <folly/Format.h>'
$fileTypes = '*.cpp','*.cc','*.h','*.hpp'

# Scan all relevant files in node_modules
Get-ChildItem -Path ".\node_modules" -Recurse -Include $fileTypes | ForEach-Object {
    $file = $_.FullName
    $content = Get-Content $file -Raw
    $patched = $false

    # Replace std::format with folly::format
    if ($content -match $pattern) {
        $content = $content -replace $pattern, $replacement
        $patched = $true
        Write-Host "✅ Replaced format in: $file"
    }

    # Add #include <folly/Format.h> if missing
    if ($patched -and ($content -notmatch [regex]::Escape($includeLine))) {
        $lines = $content -split "`n"
        $insertIndex = ($lines | Select-String '^#include' | Select-Object -Last 1).LineNumber
        $lines = $lines[0..($insertIndex - 1)] + $includeLine + $lines[$insertIndex..($lines.Length - 1)]
        $content = $lines -join "`n"
        Write-Host "📎 Added folly include in: $file"
    }

    # Save patched content
    if ($patched) {
        Set-Content -Path $file -Value $content
    }
}