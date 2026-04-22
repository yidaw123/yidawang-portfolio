[xml]$xml = Get-Content 'D:\Toolkit\Mirror\stuff\Interactive resume\yida_resume.twb'
foreach ($ds in $xml.workbook.datasources.datasource) {
    $name = $ds.caption
    if (-not $name) { $name = $ds.name }
    if ($name -eq 'Parameters') { continue }
    $hasExtract = $null -ne $ds.extract
    Write-Output "Datasource: $name | Has Extract: $hasExtract"
}
