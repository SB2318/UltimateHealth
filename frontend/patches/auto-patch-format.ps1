# Define patterns for both fmt::format and std::format
$patterns = @(
    @{ pattern = 'fmt::format\("([^"]*)",\s*([^)]+)\)'; replacement = 'folly::format("$1", $2).str()' },
    @{ pattern = 'std::format\("([^"]*)",\s*([^)]+)\)'; replacement = 'folly::format("$1", $2).str()' }
)

$includeLine = '#include <folly/Format.h>'
$fileTypes = '*.cpp','*.cc','*.h','*.hpp'

# Scan all relevant files in node_modules
Get-ChildItem -Path ".\node_modules" -Recurse -Include $fileTypes | ForEach-Object {
    $file = $_.FullName
    $content = Get-Content $file -Raw
    $patched = $false

    # Apply all format replacements
    foreach ($entry in $patterns) {
        if ($content -match $entry.pattern) {
            $content = [regex]::Replace($content, $entry.pattern, $entry.replacement)
            $patched = $true
            Write-Host "✅ Replaced format in: $file"
        }
    }

    # Add #include <folly/Format.h> if missing
    if ($patched -and ($content -notmatch [regex]::Escape($includeLine))) {
        $lines = $content -split "`n"
        $lastInclude = $lines | Select-String -Pattern '^#include' | Select-Object -Last 1

        if ($null -ne $lastInclude) {
            $insertIndex = $lastInclude.LineNumber
            $lines = $lines[0..($insertIndex - 1)] + $includeLine + $lines[$insertIndex..($lines.Length - 1)]
            $content = $lines -join "`n"
            Write-Host "📎 Added folly include in: $file"
        } else {
            Write-Host "⚠️ Could not find existing #include to insert after in: $file"
        }
    }

    # Save patched content
    if ($patched) {
        Set-Content -Path $file -Value $content
    }
}
