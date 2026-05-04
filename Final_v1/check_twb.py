import xml.etree.ElementTree as ET

try:
    tree = ET.parse(r'D:\Toolkit\Mirror\stuff\Interactive resume\yida_resume.twb')
    root = tree.getroot()
    print('Datasources:')
    for ds in root.findall('.//datasource'):
        name = ds.get('caption', ds.get('name'))
        if name == 'Parameters':
            continue
        has_extract = ds.find('extract') is not None
        print(f"- {name} | Has Extract: {has_extract}")
except Exception as e:
    print(f"Error: {e}")
