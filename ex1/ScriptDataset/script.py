import json

with open('batismos.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

for elem in data:

    # Tratar do id
    aux = elem['ref']
    aux_2 = aux.replace('/', '_')
    elem['_id'] = aux_2

    # Tratar do pai e da mãe
    title = elem['title']
    splited = title.split(':')
    pai = splited[2]
    mae = splited[3]
    elem['pai'] = pai[1:len(pai)-5]
    elem['mae']= mae[1:len(mae)]

with open('batismos-fixed.json', 'w', encoding='utf-8') as file:
    dict = json.dump(data, file)
